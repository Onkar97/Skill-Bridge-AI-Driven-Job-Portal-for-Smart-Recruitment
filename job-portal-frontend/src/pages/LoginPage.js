import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Paper, InputAdornment, IconButton,
  ThemeProvider, createTheme, Box, Checkbox, FormControlLabel, FormControl,
  InputLabel, Select, MenuItem, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Email, Lock, Person, Business, SupervisorAccount } from '@mui/icons-material';
import "../styles/login.css"
const theme = createTheme({
  palette: {
    primary: {
      main: '#0a66c2', // LinkedIn Blue
    },
    secondary: {
      main: '#f3f2ef', // LinkedIn Light Gray
    },
    background: {
      default: '#f3f2ef', // LinkedIn Background
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h3: {
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      color: '#5e5e5e',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const LoginContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '420px',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
}));

const Logo = styled('div')(() => ({
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#0a66c2',
  textAlign: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: '#004182',
  },
}));

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', { email, password, role });
      if (response) {
        // there is no need to maintain session manually
        //localStorage.setItem('token', response.data.token);
        if (rememberMe) localStorage.setItem('rememberMe', 'true');
        onLogin();
        setSnackbarMessage('Login successful! Redirecting...');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate(role === 'user' ? '/user-dashboard' : '/recruiter-dashboard');
        }, 1500);
      } else {
        throw new Error('Login failed: No token received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setSnackbarMessage('Login failed. Please check your credentials and try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
      <ThemeProvider theme={theme}>
        <LoginContainer>
          <LoginPaper>
            <Logo>WORKWAVES</Logo>
            <Typography variant="h3" color="primary" gutterBottom>
              Sign in
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              Stay updated on your professional world
            </Typography>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                    ),
                  }}
              />
              <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  error={!!errors.password}
                  helperText={errors.password}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                    ),
                  }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    disabled={loading}
                >
                  <MenuItem value="user"><Person /> User</MenuItem>
                  <MenuItem value="recruiter"><Business /> Recruiter</MenuItem>
                  <MenuItem value="hr"><SupervisorAccount /> HR/Manager</MenuItem>
                </Select>
              </FormControl>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                    label="Remember me"
                />
              </Box>
              <StyledButton
                  type="submit"
                  fullWidth
                  disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign in'}
              </StyledButton>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>
          </LoginPaper>
        </LoginContainer>
      </ThemeProvider>
  );
};

export default Login;