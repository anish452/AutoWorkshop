"""
Chapter content functions for the AutoRepairAgent Master's Final Report.

Each function accepts a python-docx Document and appends formatted chapter
content using doc.add_heading, doc.add_paragraph, and List Bullet styles.
"""


def chapter1_introduction(doc):
    """Chapter 1: Introduction (~2,000 words)."""
    doc.add_heading("1. Introduction", level=1)

    doc.add_heading("1.1 Background and Context", level=2)
    doc.add_paragraph(
        "The global automotive aftermarket and vehicle repair industry constitutes a "
        "significant segment of the broader transportation economy, encompassing independent "
        "workshops, franchised service centres, dealership aftersales departments, and "
        "specialist body and paint facilities. In many jurisdictions, including emerging "
        "economies across South Asia and the Pacific, repair workshops remain operationally "
        "heterogeneous: some adopt enterprise resource planning (ERP) suites or dealer "
        "management systems, while a substantial proportion continue to rely on paper job "
        "cards, telephone coordination, and informal knowledge held by senior technicians "
        "(Brown et al., 2018). This operational fragmentation is not merely an administrative "
        "inconvenience; it directly affects throughput, customer satisfaction, warranty "
        "compliance, and the ability of management to allocate scarce specialist labour "
        "efficiently across competing repair queues."
    )
    doc.add_paragraph(
        "Digital transformation in service industries has accelerated over the past decade, "
        "driven by cloud computing, mobile connectivity, and expectations shaped by consumer "
        "experiences in e-commerce and on-demand services (Newman, 2021). Within automotive "
        "aftersales, digitisation manifests as online appointment booking, digital vehicle "
        "health records, parts inventory integration, and customer-facing portals that expose "
        "repair status in near real time. Yet the transition from legacy practice to integrated "
        "software is uneven. Small and medium-sized workshops frequently lack the capital, "
        "technical staff, and change-management capacity required to deploy commercial workshop "
        "management platforms, leaving a persistent gap between industry best practice and "
        "day-to-day operations on the shop floor."
    )
    doc.add_paragraph(
        "Concurrent with broader digitisation, artificial intelligence (AI) and natural language "
        "processing (NLP) have moved from research laboratories into production systems that "
        "support decision-making in customer service, diagnostics, and operational routing "
        "(Amershi et al., 2019). In automotive contexts, AI applications range from predictive "
        "maintenance analytics and computer-vision inspection to conversational agents that "
        "interpret unstructured customer descriptions of symptoms. Large language models (LLMs) "
        "in particular demonstrate capacity to parse colloquial, multilingual, and partially "
        "ambiguous complaint narratives—precisely the form of information that front-desk staff "
        "and job advisors receive when a vehicle is checked in. The present project, "
        "AutoRepairAgent, situates itself at the intersection of these trends: a web-based "
        "workshop management system that embeds AI-assisted complaint triage and automated "
        "department routing within a secure, role-aware enterprise application."
    )
    doc.add_paragraph(
        "Software engineering practice for such systems demands more than feature accumulation. "
        "Contemporary guidance emphasises maintainable structure, explicit separation of concerns, "
        "and security-by-design so that systems remain evolvable as requirements change "
        "(Sommerville, 2016; Martin, 2017). AutoRepairAgent adopts Clean Architecture principles "
        "alongside a repository pattern, a RESTful API consumed by a React single-page application "
        "(SPA), PostgreSQL persistence via Prisma ORM, and JSON Web Token (JWT) authentication "
        "with role-based access control (RBAC). This technical foundation supports the business "
        "goal of transforming complaint intake from a manual, error-prone activity into a "
        "traceable, auditable workflow in which AI recommendations are recorded, human roles "
        "are enforced, and departmental workloads become visible to both staff and customers."
    )
    doc.add_paragraph(
        "The academic and professional significance of studying workshop management systems "
        "extends beyond a single implementation artefact. Repair centres operate as queuing "
        "networks in which misclassification at intake propagates delay downstream: a complaint "
        "routed to the wrong department may be re-queued, re-diagnosed, or left idle while "
        "specialists in the correct bay remain underutilised. Digital systems that capture "
        "structured job metadata at the point of entry therefore contribute to operational "
        "research questions about routing accuracy, service-level agreement compliance, and "
        "human–AI collaboration in high-stakes service environments (ISO/IEC 25010, 2011). "
        "AutoRepairAgent provides a concrete case study in which these abstract concerns are "
        "addressed through deliberate architectural and methodological choices documented in "
        "subsequent chapters of this report."
    )
    doc.add_paragraph(
        "Regional automotive markets add further nuance to this background. In Sri Lanka and "
        "comparable economies, workshops frequently service heterogeneous vehicle fleets—Japanese "
        "imports, ageing European models, and newer hybrid variants—each with distinct parts "
        "supply chains and technician skill profiles. Digital systems that assume homogeneous "
        "dealer networks or standardised OEM workflows may fail to accommodate local intake "
        "practices, including verbal complaint capture in Sinhala or Tamil and subsequent "
        "translation by bilingual advisors. AutoRepairAgent anticipates this linguistic diversity "
        "at the AI layer while acknowledging, as scope boundaries clarify later, that full user "
        "interface localisation remains future work. The architectural implication is nevertheless "
        "significant: complaint text must be stored and processed as Unicode-safe narrative "
        "without premature normalisation that would discard culturally specific symptom "
        "descriptions."
    )

    doc.add_heading("1.2 Problem Statement", level=2)
    doc.add_paragraph(
        "Despite the availability of generic business software, many vehicle repair workshops "
        "continue to suffer from a cluster of interrelated operational problems that generic "
        "tools address only partially, if at all. First among these is manual complaint triage. "
        "When a customer describes symptoms—often using non-technical language, mixed "
        "locales, or multiple concurrent faults—a job advisor must mentally decompose the "
        "narrative into discrete repair tasks and assign each to an appropriate specialist "
        "department such as mechanical, electrical, body repair, or paint. This cognitive "
        "load is substantial during peak intake periods and varies with advisor experience. "
        "Inconsistency in triage outcomes leads directly to the second problem: routing errors "
        "that dispatch work to departments lacking the requisite skills or equipment."
    )
    doc.add_paragraph(
        "Routing errors impose measurable costs. A job incorrectly assigned to the electrical "
        "department when the root cause is mechanical may undergo redundant inspection before "
        "transfer, extending cycle time and consuming bay capacity. Customers experience "
        "delayed completion and ambiguous communication; technicians experience frustration and "
        "context switching. Workshop managers, meanwhile, lack reliable leading indicators of "
        "bottlenecks because job records may not accurately reflect departmental demand at the "
        "moment of creation. Paper-based or spreadsheet systems compound the issue by offering "
        "limited concurrency control, weak audit trails, and no programmatic integration with "
        "AI or analytics services."
    )
    doc.add_paragraph(
        "The third major problem domain is poor visibility of work-in-progress (WIP) across "
        "stakeholder groups. Customers frequently inquire about repair status by telephone; "
        "advisors manually chase updates from departmental staff; administrators struggle to "
        "aggregate key performance indicators (KPIs) such as open jobs, average completion "
        "time, and department utilisation without a unified data model. Department users, "
        "conversely, may be overwhelmed by irrelevant job listings if filtering is absent or "
        "ad hoc. Effective workshop software must therefore enforce role-specific views while "
        "preserving a single source of truth for job state transitions—from pending through "
        "assigned and in progress to completed."
    )
    doc.add_paragraph(
        "Security and accountability constitute a fourth problem strand often under-addressed "
        "in informal systems. User management, password policies, authentication tokens, and "
        "audit logging are not optional embellishments but prerequisites for trustworthy "
        "operation in environments handling personally identifiable customer data and "
        "commercial repair histories (OWASP, 2021). Without RBAC, any authenticated user might "
        "inappropriately create, modify, or complete jobs belonging to other departments, "
        "undermining data integrity and forensic traceability after disputes or warranty claims."
    )
    doc.add_paragraph(
        "AutoRepairAgent was conceived to address this problem constellation holistically rather "
        "than through isolated point solutions. The system targets the intake-to-assignment "
        "pipeline specifically: capturing customer and vehicle context, invoking an AI agent "
        "(DeepSeek) to classify complaint fragments by department with confidence metadata, "
        "creating distinct job records per issue, auto-assigning work to available department "
        "users, and exposing lifecycle operations and dashboards through a modern web interface. "
        "The problem statement guiding this project can thus be summarised as follows: "
        "vehicle repair workshops require an integrated, secure, AI-augmented management "
        "system that reduces triage burden, improves routing accuracy, and increases "
        "operational visibility without imposing enterprise-scale licensing and infrastructure "
        "burdens inappropriate to academic and small-business contexts."
    )
    doc.add_paragraph(
        "Stakeholder interviews reported informally in workshop literature align with this "
        "formulation. Advisors describe 'triage anxiety' during Monday morning peaks when multiple "
        "vehicles queue for assessment; technicians report receiving jobs lacking reproducible "
        "symptom descriptions; customers express dissatisfaction when status updates require "
        "repeated telephone calls (Brown et al., 2018). Quantitative benchmarks vary by workshop "
        "size, yet case studies consistently associate intake quality with first-time fix rate—a "
        "metric AutoRepairAgent indirectly supports by ensuring each classified issue spawns an "
        "explicit job record with department attribution rather than an undifferentiated bundle "
        "note on a composite work order."
    )

    doc.add_heading("1.3 Motivation and Significance", level=2)
    doc.add_paragraph(
        "The motivation for undertaking AutoRepairAgent arises from both practical industry "
        "need and academic opportunity. Practitioners in automotive service management routinely "
        "report that front-desk intake quality determines downstream efficiency to a degree "
        "disproportionate to the time spent at the counter (Brown et al., 2018). Augmenting "
        "human advisors with AI classification aligns with human-centred AI design principles "
        "that emphasise transparency, controllable automation, and preservation of human "
        "override rather than full autonomy (Amershi et al., 2019). By persisting AI reasoning "
        "and confidence scores in an analysis log, the system supports retrospective review: "
        "advisors and administrators can assess when the model performed well and when manual "
        "correction may be warranted, fostering accountable adoption."
    )
    doc.add_paragraph(
        "From a software engineering education perspective, the project demonstrates end-to-end "
        "delivery of a non-trivial full-stack application within phased milestones—Progress "
        "Report 1 establishing foundational infrastructure and Progress Report 2 completing "
        "core business workflows. This mirrors industry practice of incremental releases while "
        "providing assessable evidence of requirements analysis, architectural design, "
        "implementation discipline, and validation (Sommerville, 2016). Clean Architecture "
        "as advocated by Martin (2017) ensures that domain rules remain independent of Express "
        "routes, Prisma schemas, and external AI APIs, thereby illustrating how theoretical "
        "structure translates into maintainable Node.js code organisation."
    )
    doc.add_paragraph(
        "The significance of the work extends to several stakeholder categories. Workshop "
        "administrators gain centralised user and department management with audit trails. Job "
        "advisors gain a streamlined path from complaint entry to multi-job creation. "
        "Department technicians receive filtered job queues aligned with their specialisation. "
        "Customers gain portal visibility into jobs associated with their vehicles. Researchers "
        "and educators gain a documented reference implementation combining JWT/RBAC security, "
        "REST API design per Fielding (2000), SPA front-end patterns, and LLM integration with "
        "explicit fallback behaviour when external AI services are unavailable."
    )
    doc.add_paragraph(
        "Furthermore, the project contributes to discourse on fit-for-purpose system scope in "
        "Master's-level specialised projects. Rather than attempting exhaustive ERP functionality "
        "—inventory, invoicing, payroll, supplier integration—the implementation deliberately "
        "focuses on the complaint-to-completion spine that delivers the highest marginal "
        "operational value relative to development effort. This scoping decision, articulated "
        "fully in Chapter 3, reflects professional judgement about feasible delivery within "
        "academic timelines while still producing a coherent, demonstrable artefact suitable "
        "for viva examination and portfolio presentation."
    )
    doc.add_paragraph(
        "Institutional learning outcomes also motivate the project. Master's-level specialised "
        "studies typically require evidence of systems thinking: the ability to relate business "
        "requirements to persistent data models, API contracts, user experience design, and "
        "operational validation. AutoRepairAgent deliberately spans these dimensions so that "
        "assessment can address not only whether features exist but whether engineering "
        "judgement informed trade-offs—for example, choosing a modular monolith over premature "
        "microservices decomposition (Newman, 2021), or accepting first-available assignment "
        "algorithms temporarily while preserving schema extensibility for future optimisation."
    )

    doc.add_heading("1.4 Research Questions", level=2)
    doc.add_paragraph(
        "This report investigates the design, implementation, and evaluation of AutoRepairAgent "
        "through the following research questions, which frame subsequent literature review, "
        "methodological choices, and discussion of outcomes:"
    )
    doc.add_paragraph(
        "RQ1: How can a Clean Architecture–based web application integrate AI-powered natural "
        "language complaint analysis into vehicle repair workshop workflows while maintaining "
        "separation of concerns, testability, and evolvability?",
        style="List Bullet",
    )
    doc.add_paragraph(
        "RQ2: To what extent does automated department classification and job creation reduce "
        "manual triage effort and routing inconsistency compared with traditional advisor-only "
        "intake processes, as observed through functional scenarios and seeded test data?",
        style="List Bullet",
    )
    doc.add_paragraph(
        "RQ3: How should role-based access control and JWT-authenticated REST APIs be structured "
        "to enforce least-privilege visibility across administrator, advisor, departmental, and "
        "customer personas without compromising usability?",
        style="List Bullet",
    )
    doc.add_paragraph(
        "RQ4: What architectural, operational, and ethical limitations emerge when deploying "
        "LLM-based classification in a production-adjacent academic prototype, and how should "
        "future iterations address them?",
        style="List Bullet",
    )
    doc.add_paragraph(
        "These questions are intentionally interdependent. RQ1 addresses engineering structure; "
        "RQ2 addresses functional value proposition; RQ3 addresses security and multi-tenant "
        "workshop semantics; RQ4 addresses critical reflection. Together they ensure that the "
        "project is evaluated not solely on feature checklists but on demonstrable alignment "
        "between problem domain, technical design, and responsible AI practice."
    )

    doc.add_heading("1.5 Report Structure", level=2)
    doc.add_paragraph(
        "The remainder of this report is organised into eight chapters plus references and "
        "appendices, following conventional Master's project report conventions. Chapter 2 "
        "presents a critical literature review spanning workshop management systems, AI in "
        "automotive service, web application architectures, and RBAC security models, "
        "synthesising a research gap that AutoRepairAgent addresses. Chapter 3 defines project "
        "objectives partitioned across Phase 1 and Phase 2 deliverables, success criteria, "
        "scope boundaries, and explicit out-of-scope items including production deployment and "
        "automated test suites."
    )
    doc.add_paragraph(
        "Chapter 4 documents the methodology employed: iterative phased development, "
        "requirements gathering, UML-oriented design artefacts, implementation practices, "
        "manual and Postman-based validation, and ethical considerations relating to data "
        "privacy and AI accountability. Chapter 5 provides detailed system design and "
        "implementation coverage—including architecture diagrams, entity-relationship design, "
        "authentication flows, backend modules, DeepSeek integration, and React/MUI front-end "
        "structure. Chapter 6 reports outcomes against objectives, summarising Phase 1 and "
        "Phase 2 deliverables, workflow demonstrations, user interface screenshots, and "
        "quantitative summaries such as API endpoint counts and role coverage."
    )
    doc.add_paragraph(
        "Chapter 7 offers discussion and critical evaluation: alignment with objectives, "
        "assessment of AI classification behaviour including fallback keyword logic, "
        "architectural trade-offs, limitations, and threats to validity. Chapter 8 concludes "
        "with summary findings, contributions, and prioritised future work including cloud "
        "deployment, multilingual UI localisation, notification services, and improved "
        "assignment algorithms. References follow APA conventions; appendices include supplementary "
        "artefacts such as API summaries and test account documentation. This structure is "
        "designed to guide examiners and industry readers from contextual motivation through "
        "evidence-based conclusions in a single coherent narrative."
    )

    doc.add_page_break()


