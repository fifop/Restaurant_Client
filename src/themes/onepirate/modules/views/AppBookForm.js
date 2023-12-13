import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '../components/Paper';

function AppBookForm(props) {
  const { children } = props;
  Paper.propTypes = {
    
    background: PropTypes.string,
  };
  
  Paper.defaultProps = {
    background: 'light', 
  };
  

  return (
    <Box
    sx={{
        display: 'flex',
        backgroundImage: 'url(/images/324941.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(204, 196, 149, 0.5)', 
        backgroundBlendMode: 'overlay', 
        backgroundSize: 'cover', 


      }}
    >
<Container maxWidth="md" sx={{ width: { xs: '90%', sm: '85%', md: '42%' } }}>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Paper
            background="light"
            sx={{ 
              py: { xs: 4, md: 8 }, 
              px: { xs: 3, md: 6 },

              borderRadius: '20px', 
              boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' ,
              backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            }}
          >
            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

AppBookForm.propTypes = {
  children: PropTypes.node,
};

export default AppBookForm;

