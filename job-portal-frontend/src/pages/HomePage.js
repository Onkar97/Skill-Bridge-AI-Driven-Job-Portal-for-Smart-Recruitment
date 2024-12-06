import React from 'react';
import { Typography, Container, Box, Button, Grid, Card, CardContent, CardMedia, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

// Enhanced theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3a86ff',
    },
    secondary: {
      main: '#ff006e',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled components
const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.secondary.main,
  color: '#fff',
  borderRadius: '30px',
  fontWeight: 'bold',
  textTransform: 'none',
  fontSize: '1.1rem',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(255, 0, 110, 0.4)',
  },
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
  },
  borderRadius: '20px',
  overflow: 'hidden',
  animation: `${fadeIn} 0.6s ease-out`,
}));

const StyledTestimonialCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
  },
  animation: `${float} 3s ease-in-out infinite`,
}));

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #3a86ff, #ff006e)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

// Main Component
const Home = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleExploreClick = () => {
    navigate('JobList'); // Redirect to the Jobs section
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} style={{ backgroundColor: theme.palette.background.default, overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Box sx={{ py: 12, position: 'relative' }}>
            <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
              Find Your <GradientText>Dream Job</GradientText>
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              align="center"
              color="text.secondary"
              sx={{ mb: 5, maxWidth: '800px', mx: 'auto' }}
            >
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </Typography>

            <Box display="flex" justifyContent="center">
              <StyledButton variant="contained" size="large" onClick={handleExploreClick}>
                Explore Opportunities
              </StyledButton>
            </Box>
          </Box>

          {/* Features Section */}
          <Box sx={{ my: 12 }}>
            <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 6 }}>
              Why Choose Our Platform?
            </Typography>
            <Grid container spacing={6}>
              {[
                { title: "Wide Range of Jobs", image: "images/ImageGallery.jpg", description: "Explore thousands of job listings across various industries and locations." },
                { title: "Easy Recruitment", image: "images/easy.png", description: "Employers can easily post job openings and manage applications in one place." },
                { title: "Career Growth", image: "images/car.jpg", description: "Access resources to help you grow in your career and land the right opportunities." },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StyledCard>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Testimonials Section */}
          <Box sx={{ my: 12 }}>
            <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 6 }}>
              What Our Users Say
            </Typography>
            <Grid container spacing={6}>
              {[
                {
                  quote: "This platform helped me find my dream job in just a few weeks! The process was smooth and easy.",
                  author: "John Doe, Software Engineer",
                },
                {
                  quote: "As an employer, I found the perfect candidate for our open position within days. Highly recommend!",
                  author: "Jane Smith, HR Manager",
                },
              ].map((testimonial, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <StyledTestimonialCard>
                    <CardContent>
                      <Typography variant="body1" gutterBottom sx={{ fontStyle: 'italic', mb: 3 }}>
                        "{testimonial.quote}"
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                        - {testimonial.author}
                      </Typography>
                    </CardContent>
                  </StyledTestimonialCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default Home;
