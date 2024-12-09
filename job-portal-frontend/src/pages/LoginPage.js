import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Paper, InputAdornment, IconButton,
  ThemeProvider, createTheme, Box, Snackbar, Alert, CircularProgress, Select,
  MenuItem, FormControl, InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Email, Lock, Person, Business, SupervisorAccount } from '@mui/icons-material';
import "../styles/login.css";
import { useUserContext } from '../components/UserContext'; // Use the hook
//import "../styles/login.css"

const theme = createTheme({
  palette: {
    primary: { main: '#1d3557' },
    secondary: { main: '#457b9d' },
    background: { default: '#f1faee' },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h3: { fontWeight: 600 },
    body1: { fontSize: '1rem', color: '#333' },
  },
  shape: { borderRadius: 16 },
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

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.2),
  fontWeight: 600,
  textTransform: 'capitalize',
  fontSize: '1rem',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': { backgroundColor: theme.palette.primary.dark },
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { updateUser } = useUserContext(); // Use context hook to manage user state

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const payload = {
      email,
      password,
      role,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const userData = response.data;

        // Update context with user data
        updateUser(userData);

        setSnackbarMessage("Login successful! Redirecting...");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Redirect based on role
        setTimeout(() => {
          if (role === "user") navigate("/");
          else if (role === "recruiter") navigate("/recruiter-dashboard");
          else if (role === "hr") navigate("/JobPostForm");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      setSnackbarMessage("Login failed. Please check your credentials.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LoginContainer>
        <LoginPaper>
          <Typography variant="h3" gutterBottom color="primary">
            Login
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                <Select value={role} onChange={(e) => setRole(e.target.value)} required>
                  <MenuItem value="user"><Person /> User</MenuItem>
                  <MenuItem value="recruiter"><Business /> Recruiter</MenuItem>
                  <MenuItem value="hr"><SupervisorAccount /> HR/Manager</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <StyledButton type="submit" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
            </StyledButton>
          </form>

          <Box mt={2}>
            <Typography>
              Don't have an account?{' '}
              <span
                style={{ color: theme.palette.primary.main, cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => navigate('/RegistrationPage')}
              >
                Sign Up Here
              </span>
            </Typography>
          </Box>

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
