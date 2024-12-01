import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    InputAdornment,
    IconButton,
    ThemeProvider,
    createTheme,
    Box,
    Checkbox,
    FormControlLabel,
    Divider,
    Snackbar,
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
    Visibility, 
    VisibilityOff, 
    Email, 
    Lock,
} from '@mui/icons-material';

// Custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5', // Indigo
        },
        secondary: {
            main: '#f50057', // Pink
        },
        background: {
            default: '#f4f6f8',
        },
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
    },
    shape: {
        borderRadius: 12,
    },
});

// Styled components
const LoginContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: '450px',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    },
}));



const Login = ({ onLogin }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                identifier,
                password,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                onLogin();
                setSnackbarMessage('Login successful! Redirecting...');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/home'), 1500);
            } else {
                throw new Error('Login failed: No token received.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setSnackbarMessage('Login failed. User not found.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <LoginContainer maxWidth={false}>
                <LoginPaper elevation={3}>
                    <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
                        Enter your credentials to access your account
                    </Typography>
                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            variant="outlined"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <FormControlLabel
                                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                                label="Remember me"
                            />
                            <Link to="/forgot-password" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                            </Link>
                        </Box>
                        <StyledButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign In'}
                        </StyledButton>
                    </form>
                    <Divider sx={{ my: 3, width: '100%' }}>
                        <Typography variant="body2" color="textSecondary">
                           
                        </Typography>
                    </Divider>
                   
                       
                        
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" align="center">
                            {' '}
                            <Link to="/register" style={{ textDecoration: 'none', color: theme.palette.primary.main, fontWeight: 600 }}>
                                
                            </Link>
                        </Typography>
                    </Box>
                </LoginPaper>
            </LoginContainer>
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default Login;

