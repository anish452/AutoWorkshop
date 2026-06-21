const env = require('../../config/env');
const logger = require('../../config/logger');
const { DEPARTMENTS } = require('../../domain/enums');
const { AppError } = require('../../shared/errors/AppError');

const DEPARTMENT_MAP = {
  MECHANICAL: DEPARTMENTS.MECHANICAL,
  ELECTRICAL: DEPARTMENTS.ELECTRICAL,
  'BODY REPAIR': DEPARTMENTS.BODY_REPAIR,
  BODY_REPAIR: DEPARTMENTS.BODY_REPAIR,
  PAINT: DEPARTMENTS.PAINT,
  'GENERAL INSPECTION': DEPARTMENTS.GENERAL_INSPECTION,
  GENERAL_INSPECTION: DEPARTMENTS.GENERAL_INSPECTION,
};

const SYSTEM_PROMPT = `You are an expert automotive repair classification AI agent for a vehicle repair center.

Analyze customer complaint descriptions in ANY language and extract individual repair issues.

For each issue, determine the appropriate department:
- MECHANICAL: Engine, Transmission, Brake, Suspension, Steering, Cooling System
- ELECTRICAL: Battery, Alternator, Wiring, Headlights, Sensors, ECU
- BODY_REPAIR: Dent, Collision, Door Damage, Panel Damage
- PAINT: Paint Scratch, Repainting, Color Restoration
- GENERAL_INSPECTION: When department cannot be determined

You MUST respond with valid JSON only, no markdown, no extra text:
{
  "issues": [
    {
      "issue": "Brief issue description in English",
      "department": "MECHANICAL|ELECTRICAL|BODY_REPAIR|PAINT|GENERAL_INSPECTION",
      "confidence": 0.95,
      "explanation": "Why this issue belongs to this department"
    }
  ],
  "reasoning": "Overall analysis of the complaint"
}

Rules:
- Each distinct issue must be a separate entry
- Confidence score between 0 and 1
- If unsure about department, use GENERAL_INSPECTION with lower confidence
- Support multilingual input - translate issues to English in output`;

class DeepSeekAIService {
  async analyzeComplaint(description) {
    try {
      const response = await fetch(env.DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: env.DEEPSEEK_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Analyze this vehicle complaint: "${description}"` },
          ],
          temperature: 0.2,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error('DeepSeek API error', { status: response.status, error: errorText });
        return this.fallbackAnalysis(description);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        logger.warn('Empty AI response, using fallback');
        return this.fallbackAnalysis(description);
      }

      const parsed = JSON.parse(content);
      return this.normalizeResponse(parsed, content);
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('DeepSeek analysis failed', { error: error.message });
      return this.fallbackAnalysis(description);
    }
  }

  normalizeResponse(parsed, rawResponse) {
    const issues = (parsed.issues || []).map((issue) => ({
      issue: issue.issue || 'Unknown issue',
      department: this.normalizeDepartment(issue.department),
      confidence: Math.min(1, Math.max(0, issue.confidence || 0.5)),
      explanation: issue.explanation || 'AI classified this issue',
    }));

    if (issues.length === 0) {
      issues.push({
        issue: 'General vehicle inspection required',
        department: DEPARTMENTS.GENERAL_INSPECTION,
        confidence: 0.3,
        explanation: 'No specific issues could be extracted from complaint',
      });
    }

    return {
      issues,
      reasoning: parsed.reasoning || 'Complaint analyzed by AI agent',
      rawResponse,
    };
  }

  normalizeDepartment(dept) {
    if (!dept) return DEPARTMENTS.GENERAL_INSPECTION;
    const normalized = dept.toUpperCase().replace(/\s+/g, '_');
    return DEPARTMENT_MAP[normalized] || DEPARTMENT_MAP[dept.toUpperCase()] || DEPARTMENTS.GENERAL_INSPECTION;
  }

  fallbackAnalysis(description) {
    const lowerDesc = description.toLowerCase();
    const issues = [];

    const rules = [
      { keywords: ['engine', 'transmission', 'brake', 'suspension', 'steering', 'cooling'], dept: DEPARTMENTS.MECHANICAL },
      { keywords: ['battery', 'alternator', 'wiring', 'headlight', 'sensor', 'ecu', 'electrical', 'charging'], dept: DEPARTMENTS.ELECTRICAL },
      { keywords: ['dent', 'collision', 'door', 'panel', 'body'], dept: DEPARTMENTS.BODY_REPAIR },
      { keywords: ['paint', 'scratch', 'repaint', 'color'], dept: DEPARTMENTS.PAINT },
    ];

    for (const rule of rules) {
      const matched = rule.keywords.filter((kw) => lowerDesc.includes(kw));
      if (matched.length > 0) {
        issues.push({
          issue: `Detected ${rule.dept.toLowerCase().replace('_', ' ')} issue: ${matched.join(', ')}`,
          department: rule.dept,
          confidence: 0.6,
          explanation: `Keyword-based classification matched: ${matched.join(', ')}`,
        });
      }
    }

    if (issues.length === 0) {
      issues.push({
        issue: description.substring(0, 200),
        department: DEPARTMENTS.GENERAL_INSPECTION,
        confidence: 0.4,
        explanation: 'Fallback classification - requires manual inspection',
      });
    }

    return {
      issues,
      reasoning: 'Fallback keyword-based analysis (AI service unavailable)',
      rawResponse: null,
    };
  }
}

module.exports = new DeepSeekAIService();
