import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '../components/Paper';

function AppForm(props) {
  const { children } = props;
  Paper.propTypes = {
    // ... other propTypes
    background: PropTypes.string,
  };
  
  Paper.defaultProps = {
    // ... other default props
    background: 'light', // Default background value
  };
  

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundImage: 'url(/images/324941.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ccc495', 
      }}
    >
<Container maxWidth="md" sx={{ width: { xs: '90%', sm: '85%', md: '40%' } }}>
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

AppForm.propTypes = {
  children: PropTypes.node,
};

export default AppForm;