def chapter2_literature(doc):
    """Chapter 2: Literature Review (~3,500 words)."""
    doc.add_heading("2. Literature Review", level=1)

    doc.add_heading("2.1 Vehicle Repair Workshop Management Systems", level=2)
    doc.add_paragraph(
        "Software systems purpose-built for automotive repair workshops occupy a niche between "
        "generic small-business accounting packages and manufacturer-specific dealer management "
        "systems (DMS). Early workshop management systems (WMS) emphasised digitisation of job "
        "cards, customer records, and invoicing, often as desktop client–server applications "
        "with limited connectivity (Brown et al., 2018). As internet access became ubiquitous, "
        "vendors migrated toward cloud-hosted solutions offering subscription pricing, remote "
        "diagnostic data integration, and customer communication modules. Contemporary WMS "
        "platforms typically support appointment scheduling, vehicle identification number "
        "(VIN) decoding, parts catalogue linkage, labour time guides, and SMS or email "
        "notifications—capabilities that reflect the operational complexity of modern aftersales "
        "environments."
    )
    doc.add_paragraph(
        "Academic and grey literature on workshop digitisation consistently identifies intake "
        "quality and job routing as determinants of throughput. Brown et al. (2018) observe "
        "that miscommunication between service advisors and technicians accounts for a "
        "significant fraction of rework in independent garages, particularly when composite "
        "complaints span multiple subsystems. Commercial WMS products address this partially "
        "through structured check-in forms and predefined job templates; however, templates "
        "require maintenance as vehicle technologies evolve (hybrid powertrains, advanced "
        "driver-assistance systems) and may not accommodate free-text customer narratives in "
        "multiple languages—a common requirement in linguistically diverse markets."
    )
    doc.add_paragraph(
        "Integration constraints further differentiate WMS offerings. Enterprise suites may "
        "integrate with parts wholesalers, accounting ledgers, and original equipment "
        "manufacturer (OEM) technical bulletins, but impose substantial licensing and training "
        "costs. Smaller workshops often adopt fragmented tooling: spreadsheets for scheduling, "
        "standalone invoicing, and messaging applications for internal coordination. This "
        "fragmentation violates the principle of a single source of truth and inhibits "
        "analytics on departmental utilisation and cycle times (Newman, 2021). AutoRepairAgent "
        "responds to this gap by prioritising a unified PostgreSQL schema spanning customers, "
        "vehicles, jobs, assignments, AI logs, and audit events, exposed through a cohesive "
        "REST API rather than duplicating commercial ERP breadth."
    )
    doc.add_paragraph(
        "From a systems analysis perspective, workshop operations map naturally onto entity types "
        "and state machines familiar in service operations management: customers own vehicles; "
        "vehicles generate repair jobs; jobs transition through lifecycle states and may spawn "
        "comments, assignments, and audit entries. Sommerville (2016) notes that domain models "
        "for service systems must capture concurrency—multiple jobs per vehicle, multiple "
        "technicians per department—and temporal auditing for compliance. The literature thus "
        "supports explicit modelling of departments as organisational units with role-bound "
        "users, a design choice reflected in AutoRepairAgent's schema and RBAC matrix."
    )
    doc.add_paragraph(
        "Usability research in automotive service contexts emphasises role-specific interfaces. "
        "Administrators require configuration and oversight; advisors require rapid intake "
        "workflows; technicians require task lists minimising navigation overhead; customers "
        "require read-oriented portals showing status without exposing internal notes "
        "(ISO/IEC 25010, 2011). Dashboard design therefore constitutes a first-class requirement "
        "rather than a cosmetic afterthought. Phase 2 of AutoRepairAgent delivers distinct "
        "dashboard APIs and React views for admin, advisor, department, and customer roles, "
        "aligning with literature recommending persona-driven information architecture."
    )
    doc.add_paragraph(
        "Historical evolution of workshop systems also informs expectations for integration "
        "interfaces. Application programming interfaces enabling third-party telematics, parts "
        "catalogues, and accounting exports have become competitive differentiators among "
        "commercial vendors. RESTful JSON APIs, as implemented in AutoRepairAgent, represent "
        "the contemporary lingua franca for such integrations (Fielding, 2000). Even when "
        "billing and inventory modules are out of scope, designing endpoints with consistent "
        "authentication, pagination-ready list responses, and idempotent create semantics "
        "prepares the system for eventual coupling with external services without breaking "
        "existing clients—a consideration emphasised in evolutionary delivery models "
        "(Sommerville, 2016)."
    )
    doc.add_paragraph(
        "Workshop management literature further discusses key performance indicators: average "
        "repair order value, labour utilisation, come-back rate, and customer wait time. "
        "Dashboard modules in AutoRepairAgent provide foundational counts—open jobs, completed "
        "jobs, department-specific queues—rather than advanced analytics or predictive forecasting. "
        "This limitation is intentional within project scope yet grounded in the recognition that "
        "operational dashboards must start from trustworthy transactional data before higher-order "
        "analytics become meaningful (Brown et al., 2018). Normalised job tables with lifecycle "
        "timestamps therefore constitute prerequisite infrastructure for any future business "
        "intelligence layer."
    )

    doc.add_heading("2.2 Artificial Intelligence in Automotive Service and NLP", level=2)
    doc.add_paragraph(
        "Artificial intelligence has permeated automotive domains ranging from autonomous "
        "driving research to aftersales decision support. In service contexts, AI applications "
        "include predictive maintenance based on telematics, recommender systems for scheduled "
        "servicing, image-based damage assessment, and NLP interfaces that interpret customer "
        "descriptions or technician notes (Amershi et al., 2019). The present project focuses "
        "on NLP-driven complaint classification: transforming unstructured text into structured "
        "job proposals with department labels and confidence estimates."
    )
    doc.add_paragraph(
        "Rule-based and keyword systems represent the historical baseline for text "
        "classification in low-resource environments. Keyword matching offers deterministic "
        "behaviour, low latency, and independence from external APIs—attributes that remain "
        "valuable as fallback strategies when cloud LLM services fail or exceed budget constraints "
        "(Martin, 2017). However, keyword systems degrade on synonymy, multilingual input, "
        "negation, and multi-issue compound sentences. Machine learning classifiers trained on "
        "labelled complaint corpora improve accuracy but require curated datasets often unavailable "
        "to individual workshops."
    )
    doc.add_paragraph(
        "Large language models accessed via APIs—exemplified in this project by DeepSeek—offer "
        "a middle path: zero-shot or few-shot classification leveraging pre-trained linguistic "
        "representations without workshop-specific training pipelines. Amershi et al. (2019) "
        "articulate guidelines for human–AI interaction emphasising informed mental models, "
        "appropriate trust calibration, and graceful degradation. Persisting model outputs, "
        "prompt context, and confidence metadata—as AutoRepairAgent does in ai_analysis_logs—"
        "supports explainability and post-hoc review, mitigating the 'black box' criticism "
        "often levelled at LLM deployments in regulated or customer-facing settings."
    )
    doc.add_paragraph(
        "Automotive NLP presents domain-specific challenges. Customer complaints frequently "
        "blend subjective sensations ('grinding noise when turning') with causal hypotheses "
        "('probably the alternator') that may be incorrect. Effective triage must separate "
        "observations from diagnoses and map symptoms to departmental expertise—electrical "
        "versus mechanical versus body repair versus paint. Multi-issue utterances require "
        "segmentation: a single intake narrative may yield independent jobs with distinct "
        "routing. LLMs demonstrate strong performance on such segmentation tasks relative to "
        "legacy approaches, though hallucinated components or over-confident assignments remain "
        "documented risks necessitating human oversight (Brown et al., 2018)."
    )
    doc.add_paragraph(
        "Ethical and quality considerations intersect AI literature with software engineering "
        "standards. ISO/IEC 25010 (2011) defines product quality characteristics including "
        "functional suitability, reliability, and maintainability—criteria applicable to AI "
        "subsystems that invoke non-deterministic external services. Responsible deployment "
        "implies timeout handling, structured error responses, logging, and fallback classifiers "
        "so that workshop operations continue when AI is unavailable. AutoRepairAgent's "
        "DeepSeekAIService embodies this pattern, preserving operational continuity—a design "
        "decision grounded in both professional practice and academic expectations for robust "
        "prototype systems."
    )
    doc.add_paragraph(
        "Prompt engineering literature within practitioner communities complements academic AI "
        "guidelines. Structured prompts specifying JSON output schemas, enumerated department "
        "labels, and confidence ranges reduce parse failures when integrating LLM responses into "
        "typed application code (Amershi et al., 2019). AutoRepairAgent's DeepSeekAIService "
        "follows this pattern, validating model output against expected shapes before persisting "
        "jobs—an instance of defensive parsing that Martin (2017) would classify as boundary "
        "protection between untrusted external input and internal domain objects."
    )
    doc.add_paragraph(
        "Comparative studies of NLP architectures—bag-of-words classifiers, recurrent networks, "
        "transformer-based models—suggest accuracy gains on short text classification tasks as "
        "model capacity increases, albeit with corresponding inference cost and environmental "
        "footprint. For workshop intake, latency tolerances typically allow one to three seconds "
        "of model inference if user experience communicates progress via loading indicators. "
        "Batch processing of historical complaints for analytics remains out of scope, yet the "
        "literature on offline evaluation using precision, recall, and F1 metrics provides a "
        "roadmap should labelled datasets become available from partner workshops in future "
        "iterations."
    )
    doc.add_paragraph(
        "Research on AI in service operations also highlights metrics for evaluation: "
        "classification accuracy against advisor gold standards, time saved at intake, "
        "downstream rework rate, and advisor satisfaction. While full quantitative field trials "
        "are outside this project's scope, the literature establishes benchmarks against which "
        "Chapter 6 functional scenarios and Chapter 7 discussion are interpreted. Future work "
        "may incorporate labelled complaint datasets and A/B testing between AI-assisted and "
        "manual triage, extending the evidence base beyond demonstrative case studies."
    )
    doc.add_paragraph(
        "Human-in-the-loop frameworks described in human–computer interaction literature further "
        "recommend explicit presentation of AI suggestions alongside advisor editing affordances. "
        "While AutoRepairAgent Phase 2 emphasises automated job creation, the persisted AI log "
        "enables advisors to compare model reasoning against their own judgement post hoc—a "
        "foundation for future interactive correction interfaces advocated by Amershi et al. (2019). "
        "Such interfaces may prove essential for regulatory acceptance if automated routing "
        "influences billing or warranty decisions in commercial deployments."
    )
    doc.add_paragraph(
        "Transfer learning and domain adaptation research suggests workshop-specific fine-tuning "
        "could improve classification beyond general-purpose LLM prompts when sufficient labelled "
        "data accumulates. This project intentionally avoids custom training pipelines to limit "
        "scope and infrastructure complexity; nevertheless, literature on distillation and "
        "smaller specialised models offers a credible long-term cost optimisation path should "
        "API expenses or latency become prohibitive at scale (Brown et al., 2018)."
    )
    doc.add_paragraph(
        "Finally, the literature on conversational repair agents in adjacent domains—IT help desks, "
        "facilities maintenance, medical triage chatbots—offers transferable design patterns for "
        "session management, escalation to human experts, and confidence threshold gating. Automotive "
        "workshops differ in physical fulfilment requirements (a classified job still demands bay "
        "time and parts), yet the informational pipeline from utterance to structured work order "
        "parallels these domains sufficiently to justify selective adoption of NLP best practices "
        "without uncritical imitation (Amershi et al., 2019)."
    )
    doc.add_paragraph(
        "Governance frameworks for organisational AI adoption—model inventory, change logs, "
        "periodic bias review—extend the individual project into enterprise maturity models. "
        "AutoRepairAgent implements a minimal governance kernel through ai_analysis_logs and "
        "audit_logs, sufficient for academic demonstration yet clearly short of ISO/IEC 42001 "
        "AI management system expectations that future commercialisation would need to address."
    )

    doc.add_heading("2.3 Web Application Architectures (REST, SPA, Clean Architecture)", level=2)
    doc.add_paragraph(
        "Modern web applications commonly adopt a three-tier or multi-tier architecture "
        "separating presentation, application logic, and data persistence (Sommerville, 2016). "
        "Fielding (2000) formalised Representational State Transfer (REST) as an architectural "
        "style leveraging stateless HTTP methods, resource-oriented URLs, and uniform interfaces "
        "—constraints that promote scalability, cacheability, and independent evolution of "
        "client and server components. AutoRepairAgent's Express.js API adheres to REST "
        "principles: nouns such as /api/jobs and /api/customers denote resources; HTTP verbs "
        "express semantics; JSON payloads encode representations; status codes communicate "
        "outcome classes."
    )
    doc.add_paragraph(
        "Single-page applications (SPAs) built with React represent the dominant presentation "
        "pattern for interactive enterprise dashboards. SPAs load initial assets once, then "
        "update views via client-side routing and asynchronous fetches to backend APIs, "
        "delivering responsiveness comparable to desktop software (Newman, 2021). Material UI "
        "(MUI) provides a component library implementing Google's Material Design, accelerating "
        "consistent layout, typography, and accessibility-aware widgets. The AutoRepairAgent "
        "front-end consumes JWT-protected endpoints, stores tokens in client memory or secure "
        "storage patterns, and renders role-specific dashboards—an architecture consistent with "
        "industry SPA deployments documented extensively in practitioner literature."
    )
    doc.add_paragraph(
        "Clean Architecture, popularised by Martin (2017), organises code into concentric "
        "layers with dependency rules pointing inward: entities and use cases at the core; "
        "interface adapters (controllers, presenters) surrounding them; infrastructure "
        "(database, external APIs) at the periphery. This inversion of dependencies ensures "
        "business rules do not import framework-specific modules, facilitating unit testing and "
        "technology substitution. AutoRepairAgent maps domain enums and business services into "
        "application layer modules, Prisma repositories into infrastructure, and Express "
        "controllers plus Zod validators into presentation—an instantiation of principles "
        "also related to Fowler's (2002) patterns for service layer and repository abstraction."
    )
    doc.add_paragraph(
        "Microservices literature (Newman, 2021) advocates decomposing systems into "
        "independently deployable services aligned with business capabilities. For academic "
        "prototypes and small workshops, however, operational overhead of distributed tracing, "
        "service discovery, and inter-service authentication often outweighs benefits. A "
        "modular monolith—logically layered Clean Architecture within a single Node.js "
        "deployable unit—constitutes a defensible design point offering clarity for examiners "
        "and a migration path toward service extraction if scale demands. Newman (2021) "
        "explicitly acknowledges that monoliths remain appropriate when team size and traffic "
        "do not justify distributed complexity."
    )
    doc.add_paragraph(
        "API validation and error handling constitute cross-cutting concerns spanning layers. "
        "Zod schema validation at the presentation boundary enforces structural contracts before "
        "invoking application services, aligning with 'fail fast' principles (Martin, 2017). "
        "Centralised error middleware translates domain exceptions into consistent JSON error "
        "bodies, improving client developer experience and Postman-based testing workflows. "
        "Winston structured logging supports operational diagnostics without conflating logging "
        "concerns with business logic—an application of separation of concerns praised in "
        "Sommerville's (2016) treatment of aspect-oriented design alternatives."
    )
    doc.add_paragraph(
        "Prisma ORM mediates between JavaScript application code and PostgreSQL, generating "
        "type-safe query clients from declarative schema definitions. Object-relational mapping "
        "tools reduce boilerplate and SQL injection risk through parameterised queries, though "
        "Martin (2017) cautions that repositories must not leak ORM entities into domain cores "
        "indiscriminately. AutoRepairAgent's repository implementations isolate Prisma calls, "
        "preserving a test seam where in-memory or mock repositories could substitute in future "
        "automated test harnesses—currently out of scope but architecturally anticipated."
    )
    doc.add_paragraph(
        "Cross-origin resource sharing and development proxies illustrate practical SPA integration "
        "concerns. During local development, Vite's proxy forwards /api requests to the Express "
        "server, avoiding browser CORS preflight complexity while preserving production-like URL "
        "structures. Newman (2021) discusses environment parity as a DevOps objective; academic "
        "prototypes approximate this through documented .env.example files and npm scripts "
        "(dev, prisma:migrate, prisma:seed) that reduce onboarding friction for examiners "
        "replicating demonstrations."
    )
    doc.add_paragraph(
        "Versioning and compatibility strategies for REST APIs—URL versioning versus content "
        "negotiation—remain lightly exercised in AutoRepairAgent given single-client deployment, "
        "yet Fielding's (2000) emphasis on hypermedia and uniform interfaces encourages consistent "
        "error shapes and resource naming that would support future mobile clients or partner "
        "integrations without breaking changes. Sommerville (2016) associates such forward "
        "compatibility with reduced maintenance cost over system lifetimes."
    )
    doc.add_paragraph(
        "Accessibility considerations for SPAs—keyboard navigation, ARIA labelling, colour "
        "contrast—are partially addressed through MUI defaults yet not formally validated against "
        "WCAG audit tooling in this project. ISO/IEC 25010 (2011) lists accessibility under "
        "usability; future iterations should commission automated accessibility scans and manual "
        "screen-reader testing, particularly for customer-facing dashboards where diverse user "
        "capabilities must be accommodated."
    )
    doc.add_paragraph(
        "Event-driven and message-queue architectures represent alternative integration patterns "
        "for AI workloads involving lengthy inference. A synchronous request–response model, as "
        "implemented in /api/jobs/analyze, simplifies advisor UX during demonstrations but "
        "blocks HTTP connections until model completion. Newman (2021) describes asynchronous "
        "job queues and webhook callbacks as scalability patterns; documenting this alternative "
        "supports critical reflection on design choices in Chapter 7 without implying deficiency "
        "for academic prototype scale."
    )

    doc.add_heading("2.4 Role-Based Access Control and Security", level=2)
    doc.add_paragraph(
        "Security architecture for multi-role enterprise web applications centres on "
        "authentication (verifying identity) and authorisation (enforcing permitted actions). "
        "JSON Web Tokens provide stateless authentication credentials signed with server-held "
        "secrets, embeddable claims for user identifiers and roles, and straightforward "
        "integration with SPA Authorization headers (OWASP, 2021). AutoRepairAgent issues JWTs "
        "upon successful bcrypt-verified login, with middleware validating tokens on protected "
        "routes—a pattern widely deployed though requiring careful secret management, expiration "
        "policy, and HTTPS transport in production contexts."
    )
    doc.add_paragraph(
        "Role-based access control (RBAC) assigns permissions to roles rather than individual "
        "users, simplifying administration in organisations with stable job functions "
        "(Sandhu & Samarati, 1994). The classic RBAC model includes users, roles, permissions, "
        "and sessions; role hierarchies and constraints extend expressiveness for separation of "
        "duty. AutoRepairAgent implements eight role distinctions—administrator, job advisor, "
        "five department user types, and customer—each mapped to middleware guards on routes "
        "and to filtered queries (e.g., department users viewing only their department's jobs)."
    )
    doc.add_paragraph(
        "Sandhu and Samarati (1994) emphasise policy enforcement at multiple layers: application "
        "middleware, service logic, and data access. Relying solely on UI hiding of buttons "
        "constitutes security through obscurity and fails against direct API invocation. "
        "AutoRepairAgent enforces RBAC server-side on every protected endpoint, conforming to "
        "OWASP (2021) recommendations for broken access control mitigation—the top category "
        "in OWASP Top Ten vulnerability rankings. Customer roles receive read-oriented job and "
        "dashboard access scoped to owned vehicles; advisors receive create/update powers on "
        "customers, vehicles, and job analysis; administrators receive user lifecycle management."
    )
    doc.add_paragraph(
        "Defence in depth extends beyond RBAC. Helmet middleware sets security-related HTTP "
        "headers; CORS policies restrict browser origins; express-rate-limit mitigates brute-force "
        "and denial-of-service attempts; bcrypt with appropriate cost factor protects stored "
        "password hashes; Zod validation prevents malformed input from reaching business logic "
        "(OWASP, 2021). Audit logs capture security-relevant events—logins, job state changes, "
        "administrative mutations—supporting forensic analysis and compliance narratives. "
        "ISO/IEC 27001 principles, while not formally certified in this academic project, "
        "inform the selection of these controls as proportionate to a prototype handling "
        "personal and vehicle data."
    )
    doc.add_paragraph(
        "SPA-specific threats include cross-site scripting (XSS) exposing tokens and "
        "cross-site request forgery where cookies authenticate requests. Bearer tokens in "
        "Authorization headers with strict CORS reduce certain CSRF surfaces relative to "
        "cookie-only sessions, though XSS remains a front-end hygiene concern requiring "
        "framework-default escaping and Content Security Policy headers in hardened deployments "
        "(OWASP, 2021). Chapter 7 discusses residual security limitations including absence of "
        "refresh tokens, token revocation lists, and production hardening checklists."
    )
    doc.add_paragraph(
        "Security standards such as ISO/IEC 27001 articulate control families spanning access "
        "control, cryptography, operations security, and supplier relationships. While formal "
        "certification exceeds academic project scope, mapping implemented controls to these "
        "families demonstrates awareness of enterprise expectations. Password policies enforced "
        "through validation schemas, inactive user deactivation endpoints, and audit logs "
        "align with accountability requirements Sandhu and Samarati (1994) associate with "
        "administrative RBAC functions."
    )
    doc.add_paragraph(
        "Threat modelling methodologies advocated by OWASP (2021)—STRIDE categorisations, "
        "attack surface enumeration—could be applied systematically in future hardening passes. "
        "Current implementation addresses spoofing via authentication, tampering via RBAC and "
        "validation, repudiation via audit logs, information disclosure via least-privilege "
        "queries, and denial of service partially via rate limiting. Elevation of privilege "
        "scenarios require ongoing review whenever new endpoints are added, reinforcing Martin's "
        "(2017) argument that security is a continuous process rather than a milestone checkbox."
    )

    doc.add_heading("2.5 Synthesis and Research Gap", level=2)
    doc.add_paragraph(
        "Synthesising the reviewed literature reveals a convergent opportunity at the intersection "
        "of workshop management, AI-assisted NLP triage, and disciplined web architecture. "
        "Commercial WMS platforms provide breadth but may lack affordable, transparent AI intake "
        "pipelines with persisted reasoning accessible to academic scrutiny. Research on automotive "
        "AI often emphasises telematics or computer vision rather than multilingual complaint "
        "decomposition at the service counter. Software architecture literature prescribes Clean "
        "Architecture and REST SPAs but seldom instantiates these patterns in domain-specific "
        "repair workflows with eight-role RBAC and LLM integration."
    )
    doc.add_paragraph(
        "The identified research gap can be stated precisely: there is limited documented "
        "evidence of integrated, open-architecture workshop management prototypes that (a) combine "
        "PostgreSQL-normalised job lifecycles with AI-generated multi-job creation, (b) enforce "
        "least-privilege access across administrator, advisor, departmental, and customer personas, "
        "and (c) adopt Clean Architecture and repository patterns in Node.js/React stacks suitable "
        "for Master's-level reproducibility. AutoRepairAgent addresses this gap through a phased "
        "deliverable aligned with Sommerville's (2016) evolutionary process model and Martin's "
        "(2017) maintainability imperatives."
    )
    doc.add_paragraph(
        "Literature also clarifies what this project should not claim. Without controlled field "
        "trials, generalisations about accuracy improvements over human advisors remain "
        "hypothesis-generating rather than statistically definitive. Without production deployment, "
        "claims about scalability derive from architectural reasoning (Newman, 2021) rather than "
        "load test evidence. Without comprehensive automated testing, regression safety relies on "
        "manual scenario repetition. These boundaries inform success criteria in Chapter 3 and "
        "limitations in Chapter 7, demonstrating scholarly alignment between ambition and "
        "evidential standards."
    )
    doc.add_paragraph(
        "Finally, the synthesis underscores design principles carried forward into implementation. "
        "First, intake should produce structured, auditable job artefacts—not ephemeral chat "
        "transcripts. Second, AI must be augmentative, logged, and fallback-capable (Amershi et "
        "al., 2019). Third, security policies must be server-enforced RBAC, not client conventions "
        "(Sandhu & Samarati, 1994; OWASP, 2021). Fourth, architecture should separate concerns "
        "to support future modules—notifications, invoicing, localisation—without wholesale "
        "rewrite (Martin, 2017; Fowler, 2002). These principles constitute the analytical lens "
        "through which subsequent chapters evaluate AutoRepairAgent's design and outcomes."
    )
    doc.add_paragraph(
        "Cross-disciplinary synthesis also suggests evaluation criteria bridging software engineering "
        "and service management literature. A successful workshop AI intake system must score "
        "acceptably on ISO/IEC 25010 maintainability and security characteristics while improving "
        "observable routing behaviours described by Brown et al. (2018). It must respect human "
        "agency per Amershi et al. (2019), enforce RBAC per Sandhu and Samarati (1994), and "
        "remain structurally comprehensible to maintainers per Martin (2017). These dual lenses—"
        "technical quality and operational plausibility—guide methodological choices in Chapter 4 "
        "and empirical reporting in Chapters 6 and 7."
    )

    doc.add_page_break()


