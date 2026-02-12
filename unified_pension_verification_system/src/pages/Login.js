import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginOfficer, requestPasswordReset } from '../services/apiService';

const roles = ['Central Admin', 'State Officer', 'Verification Officer'];

const Login = () => {
  const [officerId, setOfficerId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isForgotDialogOpen, setIsForgotDialogOpen] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [isForgotSubmitting, setIsForgotSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const isFormValid = useMemo(
    () => officerId.trim().length >= 4 && password.length >= 6 && role.length > 0,
    [officerId, password, role]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      setError('Enter a valid Officer ID and password to continue.');
      return;
    }

    setError('');
    try {
      setIsSubmitting(true);
      const loginResponse = await loginOfficer({
        officerId: officerId.trim(),
        password,
        role,
      });
      login({
        role,
        officerId: officerId.trim(),
        rememberMe,
        token: loginResponse.token,
      });
      navigate('/dashboard', { replace: true });
    } catch (apiError) {
      setError(apiError.message || 'Unable to sign in at the moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    const normalizedOfficerId = officerId.trim();

    if (normalizedOfficerId.length < 4) {
      setForgotError('Enter your Officer ID before requesting password reset.');
      setForgotMessage('');
      return;
    }

    try {
      setIsForgotSubmitting(true);
      setForgotError('');
      setForgotMessage('');
      const response = await requestPasswordReset({
        officerId: normalizedOfficerId,
        role,
      });
      setForgotMessage(response.message || 'Password reset request submitted.');
    } catch (apiError) {
      setForgotError(apiError.message || 'Unable to submit password reset request.');
    } finally {
      setIsForgotSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box className="auth-page">
      {/* <Box className="auth-side-panel">
        <Typography variant="overline" sx={{ letterSpacing: 1.2, color: '#93C5FD' }}>
          UPVS SECURE PORTAL
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#F8FAFC', mb: 1 }}>
          Unified Pension Verification System
        </Typography>
        <Typography color="#BFDBFE">
          Single command interface for identity verification, duplicate resolution, and inter-state pension coordination.
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 2.5 }}>
          <Typography color="#DBEAFE">- Real-time beneficiary checks</Typography>
          <Typography color="#DBEAFE">- End-to-end audit trace</Typography>
          <Typography color="#DBEAFE">- Role-based access control</Typography>
        </Stack>
        <Stack spacing={1.5} sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
            Security Snapshot
          </Typography>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: '1px solid rgba(191, 219, 254, 0.35)',
              bgcolor: 'rgba(15, 23, 42, 0.3)',
            }}
          >
            <Typography sx={{ color: '#DBEAFE', fontSize: 13 }}>
              MFA Gate: Enabled
            </Typography>
            <Typography sx={{ color: '#DBEAFE', fontSize: 13 }}>
              Audit Stream: Live
            </Typography>
            <Typography sx={{ color: '#DBEAFE', fontSize: 13 }}>
              Session Timeout: 15 min
            </Typography>
          </Box>
        </Stack>
        <Stack spacing={1} sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
            Officer Help Desk
          </Typography>
          <Typography sx={{ color: '#BFDBFE', fontSize: 14 }}>
            Contact State Nodal Cell for access issues or role updates before proceeding with verification actions.
          </Typography>
          <Typography sx={{ color: '#93C5FD', fontSize: 12 }}>
            Support Hours: 08:00 - 20:00 IST
          </Typography>
          <Typography sx={{ color: '#DBEAFE', fontSize: 13 }}>
            Help Line: +91 90000 12345
          </Typography>
          <Typography sx={{ color: '#DBEAFE', fontSize: 13 }}>
            Email: upvs.helpdesk@gov-support.in
          </Typography>
        </Stack>
      </Box> */}
      <Card className="auth-card">
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 700 , mb : 3}}>
                Sign In
              </Typography>
              <Typography color="text.secondary">
                Access your officer workspace
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                  label="Officer ID"
                  placeholder="UPVS-ADM-1021"
                  value={officerId}
                  onChange={(event) => setOfficerId(event.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -0.5 }}>
                  <Button
                    type="button"
                    variant="text"
                    size="small"
                    onClick={() => {
                      setIsForgotDialogOpen(true);
                      setForgotError('');
                      setForgotMessage('');
                    }}
                    sx={{ px: 0.5, py: 0, minHeight: 22, lineHeight: 1, minWidth: 'unset' }}
                  >
                    Forgot password?
                  </Button>
                </Box>
                <TextField
                  select
                  label="Role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  fullWidth
                >
                  {roles.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                    />
                  }
                  label="Keep me signed in on this device"
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!isFormValid || isSubmitting}
                >
                  Enter Command Console
                </Button>
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Demo login: use one of UPVS-ADM-1021 / UPVS-ST-2241 / UPVS-VER-3490 with password upvs@123.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <Dialog
        open={isForgotDialogOpen}
        onClose={() => setIsForgotDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Password Reset Help</DialogTitle>
        <DialogContent>
          <Stack spacing={1.2} sx={{ pt: 0.5 }}>
            {forgotError && <Alert severity="error">{forgotError}</Alert>}
            {forgotMessage && <Alert severity="success">{forgotMessage}</Alert>}
            <Typography variant="body2" color="text.secondary">
              Password reset is managed by your State Nodal Officer.
            </Typography>
            <Typography variant="body2">Help Line: +91 90000 12345</Typography>
            <Typography variant="body2">Email: upvs.helpdesk@gov-support.in</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotPassword} disabled={isForgotSubmitting}>
            {isForgotSubmitting ? 'Submitting...' : 'Request Reset'}
          </Button>
          <Button onClick={() => setIsForgotDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;
