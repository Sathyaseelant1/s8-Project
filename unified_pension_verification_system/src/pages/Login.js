import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roles = ['Central Admin', 'State Officer', 'Verification Officer'];

const Login = () => {
  const [role, setRole] = useState(roles[0]);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(role);
    navigate('/dashboard');
  };

  return (
    <Box className="auth-page">
      <Card className="auth-card">
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Unified Pension Verification
              </Typography>
              <Typography color="text.secondary">
                Sign in as an authorized officer
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField label="Officer ID" placeholder="UPVS-ADM-1021" fullWidth />
                <TextField label="Password" type="password" fullWidth />
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
                <Button type="submit" variant="contained" size="large">
                  Enter Command Console
                </Button>
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Protected by multi-factor authentication and audit logging.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
