import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '100px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom  sx={{
              color: "black",
              fontWeight: "bold",
              fontFamily: "cursive",
              paddingRight: "30px",
              paddingLeft: "30px",
              fontSize: "36px",
              marginTop: "30px",

            }}>
        404 - Not Found
      </Typography>
      <Typography  sx={{
              color: "black",
              fontWeight: "bold",
              fontFamily: "cursive",
              paddingRight: "30px",
              paddingLeft: "30px",
              fontSize: "18px",
              marginTop: "30px",

            }} gutterBottom>
        Sorry, the page you are looking for doesn’t exist.
      </Typography>
      <Button 
        sx={{
          backgroundColor: "#319aa0",
          color: "white",
          fontWeight: "bold",
          fontFamily: "cursive",
          paddingRight: "30px",
          paddingLeft: "30px",
          fontSize: "14px",
          marginTop: "30px",
          "&:hover": {
            backgroundColor: "#d9a6ab",
          },
        }}
        onClick={() => navigate('/')}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
