import React from 'react';
import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Avatar,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Work as WorkIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
  boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
  borderRadius: '15px',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  marginBottom: theme.spacing(2),
  background: theme.palette.primary.main,
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
}));

const About = () => {
  const features = [
    { title: 'Job Matching', description: 'Our AI-powered algorithm matches you with the perfect job opportunities.', icon: <WorkIcon /> },
    { title: 'Networking', description: 'Connect with industry professionals and expand your career network.', icon: <PeopleIcon /> },
    { title: 'Career Growth', description: 'Access resources and tools to help you grow in your career.', icon: <TrendingUpIcon /> },
  ];

  const faqs = [
    { question: 'How does the job matching work?', answer: 'Our AI algorithm analyzes your skills, experience, and preferences to match you with suitable job openings.' },
    { question: 'Is the service free?', answer: 'Basic services are free. We also offer premium features for a subscription fee.' },
    { question: 'How can I improve my profile visibility?', answer: 'Complete your profile, add skills, and keep your information up-to-date to improve visibility to employers.' },
  ];

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Typography variant="h2" component="h1" gutterBottom align="center" color="primary">
          About Us
        </Typography>
        <Typography variant="h5" gutterBottom align="center" color="textSecondary">
          Connecting Talent with Opportunity
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body1" paragraph>
          We are a leading job portal dedicated to connecting talented individuals with great companies.
          Our mission is to empower job seekers and help businesses find the perfect candidates to drive their success.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <StyledAvatar>
                  {feature.icon}
                </StyledAvatar>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <StyledAccordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Box>
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button variant="contained" color="primary" size="large">
            Join Us Today
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default About;

