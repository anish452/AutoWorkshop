import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, CircularProgress, Alert,
  Table, TableHead, TableRow, TableCell, TableBody, Chip, LinearProgress, TablePagination
} from '@mui/material';
import { Psychology } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { jobService } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { formatDateTime } from '../../utils/helpers';

export default function AIAnalysisPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // We fetch all jobs and extract AI analysis logs from them
  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobService.getAll().then(r => r.data.data || r.data),
  });

  const jobs = Array.isArray(data) ? data : data?.jobs || [];
  // Collect unique analysis logs
  const analysisMap = new Map();
  jobs.forEach(job => {
    if (job.aiAnalysisLog) {
      const logId = job.aiAnalysisLog.id || job.id;
      if (!analysisMap.has(logId)) {
        analysisMap.set(logId, { ...job.aiAnalysisLog, vehicle: job.vehicle, jobs: [] });
      }
      analysisMap.get(logId).jobs.push(job);
    }
  });
  const logs = Array.from(analysisMap.values());

  const paged = logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <PageHeader
        title="AI Analysis Logs"
        subtitle="View all AI-powered complaint classifications"
      />

      {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">Failed to load analysis data</Alert>}

      {!isLoading && logs.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Psychology sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography color="text.secondary">No AI analysis logs yet. Create a job to see AI classifications.</Typography>
          </CardContent>
        </Card>
      )}

      {paged.map((log, idx) => (
        <Card key={idx} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Psychology color="primary" />
              <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600}>
                Analysis — {log.vehicle?.registrationNumber || 'Unknown Vehicle'}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                {formatDateTime(log.createdAt)}
              </Typography>
            </Box>

            {log.reasoning && (
              <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, mb: 2 }}>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>AI Reasoning</Typography>
                <Typography variant="body2">{log.reasoning}</Typography>
              </Box>
            )}

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Issue</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Confidence</TableCell>
                  <TableCell>Explanation</TableCell>
                  <TableCell>Job Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(log.issues || []).map((issue, i) => {
                  const linkedJob = log.jobs?.find(j => j.issueDescription === issue.issue);
                  return (
                    <TableRow key={i}>
                      <TableCell><Typography variant="body2" fontWeight={600}>{issue.issue}</Typography></TableCell>
                      <TableCell><Chip label={issue.department} size="small" color="primary" variant="outlined" /></TableCell>
                      <TableCell sx={{ minWidth: 140 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={(issue.confidence || 0) * 100}
                            sx={{ flex: 1, borderRadius: 2, height: 6 }}
                            color={issue.confidence > 0.8 ? 'success' : 'warning'}
                          />
                          <Typography variant="caption" fontWeight={700}>
                            {Math.round((issue.confidence || 0) * 100)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Typography variant="caption">{issue.explanation}</Typography>
                      </TableCell>
                      <TableCell>
                        {linkedJob && (
                          <Chip label={linkedJob.jobNumber} size="small" color="success" />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {logs.length > rowsPerPage && (
        <TablePagination
          component="div"
          count={logs.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0); }}
        />
      )}
    </Box>
  );
}
