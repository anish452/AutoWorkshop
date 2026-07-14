import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getDashboardRoute } from '../utils/helpers';
import { CircularProgress, Box } from '@mui/material';

import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/auth/LoginPage';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import AdvisorDashboard from '../pages/dashboard/AdvisorDashboard';
import DepartmentDashboard from '../pages/dashboard/DepartmentDashboard';
import CustomerDashboard from '../pages/dashboard/CustomerDashboard';
import CustomersPage from '../pages/customers/CustomersPage';
import VehiclesPage from '../pages/vehicles/VehiclesPage';
import JobsPage from '../pages/jobs/JobsPage';
import CreateJobPage from '../pages/jobs/CreateJobPage';
import JobDetailPage from '../pages/jobs/JobDetailPage';
import UsersPage from '../pages/users/UsersPage';
import DepartmentsPage from '../pages/departments/DepartmentsPage';
import AIAnalysisPage from '../pages/ai-analysis/AIAnalysisPage';
import NotFoundPage from '../pages/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;
  return children;
};

const DashboardRedirect = () => {
  const { role } = useAuth();
  return <Navigate to={getDashboardRoute(role)} replace />;
};

export default function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<DashboardRedirect />} />
        <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/advisor" element={<ProtectedRoute allowedRoles={['JOB_ADVISOR']}><AdvisorDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/department" element={<ProtectedRoute allowedRoles={['MECHANICAL','ELECTRICAL','BODY_REPAIR','PAINT','GENERAL_INSPECTION']}><DepartmentDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/customer" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><CustomerDashboard /></ProtectedRoute>} />

        <Route path="/customers" element={<ProtectedRoute allowedRoles={['ADMIN','JOB_ADVISOR']}><CustomersPage /></ProtectedRoute>} />
        <Route path="/vehicles" element={<ProtectedRoute allowedRoles={['ADMIN','JOB_ADVISOR']}><VehiclesPage /></ProtectedRoute>} />

        <Route path="/jobs" element={<ProtectedRoute allowedRoles={['ADMIN','JOB_ADVISOR','MECHANICAL','ELECTRICAL','BODY_REPAIR','PAINT','GENERAL_INSPECTION','CUSTOMER']}><JobsPage /></ProtectedRoute>} />
        <Route path="/jobs/create" element={<ProtectedRoute allowedRoles={['ADMIN','JOB_ADVISOR']}><CreateJobPage /></ProtectedRoute>} />
        <Route path="/jobs/:id" element={<ProtectedRoute allowedRoles={['ADMIN','JOB_ADVISOR','MECHANICAL','ELECTRICAL','BODY_REPAIR','PAINT','GENERAL_INSPECTION','CUSTOMER']}><JobDetailPage /></ProtectedRoute>} />

        <Route path="/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><UsersPage /></ProtectedRoute>} />
        <Route path="/departments" element={<ProtectedRoute allowedRoles={['ADMIN']}><DepartmentsPage /></ProtectedRoute>} />
        <Route path="/ai-analysis" element={<ProtectedRoute allowedRoles={['ADMIN','JOB_ADVISOR']}><AIAnalysisPage /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