def chapter3_objectives(doc):
    """Chapter 3: Project Objectives and Scope (~1,800 words)."""
    doc.add_heading("3. Project Objectives and Scope", level=1)

    doc.add_heading("3.1 Project Objectives", level=2)
    doc.add_paragraph(
        "The overarching aim of AutoRepairAgent is to design, implement, and evaluate a "
        "web-based management system for vehicle repair workshops that integrates AI-assisted "
        "complaint analysis, automated multi-job creation, department routing, and role-specific "
        "operational visibility within a secure full-stack architecture. Objectives were "
        "partitioned across two development phases, each culminating in a formal progress report "
        "submission that provided milestone review and scope control consistent with iterative "
        "software engineering practice (Sommerville, 2016)."
    )
    doc.add_paragraph(
        "Phase 1 objectives established the technical foundation upon which business workflows "
        "would be constructed. These objectives emphasised infrastructure, security primitives, "
        "administrative capability, and front-end scaffolding rather than end-to-end repair "
        "workflows. Phase 2 objectives delivered customer-facing and advisor-facing functionality, "
        "AI integration, job lifecycle management, and analytics dashboards completing the "
        "core value proposition articulated in Chapter 1."
    )
    doc.add_paragraph("Phase 1 — Foundation and Administration:", style="List Bullet")
    doc.add_paragraph(
        "Design and migrate a normalised PostgreSQL database schema via Prisma ORM covering "
        "users, roles, departments, customers, vehicles, jobs, assignments, comments, AI logs, "
        "and audit events with consistent audit columns.",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Implement JWT authentication with bcrypt password hashing, login endpoint, and "
        "middleware protecting subsequent routes.",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Deliver administrator APIs and UI for user lifecycle management (create, read, update, "
        "delete, activate, deactivate) and department configuration.",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Establish Clean Architecture folder structure separating presentation, application, "
        "infrastructure, and domain concerns in the Node.js backend.",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Scaffold the React/MUI single-page application with routing, authentication context, "
        "layout components, and administrative pages (login, users, departments, admin dashboard).",
        style="List Bullet",
    )
    doc.add_paragraph("Phase 2 — Core Business Workflows and AI:", style="List Bullet")
    doc.add_paragraph(
        "Implement customer and vehicle CRUD modules accessible to advisors and administrators, "
        "enforcing referential integrity and unique vehicle registration constraints.",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Integrate DeepSeek AI for multilingual complaint analysis that decomposes descriptions "
        "into department-labelled issues with confidence scores and persisted reasoning logs.",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Automate creation of multiple job records from a single analysis request and assign jobs "
        "to available department users using first-available assignment logic.",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Support job lifecycle transitions (pending, assigned, in progress, completed) with "
        "department-scoped listing, start/complete operations, and completion comments.",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Provide role-specific dashboard APIs and React views for administrator, job advisor, "
        "department user, and customer personas.",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Document and validate the end-to-end workflow using Prisma seed data, Postman "
        "collections, and manual scenario testing.",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Table 3.1 summarises each numbered objective with completion status as assessed at final "
        "submission. Status labels reflect functional delivery within the academic prototype "
        "context; 'Partial' indicates features delivered with acknowledged simplifications "
        "documented in Chapter 7."
    )

    # Table 3.1 — Project objectives and completion status
    doc.add_paragraph()
    t31 = doc.add_table(rows=1, cols=4)
    t31.style = "Table Grid"
    hdr = t31.rows[0].cells
    hdr[0].text = "ID"
    hdr[1].text = "Objective"
    hdr[2].text = "Phase"
    hdr[3].text = "Status"
    objectives_data = [
        ("O1", "PostgreSQL schema design and Prisma migrations", "1", "Complete"),
        ("O2", "JWT authentication and RBAC middleware", "1", "Complete"),
        ("O3", "Admin user and department management", "1", "Complete"),
        ("O4", "Clean Architecture backend structure", "1", "Complete"),
        ("O5", "React/MUI SPA scaffold and admin UI", "1", "Complete"),
        ("O6", "Customer and vehicle management modules", "2", "Complete"),
        ("O7", "DeepSeek AI complaint analysis integration", "2", "Complete"),
        ("O8", "Multi-job creation and department routing", "2", "Complete"),
        ("O9", "Automatic job assignment to department users", "2", "Partial"),
        ("O10", "Job lifecycle (start/complete) and comments", "2", "Complete"),
        ("O11", "AI analysis log persistence and viewing", "2", "Complete"),
        ("O12", "Role-specific dashboards (4 personas)", "2", "Complete"),
        ("O13", "Audit logging for security-relevant events", "1–2", "Complete"),
        ("O14", "Postman collection and manual test validation", "2", "Complete"),
    ]
    for oid, obj, phase, status in objectives_data:
        row = t31.add_row().cells
        row[0].text = oid
        row[1].text = obj
        row[2].text = phase
        row[3].text = status
    doc.add_paragraph("Table 3.1. Project objectives and completion status")

    doc.add_heading("3.2 Success Criteria", level=2)
    doc.add_paragraph(
        "Success criteria translate objectives into verifiable conditions suitable for academic "
        "assessment. Primary success requires demonstration of the end-to-end workflow documented "
        "in the README and Progress Report 2: advisor login, complaint submission for a seeded "
        "vehicle, AI analysis producing at least two department-routed jobs for a compound "
        "complaint, departmental user execution of start and complete operations, and visibility "
        "of outcomes via dashboards and audit logs."
    )
    doc.add_paragraph(
        "Secondary success criteria address non-functional qualities aligned with ISO/IEC 25010 "
        "(2011): the API responds coherently to valid and invalid inputs with appropriate HTTP "
        "status codes; RBAC denies unauthorised role access attempts; AI service unavailability "
        "triggers keyword fallback rather than silent failure; and the codebase maintains "
        "discernible Clean Architecture boundaries reviewable by examiners without extensive "
        "archaeological navigation (Martin, 2017)."
    )
    doc.add_paragraph(
        "Tertiary criteria relate to documentation and reproducibility: environment configuration "
        "via .env templates, database seed scripts producing known test accounts, Postman "
        "collection covering thirty-four REST endpoints, and progress report artefacts including "
        "architecture diagrams and user interface screenshots. Satisfaction of tertiary criteria "
        "enables independent supervisors and external examiners to replicate core demonstrations "
        "without proprietary tooling beyond Node.js, PostgreSQL, and API keys."
    )
    doc.add_paragraph(
        "Acceptance thresholds were defined qualitatively rather than through service-level "
        "agreements with numeric uptime guarantees. A 'Pass' classification for each objective "
        "in Table 3.1 required demonstrable execution in supervisor-led or documented walkthroughs "
        "without critical defects blocking core workflow completion. Partial credit applies where "
        "functionality exists but simplifications—such as first-available assignment rather than "
        "optimised load balancing—limit operational realism (ISO/IEC 25010, 2011)."
    )

    doc.add_heading("3.3 Project Scope", level=2)
    doc.add_paragraph(
        "Project scope defines boundaries of delivered functionality across functional, technical, "
        "and user dimensions. Functional scope includes authentication; RBAC-enforced modules for "
        "users, departments, customers, vehicles, and jobs; AI-assisted job creation; assignment "
        "and lifecycle management; AI analysis logging; audit logging; and four dashboard variants. "
        "The system supports five repair departments—Mechanical, Electrical, Body Repair, Paint, "
        "and a configurable administrative partition—mirroring typical workshop specialisation "
        "without claiming exhaustive coverage of every aftermarket niche (e.g., transmission "
        "specialists, air-conditioning-only bays)."
    )
    doc.add_paragraph(
        "Technical scope encompasses a Node.js/Express backend, PostgreSQL on Neon-compatible "
        "hosting, Prisma ORM, DeepSeek REST API integration, React/Vite front-end with MUI "
        "components, JWT/bcrypt security, Zod validation, Winston logging, Helmet/CORS/rate-limit "
        "middleware, and Clean Architecture with repository pattern. Development and demonstration "
        "occurred in local and academic environments with environment variables supplying secrets "
        "and connection strings."
    )
    doc.add_paragraph(
        "User scope includes eight role categories mapped to workshop personas: system "
        "administrator, job advisor, department technician users (mechanical, electrical, body, "
        "paint), and customer portal users. Each persona accesses tailored routes and API "
        "filters—administrators configure the system; advisors intake complaints; technicians "
        "execute assigned work; customers monitor progress on owned vehicles. Scope assumes a "
        "single workshop tenant rather than multi-franchise SaaS isolation, though schema design "
        "does not foreclose future tenant identifiers."
    )
    doc.add_paragraph(
        "Functional boundaries were validated against competitor feature matrices informally "
        "surveyed during literature review. Capabilities such as VIN decoding, OEM bulletin "
        "integration, and payroll were excluded as low marginal value relative to intake routing "
        "within available hours. Conversely, AI analysis, multi-job creation, and auditability "
        "were classified as core differentiators justifying focused implementation effort "
        "(Sommerville, 2016)."
    )
    doc.add_paragraph(
        "Technical scope explicitly includes thirty-four documented REST endpoints spanning "
        "authentication, administration, customers, vehicles, jobs, dashboards, and health "
        "checks. Front-end scope covers nine primary pages including login, administrative "
        "management screens, customer and vehicle lists, job creation with AI feedback, job "
        "lists filtered by role, AI analysis log viewer, and four dashboard variants. This "
        "inventory provides measurable scope anchors for examiner verification."
    )
    doc.add_paragraph(
        "Change management scope was limited to developer-controlled deployments; training "
        "materials for workshop staff, help desk documentation, and migration plans from legacy "
        "paper systems were not produced. Sommerville (2016) emphasises that organisational "
        "change often determines software success; acknowledging this gap clarifies that project "
        "success criteria emphasise technical artefact completeness rather than organisational "
        "adoption studies."
    )
    doc.add_paragraph(
        "Scope governance employed informal change control: features not mapped to Phase 1 or Phase 2 "
        "objectives in Table 3.1 required explicit deferral rather than silent inclusion. This "
        "discipline prevented unbounded expansion—particularly tempting when integrating AI "
        "capabilities with open-ended possibilities—and exemplifies project management practice "
        "recommended for software capstone work (Sommerville, 2016)."
    )

    doc.add_heading("3.4 Out of Scope", level=2)
    doc.add_paragraph(
        "Explicit out-of-scope items prevent scope creep and clarify examination expectations. "
        "Production deployment to cloud infrastructure (container orchestration, CI/CD pipelines, "
        "production-grade secret management, TLS certificate automation) was not undertaken; "
        "the system remains a locally demonstrable prototype. Multilingual user interface "
        "localisation (Sinhala, Tamil, or other regional languages) is out of scope despite "
        "multilingual complaint acceptance by the AI engine—UI strings remain English-only."
    )
    doc.add_paragraph(
        "Automated testing—including unit tests, integration tests, end-to-end browser automation, "
        "and continuous integration gates—was excluded due to time constraints prioritising "
        "functional delivery and architectural clarity. Validation relied on manual scenarios, "
        "seeded data, and Postman collections. Additional out-of-scope features include: "
        "invoicing and payment processing; parts inventory and supplier integration; SMS/email "
        "notification services; advanced scheduling and bay allocation optimisation; mobile "
        "native applications; formal penetration testing; and LLM fine-tuning on workshop-specific "
        "corpora."
    )
    doc.add_paragraph(
        "Assignment algorithms beyond naive first-available department user selection—such as "
        "skill matching, workload balancing, or priority queuing—were deferred. Similarly, "
        "customer self-registration, document uploads (photos, PDF estimates), and integration "
        "with OEM diagnostic tools were not implemented. These exclusions are revisited as "
        "prioritised future work in Chapter 8."
    )
    doc.add_paragraph(
        "Table 3.2 in Chapter 5 cross-references these exclusions against implemented features "
        "for side-by-side comparison. Documenting out-of-scope items explicitly mitigates "
        "examination disputes regarding perceived omissions and demonstrates scope management "
        "competency expected at Master's level (Sommerville, 2016)."
    )

    doc.add_heading("3.5 Assumptions and Constraints", level=2)
    doc.add_paragraph(
        "Development proceeded under assumptions necessary to bound complexity. It was assumed "
        "that workshop staff possess basic computer literacy sufficient to operate web forms and "
        "dashboards. Network connectivity is available for API and DeepSeek calls during "
        "demonstrations. PostgreSQL and Node.js LTS runtimes are installable on developer "
        "machines. DeepSeek API availability and acceptable latency permit interactive advisor "
        "workflows; prolonged outages would trigger keyword fallback with reduced classification "
        "quality—a documented constraint rather than hidden failure."
    )
    doc.add_paragraph(
        "Constraints include academic calendar deadlines defining two progress report milestones "
        "and final submission; single-developer capacity limiting parallel workstreams; and "
        "budget constraints restricting external services to database hosting and AI API usage "
        "within student means. Regulatory compliance (GDPR, local data protection statutes) is "
        "considered at design level through RBAC and audit logs but formal legal review is "
        "outside project scope. Ethical handling of synthetic seed data avoids real personal "
        "identifiers; production use would require privacy impact assessment and data retention "
        "policies discussed in Chapter 4."
    )
    doc.add_paragraph(
        "Technical constraints include reliance on Prisma migration workflows—schema changes require "
        "regeneration and migration discipline—and SPA limitations for search engine optimisation "
        "irrelevant to internal workshop tools. JWT statelessness implies no server-side session "
        "revocation list in the prototype, construting immediate forced logout scenarios until "
        "future token blocklisting is implemented. These assumptions and constraints collectively "
        "shape realistic interpretation of results and frame the discussion of threats to validity "
        "in Chapter 7."
    )
    doc.add_paragraph(
        "Resource constraints included hardware limited to standard developer laptops without "
        "dedicated staging clusters, implying performance characteristics reflect development "
        "rather than production load profiles. Intellectual property constraints required "
        "use of openly documented frameworks and API services with published terms of use. "
        "Supervisor availability imposed meeting cadence limits, reinforcing phased reporting "
        "as the primary formal feedback channel alongside asynchronous repository review."
    )
    doc.add_paragraph(
        "Dependency on third-party services—Neon PostgreSQL hosting and DeepSeek API—introduces "
        "external availability constraints beyond application control. Methodological mitigation "
        "includes local PostgreSQL compatibility via DATABASE_URL reconfiguration and AI fallback "
        "logic documented in implementation chapters. These contingencies align with resilient "
        "design guidance in Sommerville (2016) treating external failures as expected operational "
        "conditions rather than exceptional surprises."
    )
    doc.add_paragraph(
        "Stakeholder communication during methodology execution relied on structured progress "
        "reports rather than agile sprint ceremonies. Each report synthesised requirements "
        "status, implementation evidence, screenshots, and risk updates—mirroring gate reviews "
        "in plan-driven processes while retaining iterative code delivery between gates "
        "(Sommerville, 2016)."
    )

    doc.add_page_break()


def chapter4_methodology(doc):
    """Chapter 4: Methodology (~2,800 words)."""
    doc.add_heading("4. Methodology", level=1)

    doc.add_heading("4.1 Development Approach", level=2)
    doc.add_paragraph(
        "AutoRepairAgent was developed using an iterative, phased methodology aligned with "
        "evolutionary and incremental software process models described by Sommerville (2016). "
        "Rather than attempting a single big-bang delivery, the project divided work into Phase 1 "
        "(foundation) and Phase 2 (business workflows and AI), each documented in a formal "
        "progress report with presentation artefacts, screenshots, and supervisor review checkpoints. "
        "This approach mitigated schedule risk by ensuring a demonstrable subset—authentication, "
        "administration, and architectural skeleton—existed early even before AI integration "
        "complexity was introduced."
    )
    doc.add_paragraph(
        "Each phase followed a micro-cycle of requirements refinement, design sketching, "
        "implementation, manual validation, and documentation update. Phase 1 prioritised "
        "vertical slices through the stack for administrative features: database tables, "
        "repository implementations, service methods, controllers, routes, and React pages for "
        "user and department management. Phase 2 extended slices through advisor and customer "
        "workflows, culminating in the analyse-complaint endpoint invoking DeepSeekAIService and "
        "propagating persisted jobs to departmental views."
    )
    doc.add_paragraph(
        "The phased strategy mirrors industry practice of minimum viable product releases while "
        "accommodating academic assessment rubrics rewarding visible milestone progress. Newman "
        "(2021) notes that incremental delivery enables feedback incorporation; here, supervisor "
        "feedback between Progress Report 1 and Progress Report 2 informed dashboard emphasis, "
        "UI polish, and workflow diagram clarity. Version control via Git provided change history "
        "and rollback capability, though formal branching strategies (GitFlow) were applied "
        "lightly given team size of one."
    )
    doc.add_paragraph(
        "Risk management within the iterative approach identified DeepSeek API dependency as "
        "high-impact: mitigation included keyword fallback classification, structured error "
        "logging, and decoupling AI HTTP calls within application services rather than embedding "
        "logic in controllers (Martin, 2017). Database schema evolution risk was mitigated through "
        "Prisma migrations and seed scripts reproducible via npm run db:setup. Front-end/back-end "
        "integration risk was mitigated through early OpenAPI-aligned endpoint conventions and "
        "Postman collection development parallel to route implementation."
    )
    doc.add_paragraph(
        "Documentation deliverables accompanied each phase: Progress Report 1 presented "
        "architecture diagrams, login and admin screenshots, and schema overview; Progress Report 2 "
        "added workflow figures, AI job creation screenshots, and end-to-end narrative aligning "
        "with supervisor feedback. This documentation-first milestone pattern ensured examination "
        "artefacts remained synchronised with repository state rather than reconstructed "
        "retroactively before final submission (Sommerville, 2016)."
    )

    doc.add_heading("4.2 Requirements Gathering", level=2)
    doc.add_paragraph(
        "Requirements gathering combined domain analysis of vehicle repair workshop operations "
        "with comparative review of commercial WMS features and academic project brief constraints. "
        "No formal ethnographic field study was conducted; instead, requirements were elicited "
        "through structured literature review (Chapter 2), supervisor consultation, scenario "
        "walkthroughs ('advisor receives compound complaint'), and retrospective validation "
        "against Progress Report 1 scope commitments."
    )
    doc.add_paragraph(
        "Functional requirements were catalogued by actor. Administrators must manage users and "
        "departments. Advisors must register customers and vehicles, submit complaints for AI "
        "analysis, and view cross-department job lists. Department users must view filtered jobs, "
        "start work, and complete jobs with comments. Customers must view jobs and dashboard "
        "summaries for their vehicles. All authenticated actors must interact through JWT-protected "
        "APIs enforcing RBAC consistent with Sandhu and Samarati's (1994) policy model."
    )
    doc.add_paragraph(
        "Representative functional requirements include: FR1—system shall authenticate users and "
        "issue signed JWT tokens; FR2—system shall restrict endpoints by role; FR3—system shall "
        "persist customers and vehicles with unique registration numbers; FR4—system shall invoke "
        "AI analysis decomposing complaints into multiple jobs with department labels and "
        "confidence scores; FR5—system shall transition jobs through defined lifecycle states; "
        "FR6—system shall log AI requests and responses for audit; FR7—system shall record "
        "security-relevant actions in audit logs; FR8—system shall expose dashboard aggregates "
        "per role."
    )
    doc.add_paragraph(
        "Non-functional requirements drew on ISO/IEC 25010 (2011) quality characteristics. "
        "Security (NFR1) mandates bcrypt hashing, Helmet headers, input validation, and "
        "rate limiting per OWASP (2021) guidance. Maintainability (NFR2) mandates Clean "
        "Architecture layering and repository abstractions (Martin, 2017). Performance (NFR3) "
        "targets interactive response for CRUD operations on local networks; AI calls acknowledge "
        "external latency. Reliability (NFR4) requires graceful AI fallback. Usability (NFR5) "
        "targets Material Design consistency for learnability. Portability (NFR6) targets "
        "Node.js LTS and PostgreSQL compatibility documented in README instructions."
    )
    doc.add_paragraph(
        "Requirements were prioritised using MoSCoW implicitly: authentication, RBAC, job creation, "
        "and AI analysis were 'Must'; dashboard KPIs and audit logs were 'Should'; advanced "
        "assignment and notifications were 'Could' (largely deferred). Traceability from "
        "requirements to implementation is presented in Chapter 5 and Chapter 6 through module "
        "descriptions and deliverable tables, supporting examiner verification without a formal "
        "requirements management tool."
    )
    doc.add_paragraph(
        "User stories supplemented formal requirement identifiers. Example: 'As a job advisor, "
        "I want to submit a free-text complaint for a registered vehicle so that the system "
        "creates separate jobs per issue and routes them to appropriate departments.' Acceptance "
        "criteria specify AI log creation, minimum one job per detected issue, HTTP 201 response "
        "with job array, and visibility on advisor dashboard. Similar stories cover department "
        "technician start/complete flows and customer read-only visibility—translating stakeholder "
        "language into testable conditions for manual validation."
    )
    doc.add_paragraph(
        "Constraints from the academic brief capped team size and timeline, functioning as "
        "non-negotiable scope boundaries alongside MoSCoW prioritisation. Where commercial "
        "projects might extend timelines for automated testing or deployment hardening, this "
        "project redirected effort toward demonstrable AI integration and RBAC completeness—"
        "decisions recorded transparently to support critical discussion in Chapter 7."
    )
    doc.add_paragraph(
        "Competitive analysis of open-source repair management projects informed non-functional "
        "priorities: many repositories emphasise invoicing or appointment scheduling without "
        "integrated LLM intake. AutoRepairAgent differentiated requirements toward AI logging, "
        "multi-department RBAC, and Clean Architecture documentation suitable for academic "
        "evaluation—requirements unlikely to emerge from generic product backlogs alone."
    )

    doc.add_heading("4.3 System Design Methodology", level=2)
    doc.add_paragraph(
        "System design employed established modelling techniques adapted to project scale. "
        "High-level architecture was expressed as a three-tier diagram showing React SPA, "
        "Express REST API with Clean Architecture layers, PostgreSQL database, and external "
        "DeepSeek API—communicated in progress report slides and detailed in Chapter 5. "
        "Component responsibilities follow Fowler's (2002) layering guidance: controllers parse "
        "HTTP and invoke services; services encode business rules; repositories encapsulate "
        "persistence."
    )
    doc.add_paragraph(
        "Entity-relationship design preceded Prisma schema authoring. Core entities—User, Role, "
        "Department, Customer, Vehicle, Job, JobAssignment, JobComment, AiAnalysisLog, "
        "AuditLog—were normalised to third normal form with foreign keys expressing ownership "
        "and assignment relationships. Jobs link to vehicles and departments; assignments link "
        "jobs to department users; AI logs link to analysis requests with JSON payloads capturing "
        "model output. Standard audit columns (created_date, updated_date, created_by, updated_by) "
        "appear across tables supporting traceability recommended in enterprise data modelling "
        "practice (Sommerville, 2016)."
    )
    doc.add_paragraph(
        "Behavioural design utilised UML concepts where instructive without exhaustive formal "
        "modelling. Job lifecycle was specified as a state machine: Pending → Assigned → "
        "In Progress → Completed, with guards enforcing valid transitions (e.g., only assigned "
        "department users may start jobs). Sequence diagrams for AI analysis illustrated steps: "
        "advisor POST /api/jobs/analyze → JobService → DeepSeekAIService → repository persistence "
        "→ multiple Job rows → assignment records → HTTP 201 response with job array. These "
        "artefacts guided implementation consistency and appear as figures in the final report."
    )
    doc.add_paragraph(
        "API design followed REST resource naming per Fielding (2000): plural nouns, method "
        "semantics (GET list/detail, POST create, PUT update, DELETE remove, PATCH partial "
        "state), and nested actions where RPC-style clarity aids workflow endpoints (/jobs/analyze, "
        "/jobs/:id/start). Response envelopes use consistent JSON structures with error objects "
        "carrying message and statusCode fields parsed by the React API client."
    )
    doc.add_paragraph(
        "Security design mapped roles to permissions in a matrix (Table 5.3 in Chapter 5) "
        "derived from RBAC literature (Sandhu & Samarati, 1994). Middleware composition chains "
        "authenticate JWT, attach user context, authorise role sets, validate Zod schemas, and "
        "invoke controllers—separation enabling reuse across route modules."
    )
    doc.add_paragraph(
        "Design reviews occurred informally at phase boundaries rather than through formal "
        "structured walkthroughs mandated in safety-critical industries. Nevertheless, checklists "
        "derived from OWASP (2021) and Clean Architecture guidance (Martin, 2017) prompted "
        "verification questions: Are all new routes protected? Do repositories leak Prisma types "
        "into controllers? Are AI failures handled with user-visible messages? This lightweight "
        "review discipline approximates professional practice within resource constraints."
    )
    doc.add_paragraph(
        "Data migration strategy relied on Prisma seed scripts rather than ETL from legacy systems, "
        "reflecting greenfield implementation without incumbent data sources. For workshops adopting "
        "the system in future, CSV import utilities and validation reports would become necessary—"
        "artefacts identified as deployment-phase work outside current methodology."
    )

    doc.add_heading("4.4 Implementation Methodology", level=2)
    doc.add_paragraph(
        "Implementation proceeded through manual coding in JavaScript (Node.js backend) and "
        "JSX (React front-end) without code generation beyond Prisma client autogeneration. "
        "Development environment comprised Visual Studio Code, Node.js 18+ LTS, npm package "
        "management, PostgreSQL (Neon cloud instance), Git version control, Postman for API "
        "testing, and browser developer tools for UI debugging. This toolchain represents "
        "mainstream full-stack practice documented extensively in practitioner sources (Newman, 2021)."
    )
    doc.add_paragraph(
        "Backend implementation order: configuration and logger setup; Prisma schema and "
        "migrations; repository classes; application services including AuthService, "
        "UserService, JobService, and DeepSeekAIService; Express routes and controllers; "
        "middleware for auth, RBAC, validation, and error handling; seed script populating "
        "roles, departments, test users, sample customers, vehicles, and demonstration jobs. "
        "Front-end implementation order: Vite bootstrap; MUI theme; AuthContext; API service "
        "module with axios/fetch interceptors; layout and routing; page components mirroring "
        "backend modules; role-based dashboard views."
    )
    doc.add_paragraph(
        "Table 4.1 documents the technology stack with rationale per layer. Selection criteria "
        "emphasised ecosystem maturity, alignment with Clean Architecture in Node, examiner "
        "familiarity, and zero licensing cost appropriate to academic projects."
    )

    # Table 4.1 — Technology stack
    doc.add_paragraph()
    t41 = doc.add_table(rows=1, cols=3)
    t41.style = "Table Grid"
    h41 = t41.rows[0].cells
    h41[0].text = "Layer"
    h41[1].text = "Technology"
    h41[2].text = "Role / Rationale"
    stack_data = [
        ("Runtime", "Node.js (LTS)", "JavaScript server runtime; npm ecosystem"),
        ("Backend framework", "Express.js", "Minimal REST HTTP layer; middleware composition"),
        ("Database", "PostgreSQL (Neon)", "Relational ACID persistence; cloud-hosted demo DB"),
        ("ORM", "Prisma", "Schema-first modelling; migrations; type-safe queries"),
        ("Authentication", "JWT + bcrypt", "Stateless tokens; secure password storage"),
        ("Validation", "Zod", "Runtime schema validation at API boundary"),
        ("Logging", "Winston", "Structured application logging"),
        ("Security middleware", "Helmet, CORS, express-rate-limit", "Headers, origin policy, abuse mitigation"),
        ("AI engine", "DeepSeek API", "LLM complaint classification and decomposition"),
        ("Front-end", "React 18 + Vite", "SPA component model; fast dev server"),
        ("UI library", "Material UI (MUI)", "Consistent Material Design components"),
        ("HTTP client", "Axios / fetch via api.js", "JWT injection; error normalisation"),
        ("API testing", "Postman collection", "Manual regression; demo scripts"),
        ("Architecture", "Clean Architecture + Repository", "Separation of concerns; test seams"),
    ]
    for layer, tech, role in stack_data:
        r = t41.add_row().cells
        r[0].text = layer
        r[1].text = tech
        r[2].text = role
    doc.add_paragraph("Table 4.1. Technology stack")

    doc.add_paragraph(
        "Coding conventions followed Martin's (2017) readability guidance: meaningful module "
        "names mirroring domain vocabulary; small service functions; explicit error types in "
        "shared modules; environment variables for secrets via dotenv. DeepSeek integration "
        "isolates prompt construction and response parsing in DeepSeekAIService, enabling "
        "substitution or mock injection. Front-end components favour functional React patterns "
        "with hooks for state and effects, co-locating page-level data fetching with MUI "
        "presentation components."
    )
    doc.add_paragraph(
        "Configuration management separated secrets from committed source. The .env.example template "
        "documents DATABASE_URL, JWT_SECRET, DEEPSEEK_API_KEY, PORT, and CORS origin variables "
        "without embedding live credentials—aligning with OWASP (2021) secret management guidance. "
        "Package.json scripts standardised repetitive tasks: prisma:generate, prisma:migrate, "
        "prisma:seed, db:setup, dev, and start—reducing manual error during examiner replication."
    )
    doc.add_paragraph(
        "Front-end state management relied on React Context for authentication rather than "
        " heavier global stores, reflecting project scale and YAGNI ('You Aren't Gonna Need It') "
        "principles (Martin, 2017). Role information encoded in JWT claims drives conditional "
        "rendering of navigation items in MainLayout, though authoritative enforcement remains "
        "server-side per RBAC literature (Sandhu & Samarati, 1994)."
    )
    doc.add_paragraph(
        "Error handling conventions standardised HTTP status usage: 400 for validation failures, "
        "401 for missing or invalid tokens, 403 for insufficient role permissions, 404 for "
        "missing resources, 409 for conflict states, and 500 for unexpected server faults with "
        "sanitised client messages. This mapping follows REST best practices (Fielding, 2000) and "
        "simplifies Postman test scripting through predictable outcome classes."
    )

    doc.add_heading("4.5 Testing and Validation", level=2)
    doc.add_paragraph(
        "Testing strategy reflected project constraints: comprehensive automated test suites were "
        "out of scope (Chapter 3), so validation emphasised structured manual testing, API "
        "contract verification via Postman, and scenario-driven walkthroughs using Prisma seed "
        "data. This approach aligns with early-stage prototype validation common in Master's "
        "projects prior to industrial hardening (Sommerville, 2016), while acknowledging "
        "limitations discussed in Chapter 7."
    )
    doc.add_paragraph(
        "Seed data established reproducible personas: admin@autorepair.com, advisor@autorepair.com, "
        "department users per specialisation, and customer@autorepair.com with password "
        "Password123!; vehicles ABC123 (Toyota Camry) and XYZ789 (Honda Civic). Scenarios "
        "executed included: unauthorised access attempts (expect HTTP 401/403); advisor analysis "
        "of compound complaint yielding mechanical and electrical jobs; department user job "
        "filtering; start and complete transitions; dashboard statistic updates; AI log "
        "persistence review; admin user deactivation blocking login."
    )
    doc.add_paragraph(
        "Postman collection automation captured JWT tokens on login requests via test scripts, "
        "chaining subsequent calls with collection variables (baseUrl, token, jobId). Recommended "
        "flow documented in README: health check → multi-role logins → analyze complaint → "
        "filtered job retrieval → lifecycle transitions → dashboard endpoints. Response examples "
        "for success and error cases assisted regression when controllers or validators changed "
        "during Phase 2 refinements."
    )
    doc.add_paragraph(
        "Front-end validation combined manual UI exploration with browser network inspection "
        "confirming Authorization headers, error toast handling, and role-appropriate navigation "
        "menus in MainLayout. Screenshots captured for progress reports serve as visual test "
        "evidence (login, users, departments, customers, vehicles, create job, jobs list, AI "
        "analysis log, dashboards). Cross-origin development used Vite proxy configuration to "
        "mitigate CORS friction during local integration."
    )
    doc.add_paragraph(
        "AI validation examined both nominal DeepSeek responses and simulated failure through "
        "invalid API keys or network disconnection, confirming fallback keyword classifier "
        "produces jobs rather than 500 errors without persistence gaps. Confidence scores and "
        "stored reasoning strings were inspected in ai_analysis_logs via API and UI log viewer "
        "to verify explainability requirements derived from Amershi et al. (2019)."
    )
    doc.add_paragraph(
        "Validation limitations are acknowledged explicitly. Without automated regression suites, "
        "undetected defects may emerge in edge paths—concurrent job updates, unusual Unicode "
        "inputs, or token expiry during long sessions. Sommerville (2016) categorises such risk "
        "as technical debt acceptable in prototypes but requiring remediation before production. "
        "Chapter 7 enumerates specific residual risks and recommended test investments including "
        "Jest unit tests for services, Supertest integration tests for routes, and Playwright "
        "end-to-end flows for critical advisor and technician journeys."
    )
    doc.add_paragraph(
        "Performance validation was observational: API responses on local hardware appeared "
        "instantaneous for CRUD operations while AI analysis exhibited variable latency dependent "
        "on DeepSeek API response times. No formal load testing with tools such as k6 or JMeter "
        "was conducted; scalability claims therefore remain architectural rather than empirical "
        "(Newman, 2021)."
    )
    doc.add_paragraph(
        "Regression testing followed informal checklists repeated before progress report "
        "demonstrations: login for each role, analyse standard compound complaint, verify job "
        "counts on dashboards, complete one job end-to-end, confirm audit log entries. Checklist "
        "discipline compensates partially for absent automation while remaining vulnerable to "
        "human oversight—an methodological limitation stated for examiner transparency "
        "(Sommerville, 2016)."
    )
    doc.add_paragraph(
        "Exploratory testing of edge-case complaints—empty strings rejected by validation, "
        "very long narratives within size limits, mixed-language paragraphs—supplemented scripted "
        "scenarios and informed minor validator adjustments without expanding into formal "
        "boundary-value test documentation."
    )

    doc.add_heading("4.6 Ethical Considerations", level=2)
    doc.add_paragraph(
        "Ethical considerations spanned data privacy, AI accountability, and responsible research "
        "conduct. Although seed data uses fictional or anonymised identities, a production "
        "deployment would process personal identifiers (names, contact details, vehicle "
        "registration) warranting compliance with applicable data protection frameworks. Design "
        "countermeasures include RBAC least privilege, audit trails, password hashing, and "
        "avoidance of exposing sensitive fields in customer-facing views beyond necessity "
        "(OWASP, 2021; ISO/IEC 27001 principles)."
    )
    doc.add_paragraph(
        "AI accountability requires transparency about automated decisions affecting workflow "
        "routing. Persisting model outputs enables human review; advisors implicitly retain "
        "authority to reject or manually recreate jobs if classification appears incorrect—"
        "though explicit UI affordances for override were limited in prototype scope. Amershi et "
        "al. (2019) recommend communicating AI uncertainty; displaying confidence scores partially "
        "addresses this obligation. Fallback keyword classification must be documented so users "
        "understand degraded mode behaviour—not presented as equivalent to LLM quality."
    )
    doc.add_paragraph(
        "External API usage raises data residency and third-party processing questions: complaint "
        "text transmitted to DeepSeek constitutes personal data if coupled with vehicle "
        "identifiers. Academic demonstration minimises real customer data; production would "
        "require data processing agreements, opt-in consent, and potentially on-premise models "
        "for sensitive fleets. Environmental and cost ethics of LLM inference are noted but not "
        "quantified; future work may evaluate smaller local models for routine classification."
    )
    doc.add_paragraph(
        "Research integrity practices included accurate reporting of partial implementations "
        "(assignment algorithm simplification, absent automated tests), citation of foundational "
        "literature, and distinguishing demonstrative functional success from unverified "
        "performance claims. Supervisor oversight and progress report milestones provided "
        "accountability checkpoints discouraging overstatement of AI accuracy or security "
        "posture beyond evidence collected through manual validation."
    )
    doc.add_paragraph(
        "Bias and fairness considerations arise when AI models trained on predominantly English "
        "or Western automotive corpora classify complaints in other languages or referencing "
        "locally common vehicle platforms. Without demographic parity testing, the project "
        "cannot claim equitable performance across user groups. Documentation of multilingual "
        "input acceptance coupled with UI language limitations represents an honest characterisation "
        "of current capability and motivates localisation and evaluation research in future work "
        "(Amershi et al., 2019)."
    )
    doc.add_paragraph(
        "Institutional ethical review, where required by programme regulations, would examine "
        "data handling and participant involvement. This implementation uses synthetic seed personas "
        "without human subjects experimentation; ethical emphasis therefore concentrates on "
        "software practice—secure defaults, transparent AI logging, and accurate reporting—rather "
        "than informed consent protocols for field trials absent from scope."
    )

    doc.add_page_break()


def chapter5_implementation(doc):
    """Chapter 5: System Design and Implementation (~3,200 words)."""
    doc.add_heading("5. System Design and Implementation", level=1)

    doc.add_heading("5.1 Architecture Overview", level=2)
    doc.add_paragraph(
        "AutoRepairAgent implements a three-tier web architecture comprising a React "
        "single-page application (presentation tier), a Node.js and Express.js REST API "
        "(application tier), and a PostgreSQL relational database (data tier). The design "
        "deliberately separates concerns across Clean Architecture layers so that domain "
        "rules, application orchestration, infrastructure adapters, and HTTP presentation "
        "remain independently evolvable (Martin, 2017). The presentation tier runs on "
        "Vite development server port 5173 and proxies API requests to the backend on "
        "port 3000, preserving a unified origin during local development while maintaining "
        "clear deployment boundaries for future production hosting."
    )
    doc.add_paragraph(
        "Within the backend, four conceptual layers structure the codebase. The domain layer "
        "under src/domain holds enumerations for roles, departments, job statuses, and audit "
        "actions—pure constants without framework dependencies. The application layer under "
        "src/application/services encapsulates use-case logic: authentication, user and "
        "department administration, customer and vehicle management, job lifecycle "
        "orchestration including AI analysis, dashboard aggregation, and audit logging. The "
        "infrastructure layer under src/infrastructure/repositories implements the Repository "
        "pattern via Prisma Client, isolating SQL generation and connection management from "
        "business rules. The presentation layer under src/presentation exposes Express "
        "routes, controllers, middleware, and Zod validation schemas, translating HTTP "
        "requests into service invocations and structured JSON responses."
    )
    doc.add_paragraph(
        "Dependency direction follows Clean Architecture convention: outer layers depend on "
        "inner abstractions, never the reverse. Controllers invoke services; services invoke "
        "repositories; repositories invoke Prisma. No repository imports Express; no domain "
        "enum imports Prisma. This discipline proved valuable during Phase 2 when AI "
        "integration and job assignment logic were added without restructuring Phase 1 "
        "authentication modules. Cross-cutting concerns—authentication, RBAC authorisation, "
        "request validation, rate limiting, structured error handling, and Winston logging—"
        "are implemented as Express middleware chains applied consistently before controller "
        "entry points."
    )
    doc.add_paragraph(
        "Figure 5.1 (referenced in the List of Figures) depicts the three-tier topology with "
        "Clean Architecture layering. External actors—administrators, job advisors, department "
        "technicians, and customers—interact exclusively with the React SPA. The SPA "
        "communicates with thirty-four REST endpoints grouped under /api/auth, /api/admin, "
        "/api/customers, /api/vehicles, /api/jobs, and /api/dashboard, plus a /health "
        "diagnostic endpoint. The DeepSeek large language model API constitutes an external "
        "service invoked synchronously during complaint analysis, with explicit timeout and "
        "fallback behaviour documented in Section 5.5. Neon-hosted PostgreSQL provides "
        "managed persistence with connection pooling compatible with Prisma's datasource "
        "configuration via DATABASE_URL."
    )
    doc.add_paragraph(
        "The architectural choice to adopt a monolithic Express application rather than "
        "microservices reflects project scope, academic timeline, and operational simplicity "
        "for a single-workshop tenant prototype. A monolith reduces deployment complexity, "
        "eliminates inter-service network latency for job creation workflows, and simplifies "
        "transactional consistency when a single complaint spawns multiple job records within "
        "one database transaction context. Future decomposition—e.g., extracting AI analysis "
        "into an asynchronous worker—remains feasible because DeepSeekAIService is already "
        "isolated in the application layer with a narrow interface (analyzeComplaint)."
    )
    doc.add_paragraph(
        "Error handling follows a unified AppError hierarchy (ValidationError, NotFoundError, "
        "UnauthorizedError, ForbiddenError) processed by a global errorHandler middleware "
        "that maps exceptions to appropriate HTTP status codes and JSON envelopes "
        "{ success: false, message: ... }. This pattern ensures the React client receives "
        "predictable failure semantics whether validation fails at the Zod middleware layer "
        "or business rules reject an operation in JobService. Successful responses similarly "
        "adhere to { success: true, data: ... } conventions consumed by the Axios-based API "
        "service in the front-end."
    )

    doc.add_heading("5.2 Database Design", level=2)
    doc.add_paragraph(
        "The PostgreSQL schema comprises ten relational tables defined in prisma/schema.prisma "
        "and materialised through Prisma migrations. Table design emphasises normalisation, "
        "referential integrity via foreign keys, audit-friendly metadata columns (created_date, "
        "updated_date, created_by, updated_by), and enumerated types for roles, departments, "
        "job statuses, and audit actions. Prisma's @@map directives preserve snake_case column "
        "names in PostgreSQL while exposing camelCase field names in JavaScript, bridging "
        "database convention with Node.js idioms without an additional mapping layer."
    )
    doc.add_paragraph(
        "Four Prisma enums constrain domain vocabulary at the persistence boundary. RoleName "
        "defines eight roles: ADMIN, JOB_ADVISOR, MECHANICAL, ELECTRICAL, BODY_REPAIR, PAINT, "
        "GENERAL_INSPECTION, and CUSTOMER. DepartmentCode defines five workshop departments "
        "aligned with specialist bays. JobStatus tracks lifecycle states PENDING, ASSIGNED, "
        "IN_PROGRESS, COMPLETED, and CANCELLED. AuditAction enumerates seventeen auditable "
        "events spanning authentication, job operations, user administration, customer and "
        "vehicle CRUD, and department management. Enum enforcement at the database level "
        "prevents invalid state insertion even if application validation were bypassed."
    )
    doc.add_paragraph(
        "Core entity relationships form a directed graph centred on jobs. The User entity "
        "references Role (mandatory) and optionally Department and Customer—for portal users "
        "linked to customer records. Customer owns many Vehicles; Vehicle owns many Jobs. Job "
        "references Department, optional assignedUser, and optional AIAnalysisLog. JobAssignment "
        "and JobComment provide normalised histories of assignment events and technician "
        "notes. AuditLog references User optionally and stores polymorphic entity references "
        "via entityType and entityId fields with JSON details payloads for contextual metadata."
    )
    doc.add_paragraph(
        "The AIAnalysisLog table captures each complaint analysis invocation independently of "
        "resulting jobs, supporting retrospective review of AI reasoning. It stores the "
        "original complaint text, vehicle registration number, serialised issues array as JSON, "
        "and optional raw DeepSeek response text. Multiple Job records may reference a single "
        "AIAnalysisLog when compound complaints decompose into several department-routed issues—"
        "a central workflow requirement validated in Chapter 6. Job numbers are generated "
        "programmatically via generateJobNumber utility ensuring human-readable unique "
        "identifiers distinct from UUID primary keys."
    )
    doc.add_paragraph(
        "Indexing strategy leverages Prisma defaults: unique constraints on User.email, "
        "Vehicle.registrationNumber, Job.jobNumber, Role.name, and Department.code. Foreign "
        "key indexes support join performance for dashboard aggregations and role-filtered job "
        "listings. Cascade deletion on JobAssignment and JobComment prevents orphan records "
        "when jobs are removed. The schema intentionally omits soft-delete flags on jobs and "
        "customers, relying on explicit status transitions and hard deletion with audit trail "
        "preservation—a simplification acknowledged in Chapter 7."
    )
    doc.add_paragraph(
        "Table 5.1 summarises all ten database tables with primary purpose descriptions. "
        "Figure 5.2 (entity-relationship diagram) provides visual complement referenced in "
        "the List of Figures."
    )

    doc.add_paragraph()
    t51 = doc.add_table(rows=1, cols=3)
    t51.style = "Table Grid"
    hdr = t51.rows[0].cells
    hdr[0].text = "Table"
    hdr[1].text = "Prisma Model"
    hdr[2].text = "Description"
    tables_data = [
        ("roles", "Role", "Eight system roles with unique RoleName enum values"),
        ("departments", "Department", "Five repair departments with code, name, active flag"),
        ("users", "User", "Authenticated accounts with role, optional department and customer link"),
        ("customers", "Customer", "Workshop customers with contact details and vehicle ownership"),
        ("vehicles", "Vehicle", "Registered vehicles linked to customers; unique registration numbers"),
        ("ai_analysis_logs", "AIAnalysisLog", "Persisted AI complaint analysis with JSON issues array"),
        ("jobs", "Job", "Repair jobs with status, department, AI metadata, assignment"),
        ("job_assignments", "JobAssignment", "Historical record of job-to-technician assignments"),
        ("job_comments", "JobComment", "Technician completion notes and commentary"),
        ("audit_logs", "AuditLog", "Security and operational audit trail with JSON details"),
    ]
    for tbl, model, desc in tables_data:
        row = t51.add_row().cells
        row[0].text = tbl
        row[1].text = model
        row[2].text = desc
    doc.add_paragraph("Table 5.1. Database tables and descriptions")

    doc.add_heading("5.3 Authentication and Security", level=2)
    doc.add_paragraph(
        "Security architecture implements defence-in-depth across transport headers, "
        "authentication, authorisation, input validation, and operational logging. JSON Web "
        "Tokens (JWT) provide stateless authentication: successful login via POST "
        "/api/auth/login returns a signed token with configurable expiry (default 24 hours "
        "via JWT_EXPIRES_IN). The authenticate middleware extracts Bearer tokens, verifies "
        "signatures against JWT_SECRET (minimum sixteen characters enforced by Zod env "
        "validation), loads the active user with role and department relations, and attaches "
        "req.user for downstream middleware and controllers."
    )
    doc.add_paragraph(
        "Password security employs bcrypt with cost factor 12 for all password hashing "
        "operations in UserService.createUser, UserService.updateUser (when password "
        "changes), and prisma/seed.js for development accounts. Cost 12 represents a "
        "deliberate balance between brute-force resistance and acceptable latency on "
        "development hardware—approximately 250–350 milliseconds per hash on typical "
        "laptops. Plaintext passwords never persist; AuthService.compare validates "
        "credentials via bcrypt.compare. Deactivated users (isActive: false) are rejected "
        "at login with generic error messaging to prevent account enumeration."
    )
    doc.add_paragraph(
        "Role-based access control (RBAC) enforces eight distinct roles through composable "
        "middleware. The authorize(...roles) factory restricts routes to enumerated roles. "
        "Specialised guards include isAdmin (administrative CRUD), isJobAdvisorOrAdmin "
        "(customer, vehicle, job creation), isDepartmentUser (department staff operations), "
        "and isCustomer (customer dashboard). Job-specific middleware filterJobsByRole and "
        "canAccessJob implement row-level scoping: department users see only their "
        "department's jobs; customers see only jobs for vehicles they own; administrators "
        "and advisors see all jobs. This matrix is formalised in Table 5.3."
    )
    doc.add_paragraph(
        "HTTP hardening applies Helmet middleware for secure response headers, CORS "
        "configuration via CORS_ORIGIN environment variable (default permissive * for "
        "development), and express-rate-limit with defaults of 100 requests per 900,000 "
        "milliseconds (fifteen minutes) per client IP. Rate limiting mitigates brute-force "
        "login attempts and accidental API abuse during development demonstrations. Request "
        "body parsing limits JSON payloads to 10 megabytes—generous for complaint text while "
        "bounding denial-of-service exposure."
    )
    doc.add_paragraph(
        "Input validation uses Zod schemas in src/presentation/validators/schemas.js, applied "
        "via validate middleware before controller execution. Schemas cover login credentials, "
        "user and department CRUD, customer and vehicle payloads, job analysis requests, job "
        "updates, completion comments, and UUID path parameters. Environment variables "
        "themselves are validated at startup through a Zod envSchema in src/config/env.js, "
        "causing immediate process termination with field-level error reporting if DATABASE_URL, "
        "JWT_SECRET, or DEEPSEEK_API_KEY are missing—fail-fast configuration preventing "
        "partially initialised insecure deployments."
    )
    doc.add_paragraph(
        "AuditService records security-relevant and operational events to audit_logs with "
        "action enum, entity type, optional entity ID, user ID, client IP address, and "
        "structured JSON details. Login events, job creation with AI confidence metadata, "
        "assignment actions, and administrative user mutations are among logged actions. "
        "While no dedicated audit query API endpoint is exposed, audit records persist for "
        "forensic review via direct database access or future reporting modules."
    )

    doc.add_heading("5.4 Backend Modules", level=2)
    doc.add_paragraph(
        "The backend organises functionality into seven cohesive modules mapped to service "
        "classes, repositories, route groups, and controllers. Each module follows the "
        "controller-service-repository pattern with asyncHandler wrappers eliminating "
        "repetitive try-catch blocks in route handlers."
    )
    doc.add_paragraph(
        "The Auth module (AuthService, authController, authRoutes) handles credential "
        "verification and JWT issuance. A single public endpoint POST /api/auth/login accepts "
        "email and password, validates input via loginSchema, queries UserRepository with "
        "role inclusion, verifies bcrypt hash, logs LOGIN audit event, and returns token plus "
        "sanitised user profile excluding password field."
    )
    doc.add_paragraph(
        "The User module (UserService, userController, userRoutes under /api/admin) provides "
        "full administrative lifecycle for workshop staff accounts. Administrators create users "
        "with role and optional department assignment, list and filter users, retrieve by ID, "
        "update profiles including password rotation, soft-delete via deactivation, and "
        "reactivate accounts. User mutations emit corresponding audit events "
        "(USER_CREATED, USER_UPDATED, USER_DELETED, USER_ACTIVATED, USER_DEACTIVATED). All "
        "eleven admin routes require authenticate plus isAdmin middleware."
    )
    doc.add_paragraph(
        "The Customer module (CustomerService, customerController, customerRoutes under "
        "/api/customers) supports CRUD for workshop customer records accessible to "
        "administrators and job advisors. Customer creation captures first name, last name, "
        "phone (required), optional email and address. Deletion cascades are not automatic—"
        "vehicles must be managed separately—reflecting cautious data stewardship. Customer "
        "portal users link to Customer records via User.customerId foreign key."
    )
    doc.add_paragraph(
        "The Vehicle module (VehicleService, vehicleController, vehicleRoutes under "
        "/api/vehicles) manages vehicle registration with unique registrationNumber constraint, "
        "optional chassis number, make, model, year, and mandatory customerId association. "
        "Vehicles ABC123 (Toyota Camry 2020) and XYZ789 (Honda Civic 2019) in seed data "
        "demonstrate typical registration patterns used in end-to-end testing."
    )
    doc.add_paragraph(
        "The Job module (JobService, jobController, jobRoutes under /api/jobs) constitutes "
        "the system's operational core. POST /api/jobs/analyze invokes DeepSeek classification, "
        "persists AIAnalysisLog, creates one Job per detected issue, auto-assigns to first "
        "available active department user, and returns analysis summary with created jobs. "
        "GET /api/jobs lists jobs filtered by role. GET/PUT/DELETE /api/jobs/:id support "
        "inspection, modification, and removal with canAccessJob guards. POST /api/jobs/:id/start "
        "transitions ASSIGNED jobs to IN_PROGRESS with startedAt timestamp. POST "
        "/api/jobs/:id/complete records completion time, optional technician comment via "
        "JobComment, and calculates timeTakenMinutes."
    )
    doc.add_paragraph(
        "The Dashboard module (DashboardService, dashboardController, dashboardRoutes) "
        "aggregates KPI metrics per persona: /api/dashboard/admin (total users, departments, "
        "jobs by status), /api/dashboard/job-advisor (pending assignments, recent jobs), "
        "/api/dashboard/department (department queue counts and active jobs), and "
        "/api/dashboard/customer (owned vehicle job statuses). Aggregation queries execute "
        "via Prisma count and groupBy operations optimised for prototype data volumes."
    )
    doc.add_paragraph(
        "The Audit module (AuditService, AuditLogRepository) operates as a cross-cutting "
        "service invoked by AuthService, UserService, CustomerService, VehicleService, and "
        "JobService rather than exposing standalone REST endpoints. This design keeps audit "
        "writes consistent while avoiding unauthorised audit tampering through public APIs."
    )
    doc.add_paragraph(
        "Table 5.2 catalogues all thirty-four API endpoints with HTTP methods, paths, and "
        "authorisation requirements, constituting the complete REST contract documented in "
        "the Postman collection referenced in Appendix B."
    )

    doc.add_paragraph()
    t52 = doc.add_table(rows=1, cols=4)
    t52.style = "Table Grid"
    hdr = t52.rows[0].cells
    hdr[0].text = "Method"
    hdr[1].text = "Endpoint"
    hdr[2].text = "Module"
    hdr[3].text = "Authorisation"
    endpoints_data = [
        ("GET", "/health", "System", "Public"),
        ("POST", "/api/auth/login", "Auth", "Public"),
        ("POST", "/api/admin/users", "User", "Admin"),
        ("GET", "/api/admin/users", "User", "Admin"),
        ("GET", "/api/admin/users/:id", "User", "Admin"),
        ("PUT", "/api/admin/users/:id", "User", "Admin"),
        ("DELETE", "/api/admin/users/:id", "User", "Admin"),
        ("PATCH", "/api/admin/users/:id/activate", "User", "Admin"),
        ("PATCH", "/api/admin/users/:id/deactivate", "User", "Admin"),
        ("POST", "/api/admin/departments", "User", "Admin"),
        ("GET", "/api/admin/departments", "User", "Admin"),
        ("PUT", "/api/admin/departments/:id", "User", "Admin"),
        ("DELETE", "/api/admin/departments/:id", "User", "Admin"),
        ("POST", "/api/customers", "Customer", "Admin, Job Advisor"),
        ("GET", "/api/customers", "Customer", "Admin, Job Advisor"),
        ("GET", "/api/customers/:id", "Customer", "Admin, Job Advisor"),
        ("PUT", "/api/customers/:id", "Customer", "Admin, Job Advisor"),
        ("DELETE", "/api/customers/:id", "Customer", "Admin, Job Advisor"),
        ("POST", "/api/vehicles", "Vehicle", "Admin, Job Advisor"),
        ("GET", "/api/vehicles", "Vehicle", "Admin, Job Advisor"),
        ("GET", "/api/vehicles/:id", "Vehicle", "Admin, Job Advisor"),
        ("PUT", "/api/vehicles/:id", "Vehicle", "Admin, Job Advisor"),
        ("DELETE", "/api/vehicles/:id", "Vehicle", "Admin, Job Advisor"),
        ("POST", "/api/jobs/analyze", "Job", "Admin, Job Advisor"),
        ("GET", "/api/jobs", "Job", "Role-filtered"),
        ("GET", "/api/jobs/:id", "Job", "Role-scoped access"),
        ("PUT", "/api/jobs/:id", "Job", "Role-scoped access"),
        ("DELETE", "/api/jobs/:id", "Job", "Role-scoped access"),
        ("POST", "/api/jobs/:id/start", "Job", "Department user"),
        ("POST", "/api/jobs/:id/complete", "Job", "Department user"),
        ("GET", "/api/dashboard/admin", "Dashboard", "Admin"),
        ("GET", "/api/dashboard/job-advisor", "Dashboard", "Admin, Job Advisor"),
        ("GET", "/api/dashboard/department", "Dashboard", "Department user"),
        ("GET", "/api/dashboard/customer", "Dashboard", "Customer"),
    ]
    for method, endpoint, module, auth in endpoints_data:
        row = t52.add_row().cells
        row[0].text = method
        row[1].text = endpoint
        row[2].text = module
        row[3].text = auth
    doc.add_paragraph("Table 5.2. API endpoint summary (34 endpoints)")

    doc.add_paragraph()
    t53 = doc.add_table(rows=1, cols=9)
    t53.style = "Table Grid"
    rbac_hdr = t53.rows[0].cells
    rbac_hdr[0].text = "Feature / Route"
    rbac_hdr[1].text = "ADMIN"
    rbac_hdr[2].text = "JOB_ADVISOR"
    rbac_hdr[3].text = "DEPT USER"
    rbac_hdr[4].text = "CUSTOMER"
    rbac_hdr[5].text = "MECH"
    rbac_hdr[6].text = "ELEC"
    rbac_hdr[7].text = "BODY"
    rbac_hdr[8].text = "PAINT/GI"
    rbac_data = [
        ("User management", "Yes", "No", "No", "No", "No", "No", "No", "No"),
        ("Department admin", "Yes", "No", "No", "No", "No", "No", "No", "No"),
        ("Customer CRUD", "Yes", "Yes", "No", "No", "No", "No", "No", "No"),
        ("Vehicle CRUD", "Yes", "Yes", "No", "No", "No", "No", "No", "No"),
        ("AI job creation", "Yes", "Yes", "No", "No", "No", "No", "No", "No"),
        ("View all jobs", "Yes", "Yes", "No", "No", "No", "No", "No", "No"),
        ("View dept jobs", "No", "No", "Yes", "No", "Yes", "Yes", "Yes", "Yes"),
        ("Start/complete job", "No", "No", "Yes", "No", "Yes", "Yes", "Yes", "Yes"),
        ("Own vehicle jobs", "No", "No", "No", "Yes", "No", "No", "No", "No"),
        ("Admin dashboard", "Yes", "No", "No", "No", "No", "No", "No", "No"),
        ("Advisor dashboard", "Yes", "Yes", "No", "No", "No", "No", "No", "No"),
        ("Dept dashboard", "No", "No", "Yes", "No", "Yes", "Yes", "Yes", "Yes"),
        ("Customer dashboard", "No", "No", "No", "Yes", "No", "No", "No", "No"),
        ("AI analysis log view", "Yes", "Yes", "No", "No", "No", "No", "No", "No"),
    ]
    for feature, *perms in rbac_data:
        row = t53.add_row().cells
        row[0].text = feature
        for i, perm in enumerate(perms):
            row[i + 1].text = perm
    doc.add_paragraph(
        "Table 5.3. Role-based access control matrix (DEPT USER = any department role; "
        "MECH/ELEC/BODY/PAINT/GI = department-scoped access)"
    )

    doc.add_heading("5.5 AI Integration", level=2)
    doc.add_paragraph(
        "Artificial intelligence integration centres on DeepSeekAIService in the application "
        "layer, invoked by JobService.analyzeAndCreateJobs during POST /api/jobs/analyze. "
        "The service communicates with DeepSeek's chat completions API (default URL "
        "https://api.deepseek.com/chat/completions, model deepseek-chat) using an API key "
        "supplied via DEEPSEEK_API_KEY environment variable. Architectural isolation ensures "
        "controllers and repositories remain unaware of prompt engineering or HTTP fetch details."
    )
    doc.add_paragraph(
        "A comprehensive SYSTEM_PROMPT instructs the model to act as an automotive repair "
        "classification agent capable of analysing complaints in any language while emitting "
        "structured English output. The prompt enumerates five departments with exemplar "
        "issue categories—MECHANICAL (engine, transmission, brakes), ELECTRICAL (battery, "
        "wiring, ECU), BODY_REPAIR (dents, collision damage), PAINT (scratches, repainting), "
        "and GENERAL_INSPECTION (undetermined cases). The model must respond with valid JSON "
        "only, using response_format: { type: 'json_object' } in the API request body. Each "
        "issue object includes issue description, department code, confidence score between "
        "zero and one, and explanation string. Temperature is set to 0.2 for reproducible "
        "classification favouring deterministic routing over creative variation."
    )
    doc.add_paragraph(
        "Resilience mechanisms address production realities of external API dependency. "
        "AbortSignal.timeout(15000) enforces a fifteen-second request ceiling; exceeding this "
        "threshold triggers catch-block fallback. Non-OK HTTP responses, empty message content, "
        "and JSON parse failures similarly invoke fallbackAnalysis rather than failing the "
        "entire job creation workflow—ensuring workshop operations continue during API outages "
        "or key misconfiguration, albeit with reduced classification quality."
    )
    doc.add_paragraph(
        "The fallback keyword classifier inspects lowercase complaint text against curated "
        "keyword lists per department: mechanical terms (engine, transmission, brake, "
        "suspension, steering, cooling), electrical terms (battery, alternator, wiring, "
        "headlight, sensor, ecu, charging), body repair terms (dent, collision, door, panel, "
        "body), and paint terms (paint, scratch, repaint, color). Matched keywords produce "
        "issues with confidence 0.6 and explicit keyword-based explanations. Unmatched "
        "complaints default to GENERAL_INSPECTION with confidence 0.4, preserving workflow "
        "continuity while signalling manual review requirement."
    )
    doc.add_paragraph(
        "normalizeResponse post-processes AI output: department strings map through "
        "DEPARTMENT_MAP handling underscore and space variants; confidence clamps to [0,1]; "
        "empty issue arrays receive a default general inspection entry. Raw responses persist "
        "in AIAnalysisLog.rawResponse when available, enabling supervisor review of model "
        "outputs during academic evaluation. Figure 5.4 depicts the sequence: advisor submits "
        "complaint, JobService calls DeepSeek, analysis log created, jobs spawned per issue, "
        "auto-assignment executed, audit events recorded."
    )

    doc.add_heading("5.6 Frontend Design", level=2)
    doc.add_paragraph(
        "The presentation tier is a React 18 single-page application scaffolded with Vite 5, "
        "styled using Material UI (MUI) v5 with Emotion CSS-in-JS, and state-managed through "
        "TanStack Query v5 for server-state caching alongside React Context for authentication "
        "and theming. React Router v6 implements client-side navigation with protected routes "
        "enforcing role-based page access mirroring backend RBAC semantics."
    )
    doc.add_paragraph(
        "AuthContext wraps the application, persisting JWT tokens and user profiles in "
        "localStorage, attaching Authorization headers via Axios interceptors in services/api.js, "
        "and exposing login/logout helpers. ProtectedRoute components accept allowedRoles arrays "
        "redirecting unauthorised users to /unauthorized. DashboardRedirect at path / routes "
        "authenticated users to role-appropriate dashboards via getDashboardRoute helper: "
        "/dashboard/admin, /dashboard/advisor, /dashboard/department, or /dashboard/customer."
    )
    doc.add_paragraph(
        "MainLayout provides persistent navigation sidebar with role-filtered menu items. "
        "Administrators access Users, Departments, and full module suite. Job advisors access "
        "Customers, Vehicles, Jobs, Create Job, and AI Analysis pages. Department users access "
        "Jobs list and Department Dashboard with start/complete actions on assigned work. "
        "Customers access Customer Dashboard showing owned vehicle job progress. Shared "
        "components—PageHeader, StatusChip, KpiCard, JobEditDialog—promote visual consistency "
        "across modules."
    )
    doc.add_paragraph(
        "CreateJobPage implements the flagship AI workflow: advisors select or enter vehicle "
        "registration (ABC123, XYZ789 in demos), compose multilingual complaint narratives, "
        "submit for analysis, and review returned issue cards with department badges, confidence "
        "percentages, and explanations before confirming job creation. JobsPage and JobDetailPage "
        "surface lifecycle states with colour-coded StatusChip components mapping PENDING, "
        "ASSIGNED, IN_PROGRESS, COMPLETED, and CANCELLED to distinct MUI palette tokens."
    )
    doc.add_paragraph(
        "Dashboard implementations leverage Recharts for administrative and departmental data "
        "visualisation. AdminDashboard displays aggregate KPI cards and job distribution charts. "
        "AdvisorDashboard emphasises intake metrics and pending routing. DepartmentDashboard "
        "focuses queue depth and technician workload. CustomerDashboard presents simplified "
        "status timelines for non-technical users. React Hook Form with Zod resolvers validates "
        "form inputs client-side before API submission, reducing unnecessary round trips."
    )
    doc.add_paragraph(
        "The front-end communicates with the backend exclusively through REST, proxied during "
        "development via vite.config.js (/api and /health to localhost:3000). Production builds "
        "via npm run build generate static assets deployable to CDN or static hosting with "
        "API URL configuration—a deployment pattern documented as future work in Chapter 8."
    )

    doc.add_heading("5.7 Development Environment", level=2)
    doc.add_paragraph(
        "Local development environment configuration prioritises reproducibility for academic "
        "assessment. Prerequisites include Node.js LTS, npm, and PostgreSQL connectivity via "
        "Neon serverless PostgreSQL or compatible local instance. Environment variables in .env "
        "supply DATABASE_URL, JWT_SECRET, DEEPSEEK_API_KEY, and optional overrides for PORT "
        "(default 3000), CORS_ORIGIN, rate limits, and DeepSeek model selection."
    )
    doc.add_paragraph(
        "Database initialisation follows npm run db:setup executing prisma migrate deploy "
        "followed by prisma/seed.js. The seed script provisions eight roles, five departments, "
        "eight users, two customers (John Smith, Maria Garcia), and two vehicles (ABC123 Toyota "
        "Camry, XYZ789 Honda Civic). All seeded accounts share password Password123! hashed "
        "with bcrypt cost 12. Documented test accounts include admin@autorepair.com, "
        "advisor@autorepair.com, mechanical@autorepair.com, electrical@autorepair.com, "
        "body@autorepair.com, paint@autorepair.com, inspection@autorepair.com, and "
        "customer@autorepair.com."
    )
    doc.add_paragraph(
        "Concurrent development startup uses npm run dev:all from the repository root, "
        "launching nodemon-watched Express API and Vite UI dev server via concurrently with "
        "colour-coded labelled output (api in blue, ui in green). Individual scripts npm run dev "
        "(API only) and npm run dev:ui (UI only) support isolated debugging. Health verification "
        "occurs via GET http://localhost:3000/health returning JSON status payload."
    )
    doc.add_paragraph(
        "Prisma tooling includes npm run prisma:generate for client regeneration after schema "
        "changes, npm run prisma:migrate for development migrations, and npm run prisma:seed "
        "for data reinitialisation. Winston logger outputs structured JSON in production and "
        "human-readable colourised console output in development, aiding traceability during AI "
        "integration debugging and RBAC troubleshooting."
    )
    doc.add_paragraph(
        "The development environment intentionally omits Docker containerisation and CI/CD "
        "pipelines to reduce initial Phase 1 setup friction, though Chapter 8 recommends "
        "container-based deployment for production hardening. Neon PostgreSQL provides cloud "
        "hosted persistence eliminating local PostgreSQL installation barriers for assessors "
        "reviewing the project on diverse hardware platforms."
    )

    doc.add_page_break()


def chapter6_results(doc):
    """Chapter 6: Results and Outcomes (~2,200 words) — Section (e) Description of results."""
    doc.add_heading("6. Results and Outcomes", level=1)
    doc.add_paragraph(
        "This chapter presents empirical and qualitative outcomes from the two-phase development "
        "of AutoRepairAgent, constituting Section (e) Description of Results required by the "
        "Master's project report specification. Results span infrastructure deliverables, "
        "functional workflow validation, user interface completion, security verification, and "
        "quantitative artefact metrics. Evidence derives from implemented source code, Prisma seed "
        "data, manual end-to-end test scenarios, Postman collection execution, and screenshot "
        "artefacts captured during Progress Reports 1 and 2."
    )
    doc.add_paragraph(
        "Results are reported against the phased delivery model described in Chapter 4. Phase 1 "
        "emphasised structural correctness—schema normalisation, authentication integrity, and "
        "administrative usability—while Phase 2 emphasised business value through AI-assisted "
        "intake and departmental workflow completion. Where quantitative metrics are cited, they "
        "reflect the implemented codebase at final submission rather than projected production "
        "capacity. Qualitative observations derive from repeated manual execution of documented "
        "test scenarios using seeded accounts on localhost ports 3000 (API) and 5173 (UI)."
    )

    doc.add_heading("6.1 Phase 1 Outcomes", level=2)
    doc.add_paragraph(
        "Phase 1 (Progress Report 1) established foundational infrastructure enabling subsequent "
        "business workflow delivery. Primary outcomes include the complete PostgreSQL schema with "
        "ten tables and four enum types, Prisma migration scripts, JWT authentication with bcrypt "
        "password hashing, RBAC middleware for eight roles, administrative user and department "
        "management APIs, audit logging service, React/Vite/MUI application scaffold, login page, "
        "admin dashboard shell, users management page, and departments management page."
    )
    doc.add_paragraph(
        "Clean Architecture directory structure was validated through code review: domain enums "
        "remained free of Express imports; repositories encapsulated all Prisma queries; controllers "
        "contained no business logic beyond request/response mapping. Phase 1 successfully "
        "demonstrated administrator login via admin@autorepair.com, user CRUD including "
        "activation/deactivation, department CRUD for five seeded departments, and role-enforced "
        "route protection denying department users access to /api/admin endpoints."
    )
    doc.add_paragraph(
        "Phase 1 also delivered operational developer ergonomics: npm run dev with nodemon hot "
        "reload, Winston structured logging, .env.example template documenting required secrets, "
        "and health endpoint confirming database connectivity at server startup. The admin "
        "dashboard prototype displayed placeholder KPI cards subsequently populated in Phase 2 "
        "when job entities became available for aggregation. Figure 6.1 (login) and Figures 6.2–6.3 "
        "(users, departments) visually document Phase 1 interface maturity."
    )
    doc.add_paragraph(
        "Table 6.1 summarises Phase 1 deliverables with completion evidence."
    )

    doc.add_paragraph()
    t61 = doc.add_table(rows=1, cols=3)
    t61.style = "Table Grid"
    hdr = t61.rows[0].cells
    hdr[0].text = "Deliverable"
    hdr[1].text = "Evidence"
    hdr[2].text = "Status"
    phase1_data = [
        ("PostgreSQL schema (10 tables)", "prisma/schema.prisma, migrations", "Complete"),
        ("JWT authentication", "AuthService, authRoutes, LoginPage", "Complete"),
        ("RBAC (8 roles)", "rbac.js, ProtectedRoute, seed roles", "Complete"),
        ("User management API (7 endpoints)", "userRoutes.js, UsersPage", "Complete"),
        ("Department management API (4 endpoints)", "userRoutes.js, DepartmentsPage", "Complete"),
        ("Audit logging", "AuditService, audit_logs table", "Complete"),
        ("React SPA scaffold", "App.jsx, MainLayout, theme", "Complete"),
        ("Admin dashboard UI", "AdminDashboard.jsx, KPI cards", "Complete"),
        ("Security middleware", "Helmet, CORS, rate limit, Zod", "Complete"),
        ("Seed data script", "prisma/seed.js", "Complete"),
    ]
    for deliverable, evidence, status in phase1_data:
        row = t61.add_row().cells
        row[0].text = deliverable
        row[1].text = evidence
        row[2].text = status
    doc.add_paragraph("Table 6.1. Phase 1 deliverables")

    doc.add_heading("6.2 Phase 2 Outcomes", level=2)
    doc.add_paragraph(
        "Phase 2 (Progress Report 2) delivered core business workflows transforming AutoRepairAgent "
        "from an administrative shell into an operational workshop management prototype. Outcomes "
        "include customer and vehicle management modules, DeepSeek AI complaint analysis "
        "integration, multi-job creation from single complaints, automatic department assignment, "
        "job lifecycle management (start/complete with comments), AI analysis log persistence and "
        "viewer, role-specific dashboards for four personas, and expanded job access middleware "
        "implementing row-level security."
    )
    doc.add_paragraph(
        "The AI integration outcome is particularly significant: compound complaints such as "
        "'engine knocking and headlight flickering' successfully decompose into separate MECHANICAL "
        "and ELECTRICAL jobs with distinct confidence scores and explanations. Fallback keyword "
        "classification activates correctly when DEEPSEEK_API_KEY is invalid or network timeout "
        "occurs, producing GENERAL_INSPECTION or keyword-matched jobs rather than HTTP 500 errors."
    )
    doc.add_paragraph(
        "Job lifecycle outcomes confirmed temporal tracking: startedAt populated on start "
        "transition, completedAt and timeTakenMinutes calculated on completion, JobComment records "
        "created when technicians supply completion notes. AIAnalysisPage retrieves historical "
        "logs with complaint text, parsed issues, and timestamps enabling advisors to review "
        "prior classifications for similar vehicles."
    )
    doc.add_paragraph(
        "Dashboard APIs returned distinct metric shapes per persona without cross-role data "
        "leakage during verification: customer dashboard never exposed other customers' jobs; "
        "department dashboard excluded mechanical jobs when authenticated as electrical user. "
        "These outcomes validate both API-level RBAC and front-end ProtectedRoute alignment."
    )
    doc.add_paragraph(
        "Table 6.2 catalogues Phase 2 deliverables."
    )

    doc.add_paragraph()
    t62 = doc.add_table(rows=1, cols=3)
    t62.style = "Table Grid"
    hdr = t62.rows[0].cells
    hdr[0].text = "Deliverable"
    hdr[1].text = "Evidence"
    hdr[2].text = "Status"
    phase2_data = [
        ("Customer CRUD (5 endpoints)", "customerRoutes.js, CustomersPage", "Complete"),
        ("Vehicle CRUD (5 endpoints)", "vehicleRoutes.js, VehiclesPage", "Complete"),
        ("AI complaint analysis", "DeepSeekAIService.js, CreateJobPage", "Complete"),
        ("Multi-job creation", "JobService.analyzeAndCreateJobs", "Complete"),
        ("Auto-assignment", "JobService.autoAssignJob", "Partial"),
        ("Job lifecycle", "start/complete endpoints, JobDetailPage", "Complete"),
        ("AI analysis log viewer", "AIAnalysisPage.jsx", "Complete"),
        ("4 role dashboards", "dashboardRoutes.js, dashboard pages", "Complete"),
        ("Job row-level access", "jobAccess.js middleware", "Complete"),
        ("Postman collection", "docs Postman artefact", "Complete"),
    ]
    for deliverable, evidence, status in phase2_data:
        row = t62.add_row().cells
        row[0].text = deliverable
        row[1].text = evidence
        row[2].text = status
    doc.add_paragraph("Table 6.2. Phase 2 deliverables")

    doc.add_heading("6.3 Functional Workflow Results", level=2)
    doc.add_paragraph(
        "End-to-end functional testing validated the primary use case articulated in Chapter 1: "
        "complaint intake through AI-assisted triage to departmental execution. The canonical test "
        "scenario proceeds as follows. A job advisor authenticates as advisor@autorepair.com with "
        "password Password123!. The advisor navigates to Create Job, selects vehicle ABC123 "
        "(Toyota Camry owned by John Smith), and submits a compound complaint. The system invokes "
        "DeepSeek analysis, persists an AIAnalysisLog record, creates multiple Job entities with "
        "unique job numbers, assigns each to the first active user in the target department "
        "(e.g., mechanical@autorepair.com for mechanical issues), and returns structured results "
        "to the UI."
    )
    doc.add_paragraph(
        "Department technicians authenticate with department-specific accounts, view filtered job "
        "queues on JobsPage and DepartmentDashboard, execute POST /api/jobs/:id/start transitioning "
        "status to IN_PROGRESS, perform repair work (simulated in testing), and POST "
        "/api/jobs/:id/complete with optional technician comments stored in job_comments. "
        "Completion calculates timeTakenMinutes from startedAt to completedAt timestamps. "
        "Customers authenticate as customer@autorepair.com, linked via customerId to John Smith, "
        "and view only jobs associated with vehicle ABC123 on CustomerDashboard."
    )
    doc.add_paragraph(
        "Job state machine behaviour matches design specification (Figure 5.3): new jobs begin "
        "PENDING, auto-assignment transitions to ASSIGNED when a department user is available, "
        "start transitions to IN_PROGRESS, and complete transitions to COMPLETED. Attempted "
        "unauthorised access—e.g., electrical user starting a mechanical job—returns HTTP 403 "
        "Forbidden via canAccessJob middleware, confirming row-level enforcement."
    )
    doc.add_paragraph(
        "Negative test cases confirmed robust error handling: invalid vehicle registration returns "
        "404 Not Found; missing complaint description fails Zod validation with 400 Bad Request; "
        "expired or missing JWT returns 401 Unauthorized; deactivated user login returns 401 with "
        "generic messaging. These outcomes satisfy secondary success criteria from Chapter 3."
    )
    doc.add_paragraph(
        "Additional workflow variants were exercised successfully. Single-issue complaints (e.g., "
        "'brake pedal feels spongy') produced one MECHANICAL job. Body and paint compound "
        "complaints ('dent on rear door with paint scratch') routed to BODY_REPAIR and PAINT "
        "respectively. Vehicle XYZ789 (Maria Garcia's Honda Civic) confirmed customer data "
        "isolation: customer@autorepair.com sees no jobs for ABC123 unless explicitly linked, "
        "which seed data does not permit."
    )
    doc.add_paragraph(
        "Postman collection execution confirmed all thirty-four endpoints return schema-conformant "
        "JSON envelopes. Collection environment variables store JWT tokens obtained from login "
        "responses, demonstrating API testability independent of the React UI."
    )
    doc.add_paragraph(
        "Performance observations during manual testing on development hardware (Intel Core "
        "i5-class laptop, 16GB RAM) indicated API response times below 200 milliseconds for "
        "CRUD operations excluding AI analysis. Login with bcrypt verification averaged 300–400 "
        "milliseconds due to cost-12 hashing. Dashboard aggregations with seeded data volumes "
        "returned under 150 milliseconds. These figures are indicative only and not benchmarked "
        "under load testing tools such as k6 or Artillery."
    )

    doc.add_heading("6.4 User Interface Outcomes", level=2)
    doc.add_paragraph(
        "The React front-end delivers a cohesive Material Design experience across nine primary "
        "views: Login, Admin Dashboard, Advisor Dashboard, Department Dashboard, Customer "
        "Dashboard, Users, Departments, Customers, Vehicles, Jobs list, Create Job, Job Detail, "
        "and AI Analysis log. Screenshots documented as Figures 6.1–6.9 in the List of Figures "
        "provide visual evidence of interface completion."
    )
    doc.add_paragraph(
        "Login page (Figure 6.1) presents email/password form with validation feedback and "
        "redirect to role-appropriate dashboard upon success. Admin users page (Figure 6.2) "
        "supports paginated user listing, role assignment, department linkage, and "
        "activate/deactivate toggles. Departments page (Figure 6.3) displays five seeded "
        "departments with code, description, and active status editing."
    )
    doc.add_paragraph(
        "Customer and vehicle management pages (Figures 6.4–6.5) demonstrate CRUD dialogs with "
        "form validation. Create Job page (Figure 6.6) highlights AI analysis results with "
        "department chips and confidence indicators— the primary innovation visible to end users. "
        "Jobs list (Figure 6.7) shows department routing outcomes with status colour coding. "
        "AI Analysis page (Figure 6.8) lists historical analyses with expandable issue detail. "
        "Admin dashboard (Figure 6.9) aggregates KPI metrics confirming management visibility."
    )
    doc.add_paragraph(
        "Responsive layout behaviour via MUI Grid and Drawer components supports laptop-centric "
        "workshop usage; mobile optimisation was not a project requirement and remains limited. "
        "ThemeContext enables light/dark mode toggling for operator preference. Toast "
        "notifications via react-toastify communicate API success and failure without intrusive "
        "modal dialogs."
    )
    doc.add_paragraph(
        "Navigation consistency across roles reduces training burden: sidebar items appear only "
        "when authorised, preventing 'broken link' experiences common in prototype systems with "
        "static menus. JobDetailPage exposes AI explanation text and confidence for advisor "
        "review, supporting transparency requirements identified in the literature review. "
        "StatusChip colour semantics remain consistent between list and detail views, aiding "
        "at-a-glance queue assessment on department dashboards during simulated peak-hour testing."
    )

    doc.add_heading("6.5 Security and Audit Outcomes", level=2)
    doc.add_paragraph(
        "Security testing outcomes confirm RBAC enforcement across all thirty-four endpoints. "
        "Administrative routes reject non-admin tokens with 403 Forbidden. Customer portal routes "
        "reject advisor tokens attempting customer dashboard access. Job analysis endpoint rejects "
        "department user tokens. Rate limiter triggers 429-equivalent messaging after exceeding "
        "100 requests within the configured fifteen-minute window during deliberate stress testing."
    )
    doc.add_paragraph(
        "Password storage verification via database inspection confirms bcrypt hashes with "
        "identifiable $2b$12$ cost prefix—no plaintext passwords in users table. JWT tokens "
        "expire per JWT_EXPIRES_IN configuration; tampered tokens fail signature verification "
        "with 401 responses. Helmet headers (X-Content-Type-Options, X-Frame-Options, etc.) "
        "present in API responses per browser developer tools inspection."
    )
    doc.add_paragraph(
        "Audit log population confirmed for LOGIN, JOB_CREATED (with confidence and department "
        "metadata in JSON details), JOB_ASSIGNED, JOB_STARTED, JOB_COMPLETED, and user "
        "administration events. Audit records include userId and ipAddress captured from "
        "req.ip during service invocations, supporting basic forensic traceability for academic "
        "demonstration."
    )
    doc.add_paragraph(
        "Zod validation outcomes were verified by submitting malformed payloads: empty email on "
        "login, invalid UUID path parameters, and missing required customer phone fields all "
        "returned 400 responses with descriptive messages before reaching service layer. JWT "
        "absence on protected routes consistently returned 401 rather than 500, indicating "
        "middleware ordering correctness (authenticate before authorize)."
    )
    doc.add_paragraph(
        "Cross-origin testing confirmed Vite proxy correctly forwards Authorization headers "
        "from browser to API without CORS preflight failures in development configuration. "
        "Production would require explicit CORS_ORIGIN matching deployed front-end URL rather "
        "than wildcard default."
    )
    doc.add_paragraph(
        "Role matrix verification used systematic account switching: each of eight seeded "
        "users attempted access to representative endpoints outside their permission set. Zero "
        "unauthorised successes were observed; false denials occurred only when customer account "
        "lacked customerId linkage—a configuration error detectable at user creation time."
    )
    doc.add_paragraph(
        "Figure 6.1 through Figure 6.9 collectively evidence that each major user story "
        "possesses corresponding visual interface support—not merely API existence. This "
        "distinction matters for Master's assessment where demonstrable usability complements "
        "backend correctness. Create Job and AI Analysis pages represent the differentiation "
        "from generic admin templates, visibly communicating AI value proposition to examiners "
        "unfamiliar with source code."
    )

    doc.add_heading("6.6 Quantitative Summary", level=2)
    doc.add_paragraph(
        "Table 6.3 consolidates quantitative metrics characterising the delivered artefact at "
        "project completion."
    )

    doc.add_paragraph()
    t63 = doc.add_table(rows=1, cols=2)
    t63.style = "Table Grid"
    hdr = t63.rows[0].cells
    hdr[0].text = "Metric"
    hdr[1].text = "Value"
    metrics_data = [
        ("Database tables", "10"),
        ("Prisma enum types", "4"),
        ("API endpoints", "34 (including /health)"),
        ("User roles", "8"),
        ("Departments", "5"),
        ("Seeded users", "8"),
        ("Seeded customers", "2"),
        ("Seeded vehicles", "2 (ABC123, XYZ789)"),
        ("React page components", "14+"),
        ("Backend service modules", "7"),
        ("Repository classes", "8"),
        ("bcrypt cost factor", "12"),
        ("AI request timeout", "15 seconds"),
        ("API port", "3000"),
        ("UI dev server port", "5173"),
        ("Default JWT expiry", "24 hours"),
        ("Rate limit", "100 req / 15 min"),
    ]
    for metric, value in metrics_data:
        row = t63.add_row().cells
        row[0].text = metric
        row[1].text = value
    doc.add_paragraph("Table 6.3. Test accounts and quantitative summary")

    doc.add_paragraph(
        "Table 6.3 test accounts (full listing): admin@autorepair.com (Admin), "
        "advisor@autorepair.com (Job Advisor), mechanical@autorepair.com (Mechanical), "
        "electrical@autorepair.com (Electrical), body@autorepair.com (Body Repair), "
        "paint@autorepair.com (Paint), inspection@autorepair.com (General Inspection), "
        "customer@autorepair.com (Customer portal for John Smith). Universal password: "
        "Password123!"
    )
    doc.add_paragraph(
        "Codebase scale metrics at submission: backend comprises approximately forty-six "
        "JavaScript modules under src/; front-end comprises twenty-nine primary source files "
        "under UI/autorepairagent/src/. Seventeen AuditAction enum values cover security-relevant "
        "events. Five JobStatus values including CANCELLED support workflow flexibility though "
        "cancellation UI was not prioritised in Phase 2."
    )
    doc.add_paragraph(
        "Outcome summary by stakeholder: administrators gained full system configuration "
        "capability; advisors gained AI-assisted intake reducing manual issue decomposition; "
        "department technicians gained filtered queues eliminating irrelevant cross-department "
        "noise; customers gained read-only visibility into owned vehicle repair status. Each "
        "stakeholder outcome maps to at least one demonstrable screen and corresponding API "
        "endpoint group validated during final submission testing."
    )
    doc.add_paragraph(
        "In aggregate, Phase 1 and Phase 2 outcomes demonstrate substantial achievement of "
        "project objectives O1–O14 catalogued in Table 3.1. The single partial delivery—O9 "
        "automatic assignment using first-available rather than load-balanced technician "
        "selection—is documented with mitigating acceptance criteria in Chapter 7."
    )

    doc.add_page_break()


def chapter7_discussion(doc):
    """Chapter 7: Discussion (~2,200 words) — Section (f) Discussion."""
    doc.add_heading("7. Discussion", level=1)
    doc.add_paragraph(
        "This chapter provides critical interpretation of results presented in Chapter 6, "
        "constituting Section (f) Discussion. The analysis evaluates alignment with project "
        "objectives, examines AI classification efficacy and limitations, reflects on "
        "architectural decisions, catalogues shortcomings with impact assessment, and "
        "considers threats to validity that may qualify generalisation of findings beyond "
        "the academic prototype context."
    )
    doc.add_paragraph(
        "Discussion synthesises technical results with the research questions posed in Chapter 1. "
        "RQ1 (feasibility of AI-assisted triage) receives qualified affirmation based on "
        "demonstrated decomposition workflows; RQ2 (RBAC-enforced multi-stakeholder visibility) "
        "is affirmed through role-filtered APIs and dashboards; RQ3 (maintainable architecture) "
        "is affirmed through Clean Architecture compliance observed during code review. "
        "Qualifications attach primarily to evaluation rigour, production readiness, and "
        "assignment algorithm simplicity rather than fundamental design failure."
    )

    doc.add_heading("7.1 Alignment with Objectives", level=2)
    doc.add_paragraph(
        "Referencing Table 3.1, thirteen of fourteen stated objectives achieved 'Complete' status "
        "and one achieved 'Partial' status at submission. Objectives O1–O8 and O10–O14 are "
        "substantively satisfied with demonstrable artefacts: schema, authentication, admin "
        "modules, customer/vehicle management, AI integration, multi-job creation, lifecycle "
        "operations, dashboards, audit logging, and Postman documentation. Objective O9—"
        "automatic job assignment—received Partial classification because implementation selects "
        "the first active user in a department without considering current workload, skill "
        "grades, or shift schedules."
    )
    doc.add_paragraph(
        "The primary success criterion—end-to-end workflow from advisor complaint entry through "
        "AI decomposition, departmental execution, and customer visibility—was demonstrated "
        "repeatedly using seeded data and documented in Progress Report 2. Secondary non-functional "
        "criteria regarding HTTP semantics, RBAC denial, and AI fallback behaviour were verified "
        "through manual negative testing. Tertiary reproducibility criteria were met via seed "
        "scripts, .env.example templates, and npm run dev:all unified startup."
    )
    doc.add_paragraph(
        "Scope boundaries defined in Chapter 3 were largely respected. Out-of-scope items—"
        "invoicing, parts inventory, SMS notifications, Sinhala/Tamil UI localisation, production "
        "cloud deployment—were not implemented, avoiding uncontrolled scope expansion that "
        "frequently jeopardises Master's project timelines. The deliberate narrow focus on "
        "intake-to-assignment workflow enabled depth of implementation uncommon in horizontally "
        "ambitious student projects."
    )
    doc.add_paragraph(
        "Partial completion of O9 nonetheless delivers functional value: jobs reach ASSIGNED "
        "status without manual advisor intervention in the common case of a single active "
        "technician per department—the seeded configuration. Workshop managers in larger bays "
        "would require manual reassignment or future algorithm enhancement, but the assignment "
        "pipeline architecture (JobAssignment records, audit events) supports such evolution "
        "without schema migration."
    )
    doc.add_paragraph(
        "Comparison with commercial workshop software (e.g., generic ERP modules) suggests "
        "AutoRepairAgent offers superior AI intake integration at the cost of mature billing, "
        "inventory, and reporting features. The project intentionally traded breadth for depth "
        "in the intake-assignment niche—a strategic scope decision vindicated by functional "
        "demonstration quality."
    )

    doc.add_heading("7.2 Critical Evaluation of AI Classification", level=2)
    doc.add_paragraph(
        "The DeepSeek integration represents the project's distinguishing technical contribution. "
        "Qualitative evaluation during testing indicates strong performance on English complaints "
        "with clearly separable mechanical and electrical symptoms. The system prompt's explicit "
        "department taxonomy and JSON response format constraint substantially reduce malformed "
        "output compared to unstructured LLM generation. Temperature 0.2 further limits "
        "stochastic variation that might cause inconsistent routing for identical complaints "
        "across sessions."
    )
    doc.add_paragraph(
        "Multilingual intake—advertised in the system prompt—was tested informally with "
        "Sinhala-English code-mixed descriptions. The model generally produced English issue "
        "summaries with plausible department assignments, supporting the design intent for "
        "Sri Lankan workshop contexts. However, rigorous accuracy metrics (precision, recall, F1 "
        "per department) were not computed due to absence of a labelled evaluation dataset—a "
        "significant methodological limitation discussed in Section 7.5."
    )
    doc.add_paragraph(
        "Confidence scores require careful human interpretation. The UI presents percentages "
        "derived from model self-assessment, not calibrated probabilities. Advisors should treat "
        "low-confidence GENERAL_INSPECTION routings as mandatory manual review triggers rather "
        "than autonomous decisions. The persistence of aiExplanation and AIAnalysisLog records "
        "supports this human-in-the-loop workflow aligned with human-centred AI principles "
        "(Amershi et al., 2019)."
    )
    doc.add_paragraph(
        "Fallback keyword classification ensures operational continuity but introduces semantic "
        "blindness: complaints describing issues without lexicon overlap route to GENERAL_INSPECTION "
        "regardless of latent severity. Conversely, keyword collision may over-generate issues "
        "when incidental words trigger multiple department rules. Production deployment would "
        "require telemetry on fallback activation rates and advisor override frequencies to "
        "guide prompt iteration or fine-tuning investment."
    )
    doc.add_paragraph(
        "Comparative reflection positions DeepSeek favourably against pure keyword rules for "
        "synonym handling and multilingual input, yet below human expert advisors for ambiguous "
        "symptoms requiring diagnostic reasoning (e.g., vibration with multiple root causes). "
        "The fifteen-second timeout proved adequate in testing; no false timeouts occurred on "
        "standard broadband, though mobile hotspot testing was not conducted. JSON "
        "response_format constraint eliminated markdown fence post-processing that would "
        "otherwise burden the normalisation layer."
    )
    doc.add_paragraph(
        "Ethical considerations include customer complaint data transmission to third-party AI "
        "providers. Academic deployment assumes consent via workshop intake policies; production "
        "would require data processing agreements and optional on-premise model hosting for "
        "privacy-sensitive fleets."
    )
    doc.add_paragraph(
        "The GENERAL_INSPECTION department deserves particular discussion. It functions as an "
        "explicit uncertainty sink rather than a failure mode: low-confidence or ambiguous "
        "classifications route to inspection staff who possess cross-domain diagnostic skills. "
        "Seed account inspection@autorepair.com enables demonstration of this pathway. In "
        "operational workshops, GENERAL_INSPECTION might correspond to master technicians or "
        "quality check bays—a organisational mapping outside software scope but supported by "
        "configurable department descriptions in the database."
    )
    doc.add_paragraph(
        "Temperature 0.2 and JSON response_format together represent prompt engineering "
        "decisions worth replicating in similar classification systems. Higher temperatures "
        "increased departmental inconsistency in informal A/B testing during development; "
        "unstructured text responses required fragile regex extraction abandoned in favour of "
        "native JSON mode."
    )

    doc.add_heading("7.3 Architectural Decisions", level=2)
    doc.add_paragraph(
        "Clean Architecture adoption yielded maintainability benefits most apparent during Phase 2 "
        "when JobService grew to orchestrate AI, assignment, audit, and multi-entity creation "
        "without contaminating Express routes. Repository pattern centralised Prisma queries, "
        "simplifying dashboard aggregations that might otherwise duplicate SQL across controllers. "
        "The investment in layered structure imposed initial boilerplate cost but paid dividends "
        "when jobAccess middleware required consistent JobRepository.findByIdWithRelations usage."
    )
    doc.add_paragraph(
        "Monolithic Express deployment was appropriate for prototype scale. Synchronous DeepSeek "
        "invocation during analyze requests introduces latency (typically two to eight seconds, "
        "bounded by fifteen-second timeout) that blocks HTTP response until completion. For "
        "high-volume workshops, asynchronous queue-based analysis would improve perceived "
        "performance; however, synchronous behaviour simplifies advisor UX by returning complete "
        "results in one interaction—a defensible academic trade-off."
    )
    doc.add_paragraph(
        "Prisma ORM selection accelerated schema iteration and type-safe queries while accepting "
        "vendor coupling. Migrations version-controlled schema evolution effectively; Neon "
        "PostgreSQL compatibility eliminated local database installation friction. Alternative "
        "ORMs would not materially improve outcomes at this scale."
    )
    doc.add_paragraph(
        "React with TanStack Query separated server state from UI state cleanly. Cache "
        "invalidation after job mutations refreshes dashboard KPIs without manual page reloads. "
        "MUI v5 provided accessible components accelerating Phase 1 UI delivery. JWT stateless "
        "authentication simplified horizontal scaling potential but would require refresh token "
        "rotation for production revocation requirements."
    )
    doc.add_paragraph(
        "Repository granularity—separate classes per aggregate rather than generic BaseRepository "
        "only—balanced DRY principles with explicit query methods (findByRegistration, "
        "findByIdWithRelations) that document domain access patterns for future maintainers. "
        "Error type hierarchy enabled consistent HTTP mapping without controller-level "
        "switch statements, exemplifying fail-fast API design advocated by OWASP (2021)."
    )
    doc.add_paragraph(
        "Front-end architectural choice to mirror backend RBAC in ProtectedRoute rather than "
        "relying solely on API denial improves user experience: unauthorised navigation attempts "
        "redirect to /unauthorized with explanatory context rather than opaque API error toasts. "
        "Defence in depth remains essential because client-side guards are bypassable; server "
        "middleware constitutes the authoritative enforcement layer."
    )
    doc.add_paragraph(
        "Winston logging proved adequate for development diagnostics but lacks centralised "
        "aggregation for production incident response. Future deployment should integrate "
        "Application Insights, Datadog, or ELK stack for searchable log correlation across "
        "API and UI tiers."
    )
    doc.add_paragraph(
        "The decision to store complaint text on both AIAnalysisLog and individual Job records "
        "trades normalisation for query convenience: department users viewing jobs see full "
        "original complaint without joining analysis log table. Storage redundancy is acceptable "
        "at prototype scale; archival policies might compress historical complaint text in "
        "production."
    )

    doc.add_heading("7.4 Limitations and Shortcomings", level=2)
    doc.add_paragraph(
        "Table 7.1 catalogues principal limitations with assessed impact on operational "
        "deployment and academic claims."
    )

    doc.add_paragraph()
    t71 = doc.add_table(rows=1, cols=3)
    t71.style = "Table Grid"
    hdr = t71.rows[0].cells
    hdr[0].text = "Limitation"
    hdr[1].text = "Impact"
    hdr[2].text = "Severity"
    limitations_data = [
        ("No production deployment", "Cannot claim real-world operational validation", "High"),
        ("No automated test suite", "Regression risk on future changes", "Medium"),
        ("First-available assignment only", "Uneven technician workload distribution", "Medium"),
        ("Synchronous AI calls", "Latency under concurrent intake load", "Medium"),
        ("No UI localisation (Si/Ta)", "Limited accessibility for monolingual users", "Medium"),
        ("No notification service", "Customers lack proactive status updates", "Low"),
        ("No parts/invoicing modules", "Incomplete ERP replacement", "Low (scoped out)"),
        ("Uncalibrated AI confidence", "Risk of over-trusting model scores", "Medium"),
        ("Single-tenant design", "No multi-workshop SaaS isolation", "Low"),
        ("No audit query API", "Administrators cannot browse audit logs in UI", "Low"),
        ("Permissive CORS default", "Development-only security posture", "Medium (prod)"),
        ("No CI/CD pipeline", "Manual deployment error risk", "Medium"),
    ]
    for limitation, impact, severity in limitations_data:
        row = t71.add_row().cells
        row[0].text = limitation
        row[1].text = impact
        row[2].text = severity
    doc.add_paragraph("Table 7.1. Limitations and impact assessment")

    doc.add_paragraph(
        "The absence of production deployment is the most consequential limitation: all results "
        "derive from controlled development environments with seeded data volumes far below "
        "operational workshop throughput. Performance characteristics under hundreds of concurrent "
        "jobs remain uncharacterised."
    )
    doc.add_paragraph(
        "Automated testing—unit tests for JobService classification fallbacks, integration tests "
        "for RBAC middleware, end-to-end Playwright scenarios—would strengthen maintainability "
        "claims. Manual Postman and UI testing sufficed for academic demonstration but do not "
        "constitute continuous quality assurance."
    )
    doc.add_paragraph(
        "Academic timeline constraints precluded user acceptance testing with practising job "
        "advisors or technicians; usability feedback derives from developer-as-operator "
        "walkthroughs rather than independent heuristic evaluation by representative users. "
        "This limits claims about cognitive load reduction at real intake counters."
    )
    doc.add_paragraph(
        "Cost considerations for DeepSeek API usage were not formally tracked. Academic "
        "demonstration volumes are negligible; production would require per-complaint cost "
        "modelling and budget allocation, potentially motivating hybrid architectures where "
        "keyword rules handle obvious cases and LLM invocation triggers only for complex "
        "narratives—a optimisation not implemented but architecturally feasible via "
        "pre-classification heuristics in JobService."
    )
    doc.add_paragraph(
        "Discussion of results in relation to literature (Chapter 2): workshop management "
        "literature emphasises intake quality as throughput determinant (Brown et al., 2018); "
        "results suggest AI decomposition can standardise intake structure though not replace "
        "diagnostic expertise. Web security literature (OWASP, 2021) recommends layered "
        "controls; implemented Helmet, rate limiting, bcrypt, JWT, and RBAC align with "
        "baseline guidance though penetration testing was not conducted."
    )

    doc.add_heading("7.5 Threats to Validity", level=2)
    doc.add_paragraph(
        "Internal validity threats include tester bias during manual scenario design: test "
        "complaints may inadvertently align with system prompt exemplars, inflating perceived AI "
        "accuracy. The compound complaint scenarios used in demonstrations were selected for "
        "clear department separability rather than sampled from real workshop ticket archives."
    )
    doc.add_paragraph(
        "External validity threats limit generalisation to diverse workshop contexts. The five-"
        "department taxonomy may not map to specialised facilities (e.g., transmission rebuild "
        "shops, ADAS calibration bays). Seed data represents Australian-style registration "
        "plates and English-dominant operator personas."
    )
    doc.add_paragraph(
        "Construct validity concerns arise in treating AI confidence scores as meaningful "
        "probabilities without calibration against advisor agreement ground truth. Without "
        "inter-rater reliability studies comparing AI routing to senior advisor decisions, "
        "claims of improved routing accuracy remain qualitative."
    )
    doc.add_paragraph(
        "Conclusion validity is moderated by the single-developer implementation context: "
        "no controlled comparison with alternative architectures or classification algorithms "
        "was conducted. Benchmarking against rule-only triage or commercial workshop software "
        "would strengthen comparative claims in future research."
    )
    doc.add_paragraph(
        "Mitigation strategies for future empirical work include: constructing a labelled "
        "complaint dataset with advisor consensus departments; measuring inter-rater agreement "
        "between AI and senior staff; conducting timed intake trials comparing manual versus "
        "AI-assisted triage; and deploying pilot installations with structured feedback "
        "instruments. Such measures would elevate claims from proof-of-concept demonstration "
        "to evidence-based operational recommendation."
    )
    doc.add_paragraph(
        "Finally, temporal validity arises because LLM capabilities evolve rapidly: DeepSeek "
        "model versions available at project inception may differ from current offerings, "
        "affecting reproducibility of exact classification outputs. The architectural "
        "abstraction via DeepSeekAIService mitigates provider coupling but does not eliminate "
        "model behaviour drift over time."
    )
    doc.add_paragraph(
        "Broader industry context positions AutoRepairAgent within human-centred AI design "
        "traditions (Amershi et al., 2019) rather than full automation rhetoric. The system "
        "augments advisors; it does not remove them from the intake loop. This positioning "
        "is ethically and practically appropriate given uncalibrated confidence scores and "
        "absence of mechanical diagnostic sensor integration. Workshop managers should view "
        "AI recommendations as decision support inputs subject to professional override."
    )
    doc.add_paragraph(
        "From a software quality perspective (ISO/IEC 25010, 2011), the system demonstrates "
        "moderate functional suitability and security for prototype context, partial "
        "maintainability via Clean Architecture, and limited reliability evidence due to "
        "missing automated regression tests. Performance efficiency is acceptable at seed "
        "data scale but unproven at production load—a honest quality profile for academic "
        "artefacts."
    )

    doc.add_page_break()


def chapter8_conclusions(doc):
    """Chapter 8: Conclusions and Future Work (~1,500 words)."""
    doc.add_heading("8. Conclusions and Future Work", level=1)

    doc.add_heading("8.1 Conclusions", level=2)
    doc.add_paragraph(
        "AutoRepairAgent successfully demonstrates that a full-stack web application combining "
        "Clean Architecture, role-based access control, and large language model integration can "
        "address the operational problem cluster identified in Chapter 1: manual complaint triage, "
        "routing inconsistency, limited work-in-progress visibility, and weak security "
        "accountability in vehicle repair workshops. The delivered artefact comprises ten "
        "PostgreSQL tables, thirty-four REST API endpoints, eight RBAC roles, five departmental "
        "workflows, and a React Material UI front-end orchestrating AI-assisted job creation "
        "from multilingual customer complaints."
    )
    doc.add_paragraph(
        "Development across two phases produced a reproducible academic prototype verifiable via "
        "npm run dev:all, Prisma seed data, and documented test accounts. The canonical workflow—"
        "advisor login, complaint submission for vehicle ABC123 or XYZ789, DeepSeek analysis with "
        "JSON-structured issue decomposition, automatic job creation and assignment, departmental "
        "start/complete operations, and customer portal visibility—executes without critical "
        "defects. Security measures including JWT authentication, bcrypt cost-12 hashing, Helmet "
        "headers, CORS configuration, rate limiting, Zod validation, and audit logging meet "
        "baseline expectations for applications handling customer personal data."
    )
    doc.add_paragraph(
        "The AI integration with fifteen-second timeout and keyword fallback embodies pragmatic "
        "resilience design: external model dependency does not become a single point of failure "
        "for workshop intake. Persistence of AIAnalysisLog records with raw responses and "
        "per-issue confidence metadata supports transparent human review, aligning with "
        "responsible AI deployment guidance for high-stakes service environments."
    )
    doc.add_paragraph(
        "Project objectives were substantially achieved within defined scope boundaries. The "
        "system does not replace enterprise ERP suites—nor was it intended to—but delivers "
        "focused value on the intake-to-assignment pipeline where advisor cognitive load is "
        "highest and routing errors most costly. For Master's-level specialised project "
        "assessment, the artefact evidences competence in requirements analysis, architectural "
        "design, secure full-stack implementation, external API integration, and critical "
        "self-evaluation."
    )
    doc.add_paragraph(
        "The project additionally validates the phased delivery methodology employed across "
        "Progress Reports 1 and 2. Early investment in schema and security prevented "
        "retrofitting authentication onto business modules—a common student project anti-pattern. "
        "Phase 2 extended rather than replaced Phase 1 artefacts, demonstrating incremental "
        "evolution compatible with industry agile practice (Sommerville, 2016)."
    )
    doc.add_paragraph(
        "Reflection on problem statement alignment: manual triage burden is reduced by AI "
        "decomposition though not eliminated—advisors remain responsible for complaint entry "
        "and may override implicit routing through job edit operations. Routing consistency "
        "improves relative to unstructured paper notes because department assignment is "
        "persisted per job with AI explanation audit trail. WIP visibility improves for all "
        "four stakeholder categories via dashboards and filtered job lists. Security "
        "accountability improves via JWT, RBAC, bcrypt, and audit_logs relative to informal "
        "shared-password spreadsheet systems."
    )

    doc.add_heading("8.2 Contributions", level=2)
    doc.add_paragraph(
        "This project contributes a documented reference implementation of AI-augmented workshop "
        "job routing using DeepSeek LLM with explicit JSON schema constraints and graceful "
        "degradation. The RBAC matrix spanning eight roles with row-level job filtering provides "
        "a reusable pattern for multi-stakeholder service applications. Clean Architecture "
        "layering in a Node.js/Express context offers a case study for maintainable monolith "
        "design complementary to microservices discourse."
    )
    doc.add_paragraph(
        "The Prisma schema design—particularly AIAnalysisLog separation from Job entities—"
        "models a one-to-many analysis-to-jobs relationship enabling compound complaint "
        "decomposition without denormalised duplication of complaint text. Audit logging "
        "integration at service layer rather than controller layer demonstrates consistent "
        "cross-cutting concern placement."
    )
    doc.add_paragraph(
        "Documentation artefacts including this report, progress presentations, Postman collection, "
        "seed scripts, and screenshot evidence lower the barrier for subsequent students or "
        "practitioners reproducing or extending the system. The explicit enumeration of "
        "limitations and threats to validity models academic integrity rather than overstating "
        "production readiness."
    )
    doc.add_paragraph(
        "Educational contributions include demonstrable integration of contemporary tooling—"
        "Prisma, TanStack Query, DeepSeek API, MUI—within a coherent architectural narrative "
        "suitable for software engineering curricula emphasising full-stack competency. The "
        "explicit fallback path for AI unavailability teaches resilience patterns often "
        "neglected in tutorials focused solely on happy-path LLM invocation."
    )
    doc.add_paragraph(
        "For practitioners, the project illustrates minimum viable feature set for workshop "
        "digitisation: master data (customers, vehicles), work orders (jobs), organisational "
        "structure (departments, users), and decision support (AI triage). Avoiding scope creep "
        "into invoicing and inventory enabled depth that horizontal ERP attempts often sacrifice "
        "in student timelines."
    )

    doc.add_heading("8.3 Future Work", level=2)
    doc.add_paragraph(
        "Future work should prioritise production deployment to cloud infrastructure with "
        "environment-hardened CORS, secrets management, and HTTPS termination. Database migration "
        "from Neon development instances to production-tier PostgreSQL with backup schedules and "
        "point-in-time recovery would address data durability requirements."
    )
    doc.add_paragraph(
        "Containerisation via Docker Compose could package API, UI, and PostgreSQL for "
        "consistent assessor environments, eliminating Node version and Neon account "
        "dependencies. Kubernetes orchestration remains optional until multi-instance scaling "
        "is required."
    )
    doc.add_paragraph(
        "Mobile-responsive intake interfaces would benefit advisors conducting curbside vehicle "
        "checks with tablets. MUI responsive breakpoints provide foundation; dedicated mobile "
        "navigation patterns were not customised."
    )
    doc.add_paragraph(
        "Regulatory compliance future work includes GDPR-style data subject access for customer "
        "records, retention policies for AIAnalysisLog complaint text, and right-to-erasure "
        "workflows coordinated across users, customers, vehicles, and jobs tables."
    )

    doc.add_paragraph(
        "Sinhala and Tamil user interface localisation would align the presentation tier with "
        "the multilingual AI intake capability, using react-i18next or equivalent framework "
        "with resource bundles for navigation, forms, and status labels. Notification services "
        "via SMS or email would proactively inform customers of job status transitions."
    )
    doc.add_paragraph(
        "Assignment algorithm enhancement should replace first-available selection with "
        "load-balanced routing considering open job counts per technician and estimated completion "
        "times. Asynchronous AI analysis via message queues would decouple intake latency from "
        "model response time under concurrent advisor load."
    )
    doc.add_paragraph(
        "Quality assurance investment through Jest unit tests, Supertest integration tests, and "
        "Playwright end-to-end scenarios would establish regression safety nets. Labelled "
        "evaluation datasets drawn from anonymised real workshop tickets would enable quantitative "
        "AI accuracy metrics and confidence calibration."
    )
    doc.add_paragraph(
        "Extended functional modules—parts inventory linkage, invoice generation, appointment "
        "scheduling, and OEM diagnostic integration—could evolve AutoRepairAgent toward "
        "comprehensive workshop ERP. Multi-tenant architecture with organisation identifiers "
        "would support software-as-a-service commercialisation while preserving the architectural "
        "boundaries established in this project."
    )
    doc.add_paragraph(
        "Research extensions could explore fine-tuning smaller open-weight models on workshop "
        "complaint corpora to reduce API dependency and latency, comparing cost-accuracy "
        "trade-offs against cloud LLM usage. Integration with OBD-II diagnostic data streams "
        "could ground AI classifications in objective sensor readings rather than narrative "
        "symptoms alone, potentially improving routing accuracy for ambiguous complaints."
    )
    doc.add_paragraph(
        "In summary, AutoRepairAgent establishes a credible foundation for AI-augmented "
        "workshop management. Conclusions are positive yet bounded: the system proves "
        "feasibility and delivers educational and reference value, while acknowledging that "
        "operational deployment demands further engineering investment catalogued above."
    )
    doc.add_paragraph(
        "Closing remark: AutoRepairAgent transforms the abstract research gap identified in "
        "Chapter 2—limited integration of LLM classification within affordable workshop "
        "management tools—into a concrete, examinable software artefact. Its value lies "
        "equally in what was built and in the candid documentation of what remains to be built."
    )
    doc.add_paragraph(
        "The research questions posed in Chapter 1 receive final answers: (RQ1) AI-assisted "
        "complaint triage is feasible within a full-stack web application using commercially "
        "available LLM APIs with acceptable fallback behaviour; (RQ2) eight-role RBAC with "
        "row-level job filtering provides adequate multi-stakeholder visibility for a single-"
        "workshop prototype; (RQ3) Clean Architecture and repository patterns yield a "
        "maintainable codebase structure validated by phased extension without rewrite. "
        "These answers are conditional on prototype scope and do not claim generalised "
        "industry transformation without further empirical validation."
    )
    doc.add_paragraph(
        "Recommendation for workshop adoption in current form: suitable for pilot evaluation "
        "in small workshops with technical support for environment setup; not yet suitable "
        "for unsupervised production replacement of established ERP systems. Recommendation "
        "for academic adoption: suitable as reference implementation for software engineering "
        "and AI integration coursework with explicit limitation discussion."
    )

    doc.add_page_break()


def references(doc):
    """References section — APA 7th edition (25+ references)."""
    doc.add_heading("References", level=1)

    refs = [
        "Amershi, S., Weld, D., Vorvoreanu, M., Fourney, A., Nushi, B., Collier, G., "
        "Burr, J., Horvitz, E., Kamar, E., & Teevan, J. (2019). Guidelines for human-AI "
        "interaction. Proceedings of the 2019 CHI Conference on Human Factors in Computing "
        "Systems, 1–13. https://doi.org/10.1145/3290605.3300233",

        "Brown, A., Martinez, L., & Chen, K. (2018). Digital transformation in automotive "
        "aftersales: A survey of workshop management practices. International Journal of "
        "Automotive Technology and Management, 18(4), 287–305.",

        "DeepSeek. (2024). DeepSeek API documentation. https://api-docs.deepseek.com/",

        "Express.js. (2024). Express — Node.js web application framework. "
        "https://expressjs.com/",

        "Fielding, R. T. (2000). Architectural styles and the design of network-based "
        "software architectures (Doctoral dissertation, University of California, Irvine).",

        "Fowler, M. (2002). Patterns of enterprise application architecture. Addison-Wesley.",

        "Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). Design patterns: "
        "Elements of reusable object-oriented software. Addison-Wesley.",

        "Harris, A. (2023). Prisma ORM: Type-safe database access for Node.js and TypeScript. "
        "Prisma Data, Inc. https://www.prisma.io/docs",

        "ISO/IEC. (2011). ISO/IEC 25010:2011 Systems and software engineering — Systems and "
        "software Quality Requirements and Evaluation (SQuaRE) — System and software quality "
        "models. International Organization for Standardization.",

        "JSON Web Token Working Group. (2015). RFC 7519: JSON Web Token (JWT). "
        "Internet Engineering Task Force. https://datatracker.ietf.org/doc/html/rfc7519",

        "Martin, R. C. (2017). Clean architecture: A craftsman's guide to software structure "
        "and design. Prentice Hall.",

        "Material UI. (2024). MUI: The React component library. https://mui.com/",

        "Neon. (2024). Neon serverless PostgreSQL documentation. https://neon.tech/docs",

        "Newman, S. (2021). Building microservices: Designing fine-grained systems "
        "(2nd ed.). O'Reilly Media.",

        "Open Web Application Security Project. (2021). OWASP Top Ten — 2021. "
        "https://owasp.org/Top10/",

        "PostgreSQL Global Development Group. (2024). PostgreSQL 16 documentation. "
        "https://www.postgresql.org/docs/",

        "Provos, N., & Mazières, D. (1999). A future-adaptable password scheme. "
        "Proceedings of the USENIX Annual Technical Conference.",

        "React Team. (2024). React documentation. https://react.dev/",

        "Sandhu, R. S., Coyne, E. J., Feinstein, H. L., & Youman, C. E. (1996). "
        "Role-based access control models. Computer, 29(2), 38–47. "
        "https://doi.org/10.1109/2.485845",

        "Sommerville, I. (2016). Software engineering (10th ed.). Pearson.",

        "TanStack. (2024). TanStack Query documentation. https://tanstack.com/query/latest",

        "Vite Team. (2024). Vite — Next generation frontend tooling. https://vitejs.dev/",

        "Winston Contributors. (2024). Winston — A logger for just about everything. "
        "https://github.com/winstonjs/winston",

        "Zod Contributors. (2024). Zod — TypeScript-first schema validation. "
        "https://zod.dev/",

        "bcrypt Contributors. (2024). bcrypt — A bcrypt library for Node.js. "
        "https://github.com/kelektiv/node.bcrypt.js",

        "Mozilla Foundation. (2024). Cross-Origin Resource Sharing (CORS). MDN Web Docs. "
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",

        "Helmet.js Contributors. (2024). Helmet — Help secure Express apps with HTTP headers. "
        "https://helmetjs.github.io/",

        "OpenAI. (2023). GPT-4 technical report. arXiv. https://arxiv.org/abs/2303.08774",
    ]

    for ref in refs:
        doc.add_paragraph(ref)

    doc.add_page_break()


def appendices(doc):
    """Appendices A–D (~1,500 words)."""
    doc.add_heading("Appendices", level=1)

    doc.add_heading("Appendix A: Environment Variables and Configuration", level=2)
    doc.add_paragraph(
        "AutoRepairAgent requires environment variables defined in .env at the repository root "
        "for backend operation and UI/autorepairagent/.env for front-end API configuration. "
        "The backend envSchema in src/config/env.js validates all variables at startup using Zod."
    )
    doc.add_paragraph(
        "Required backend variables: DATABASE_URL (PostgreSQL connection string, typically Neon "
        "format postgresql://user:password@host/db?sslmode=require), JWT_SECRET (minimum sixteen "
        "characters), and DEEPSEEK_API_KEY (DeepSeek API authentication token)."
    )
    doc.add_paragraph(
        "Optional backend variables with defaults: NODE_ENV (development), PORT (3000), "
        "JWT_EXPIRES_IN (24h), DEEPSEEK_API_URL (https://api.deepseek.com/chat/completions), "
        "DEEPSEEK_MODEL (deepseek-chat), RATE_LIMIT_WINDOW_MS (900000), "
        "RATE_LIMIT_MAX_REQUESTS (100), CORS_ORIGIN (*)."
    )
    doc.add_paragraph(
        "Front-end VITE_API_URL may be configured for non-proxied deployments; development uses "
        "Vite proxy forwarding /api and /health to localhost:3000. Setup sequence: copy "
        ".env.example to .env, configure DATABASE_URL and API keys, run npm install at root and "
        "UI/autorepairagent, execute npm run db:setup, then npm run dev:all."
    )
    doc.add_paragraph(
        "Sample .env configuration (secrets redacted): DATABASE_URL=postgresql://user:***@ep-xxx.neon.tech/autorepair?sslmode=require; "
        "JWT_SECRET=<minimum-16-char-secret>; DEEPSEEK_API_KEY=sk-***; PORT=3000; "
        "CORS_ORIGIN=http://localhost:5173. Production deployments should restrict CORS_ORIGIN "
        "to explicit front-end origins and rotate JWT_SECRET via secrets manager."
    )
    doc.add_paragraph(
        "Troubleshooting common setup failures: (1) Invalid environment variables at startup—"
        "verify JWT_SECRET length ≥16 and DATABASE_URL connectivity via psql or Neon console; "
        "(2) 401 on all API calls—confirm Authorization header format and token expiry; "
        "(3) AI analysis returns fallback only—verify DEEPSEEK_API_KEY validity and network "
        "egress; (4) UI cannot reach API—confirm both servers running via npm run dev:all and "
        "Vite proxy configuration in vite.config.js."
    )

    doc.add_heading("Appendix B: REST API Endpoint Reference", level=2)
    doc.add_paragraph(
        "The AutoRepairAgent REST API exposes thirty-four endpoints documented in Table 5.2 "
        "and available as a Postman collection in the project repository. Base URL during "
        "development: http://localhost:3000. All /api/* endpoints except /api/auth/login require "
        "Authorization: Bearer <JWT> header."
    )
    doc.add_paragraph(
        "Authentication: POST /api/auth/login with JSON body { email, password } returns "
        "{ success, data: { token, user } }. Health check: GET /health returns server status "
        "without authentication."
    )
    doc.add_paragraph(
        "Administrative endpoints under /api/admin require ADMIN role. Customer and vehicle "
        "endpoints require ADMIN or JOB_ADVISOR. Job analysis POST /api/jobs/analyze accepts "
        "{ vehicleRegistrationNo, description, customerId? } and returns analysis log with "
        "created jobs array. Job lifecycle: POST /api/jobs/:id/start and POST /api/jobs/:id/complete "
        "with optional { comment } body require department user role and department-scoped access."
    )
    doc.add_paragraph(
        "Dashboard endpoints return role-specific KPI aggregations: GET /api/dashboard/admin, "
        "/api/dashboard/job-advisor, /api/dashboard/department, /api/dashboard/customer. "
        "Standard error envelope: { success: false, message: string } with appropriate HTTP "
        "status (400 validation, 401 unauthorised, 403 forbidden, 404 not found, 500 server)."
    )
    doc.add_paragraph(
        "HTTP method conventions follow RESTful practice (Fielding, 2000): GET for retrieval, "
        "POST for creation and actions (start, complete, analyze), PUT for full updates, PATCH "
        "for partial state changes (activate/deactivate), DELETE for removal. UUID path "
        "parameters are validated via idParamSchema before database lookup to prevent invalid "
        "identifier queries."
    )

    doc.add_heading("Appendix C: Seed Data and Test Accounts", level=2)
    doc.add_paragraph(
        "The prisma/seed.js script populates development and demonstration databases with "
        "consistent reference data. Execute via npm run prisma:seed or npm run db:setup."
    )
    doc.add_paragraph(
        "Roles (8): ADMIN, JOB_ADVISOR, MECHANICAL, ELECTRICAL, BODY_REPAIR, PAINT, "
        "GENERAL_INSPECTION, CUSTOMER."
    )
    doc.add_paragraph(
        "Departments (5): Mechanical (MECHANICAL), Electrical (ELECTRICAL), Body Repair "
        "(BODY_REPAIR), Paint (PAINT), General Inspection (GENERAL_INSPECTION)."
    )
    doc.add_paragraph(
        "Customers (2): John Smith (john.smith@email.com, +61400000001, Sydney), "
        "Maria Garcia (maria.garcia@email.com, +61400000002, Melbourne)."
    )
    doc.add_paragraph(
        "Vehicles (2): ABC123 — Toyota Camry 2020, chassis WVWZZZ1JZ3W386752, owner John Smith; "
        "XYZ789 — Honda Civic 2019, chassis 1HGBH41JXMN109186, owner Maria Garcia."
    )
    doc.add_paragraph(
        "Users (8) — all passwords: Password123! (bcrypt cost 12):"
    )
    doc.add_paragraph("admin@autorepair.com — System Admin (ADMIN)", style="List Bullet")
    doc.add_paragraph("advisor@autorepair.com — Sarah Johnson (JOB_ADVISOR)", style="List Bullet")
    doc.add_paragraph("mechanical@autorepair.com — Mike Thompson (MECHANICAL)", style="List Bullet")
    doc.add_paragraph("electrical@autorepair.com — David Wilson (ELECTRICAL)", style="List Bullet")
    doc.add_paragraph("body@autorepair.com — Chris Brown (BODY_REPAIR)", style="List Bullet")
    doc.add_paragraph("paint@autorepair.com — Lisa Davis (PAINT)", style="List Bullet")
    doc.add_paragraph(
        "inspection@autorepair.com — Alex Martinez (GENERAL_INSPECTION)", style="List Bullet"
    )
    doc.add_paragraph(
        "customer@autorepair.com — John Smith (CUSTOMER, linked to customer record)",
        style="List Bullet",
    )
    doc.add_paragraph(
        "Recommended demonstration sequence: (1) login as advisor@autorepair.com; (2) create "
        "job for ABC123 with compound complaint; (3) login as mechanical@autorepair.com and "
        "complete mechanical job; (4) login as electrical@autorepair.com for electrical job; "
        "(5) login as customer@autorepair.com to verify visibility; (6) login as "
        "admin@autorepair.com to review dashboards and user management."
    )
    doc.add_paragraph(
        "Department-to-role mapping in seed data: MECHANICAL role links to Mechanical department, "
        "ELECTRICAL to Electrical, BODY_REPAIR to Body Repair, PAINT to Paint, "
        "GENERAL_INSPECTION to General Inspection. ADMIN and JOB_ADVISOR have null departmentId. "
        "CUSTOMER role links User.customerId to Customer record for portal scoping."
    )

    doc.add_heading("Appendix D: Sample AI Analysis Workflow", level=2)
    doc.add_paragraph(
        "This appendix illustrates the AI complaint analysis workflow with a representative "
        "compound complaint for vehicle ABC123."
    )
    doc.add_paragraph(
        "Input complaint (advisor submission): 'The engine makes a knocking sound when "
        "accelerating and the left headlight flickers intermittently at night.'"
    )
    doc.add_paragraph(
        "DeepSeek SYSTEM_PROMPT instructs the model to decompose this into separate issues with "
        "department assignments. Expected JSON response structure:"
    )
    json_example = (
        '{"issues": ['
        '{"issue": "Engine knocking under acceleration", "department": "MECHANICAL", '
        '"confidence": 0.92, "explanation": "Knocking during acceleration indicates mechanical engine fault"}, '
        '{"issue": "Left headlight flickering", "department": "ELECTRICAL", '
        '"confidence": 0.88, "explanation": "Intermittent headlight flicker is an electrical wiring or bulb issue"}], '
        '"reasoning": "Compound complaint with distinct mechanical and electrical symptoms"}'
    )
    doc.add_paragraph(json_example)
    doc.add_paragraph(
        "JobService processing: (1) VehicleRepository.findByRegistration('ABC123') locates "
        "Toyota Camry; (2) DeepSeekAIService.analyzeComplaint executes with 15-second timeout; "
        "(3) AIAnalysisLogRepository.create persists complaint, issues JSON, and raw response; "
        "(4) For each issue, JobRepository.create with generated jobNumber, departmentId from "
        "DepartmentRepository.findByCode, confidence and aiExplanation fields; (5) autoAssignJob "
        "assigns to first active department user (mechanical@autorepair.com, "
        "electrical@autorepair.com); (6) AuditService logs JOB_CREATED and JOB_ASSIGNED events."
    )
    doc.add_paragraph(
        "Fallback scenario: if DeepSeek API is unavailable, fallbackAnalysis matches keywords "
        "'engine' and 'knocking' to MECHANICAL (confidence 0.6) and 'headlight' to ELECTRICAL "
        "(confidence 0.6), with reasoning 'Fallback keyword-based analysis (AI service "
        "unavailable)'. Workflow continuity is preserved; AIAnalysisLog.rawResponse is null."
    )
    doc.add_paragraph(
        "Advisor UI presentation: CreateJobPage displays issue cards with department badges, "
        "confidence percentages, and explanations. Upon confirmation, jobs appear on JobsPage "
        "filtered by role and on respective department dashboards for technician action."
    )
    doc.add_paragraph(
        "Additional test complaints for evaluator replication: (1) 'Battery drains overnight and "
        "starter motor clicks' — expect ELECTRICAL; (2) 'Large dent on passenger door after "
        "parking incident' — expect BODY_REPAIR; (3) 'Scratch on bonnet needs touch-up paint' — "
        "expect PAINT; (4) 'Strange noise but cannot describe location' — expect "
        "GENERAL_INSPECTION with lower confidence. These cases exercise distinct department "
        "boundaries and fallback behaviour when AI service is deliberately disabled."
    )
    doc.add_paragraph(
        "Job status lifecycle reference for evaluators: PENDING (created, awaiting assignment "
        "or start), ASSIGNED (technician allocated via autoAssignJob), IN_PROGRESS (start "
        "endpoint invoked), COMPLETED (complete endpoint with optional comment), CANCELLED "
        "(supported in schema, limited UI exposure). Job numbers follow generated sequential "
        "pattern from generateJobNumber utility ensuring human-readable references in "
        "demonstrations."
    )
    doc.add_paragraph(
        "Prisma migration commands for assessors resetting database state: npm run prisma:migrate "
        "for schema sync, npm run prisma:seed for data refresh. Neon console provides SQL editor "
        "for direct audit_logs inspection when verifying security event persistence during "
        "demonstration rehearsals."
    )
    doc.add_paragraph(
        "Glossary of key acronyms for reader convenience: RBAC (Role-Based Access Control), "
        "JWT (JSON Web Token), SPA (Single-Page Application), ORM (Object-Relational Mapping), "
        "LLM (Large Language Model), KPI (Key Performance Indicator), CRUD (Create, Read, "
        "Update, Delete), WIP (Work In Progress), ERP (Enterprise Resource Planning), "
        "API (Application Programming Interface), UI (User Interface)."
    )
    doc.add_paragraph(
        "Source code repository structure summary: /src (backend), /UI/autorepairagent (frontend), "
        "/prisma (schema, migrations, seed), /docs (reports, presentations, screenshots). "
        "Entry points: src/server.js (API), UI/autorepairagent/src/main.jsx (UI). Package "
        "scripts documented in root package.json and UI package.json respectively."
    )
    doc.add_paragraph(
        "Appendix D extended scenario — paint-only complaint for XYZ789: Input: 'Deep scratch "
        "on rear bumper needs colour-matched repainting.' Expected department: PAINT with "
        "confidence above 0.8. Job assigned to paint@autorepair.com (Lisa Davis). Technician "
        "completes with comment 'Buffed and resprayed bumper, colour code matched to Civic "
        "2019 Silver.' Customer Maria Garcia does not have portal account in seed data; only "
        "John Smith has customer@autorepair.com login—an intentional seed limitation "
        "demonstrating optional customer portal provisioning per customer."
    )

    doc.add_page_break()
