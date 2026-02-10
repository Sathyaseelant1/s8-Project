import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { useAuth } from './context/AuthContext';
import AuditLogs from './pages/AuditLogs';
import Beneficiaries from './pages/Beneficiaries';
import Coordination from './pages/Coordination';
import Dashboard from './pages/Dashboard';
import Duplicates from './pages/Duplicates';
import Eligibility from './pages/Eligibility';
import Login from './pages/Login';
import './App.css';

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="beneficiaries" element={<Beneficiaries />} />
        <Route path="duplicates" element={<Duplicates />} />
        <Route path="eligibility" element={<Eligibility />} />
        <Route path="coordination" element={<Coordination />} />
        <Route path="audit-logs" element={<AuditLogs />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
