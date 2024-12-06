import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Paper, InputAdornment, IconButton,
  ThemeProvider, createTheme, Box, Checkbox, FormControlLabel, Snackbar, Alert,
  CircularProgress, Link, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Visibility, VisibilityOff, Email, Lock, Person, Business, SupervisorAccount,
} from '@mui/icons-material';
import "../styles/login.css";

// Theme setup
const theme = createTheme({
  palette: {
    primary: {
      main: '#1d3557', // Modern dark blue
    },
    secondary: {
      main: '#457b9d', // Light blue
    },
    background: {
      default: '#f1faee', // Soft background
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h3: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
  },
  shape: {
    borderRadius: 16,
  },
});

const LoginContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: '20px',
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
}));

const Logo = styled('div')(() => ({
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#1d3557',
  marginBottom: '20px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.2),
  fontWeight: 600,
  textTransform: 'capitalize',
  fontSize: '1rem',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
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
    if (!role) newErrors.role = 'Role is required';  // Added role validation
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      // Send login request with email, password, and role
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
        role
      });

      // Handle response based on backend behavior
      if (response.status === 200) {
        // Handle successful login (you can store a session or user data here)
        setSnackbarMessage('Login successful! Redirecting...');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        // Simulating session establishment
        if (rememberMe) localStorage.setItem('rememberMe', 'true');

        // Call onLogin to update the parent component or redirect
        //onLogin();
        setTimeout(() => {
          navigate(role === 'user' ? '/user-dashboard' : '/recruiter-dashboard');
        }, 1500);
      } else {
        throw new Error('Login failed: No valid response');
      }
    } catch (error) {
      console.error('Login error:', error);

      const errorMessage = error.response ? error.response.data : 'An unknown error occurred.';
      setSnackbarMessage(`Login failed: ${errorMessage}`);
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
            <Logo>WorkWaves</Logo>
            <Typography variant="h3" gutterBottom color="primary">
              Login
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Welcome back! Sign in to access your account.
            </Typography>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <Box mb={2}>
                <TextField
                    fullWidth
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
              </Box>
              <Box mb={2}>
                <TextField
                    fullWidth
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
              </Box>
              <Box mb={2}>
                <FormControl fullWidth>
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
              </Box>
              <FormControlLabel
                  control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                  label="Remember me"
                  style={{ marginBottom: '20px' }}
              />
              <StyledButton
                  type="submit"
                  fullWidth
                  disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
              </StyledButton>
            </form>
            <Typography variant="body2" align="center" mt={2}>
              Don’t have an account?{' '}
              <Link
                  onClick={() => navigate('/RegistrationPage')}
                  style={{ cursor: 'pointer', color: '#1d3557', fontWeight: 'bold' }}
              >
                Sign up
              </Link>
            </Typography>

            {/* Snackbar for login feedback */}
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
