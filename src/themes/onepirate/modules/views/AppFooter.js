import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';



const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: ' rgb(204 196 ,149)',
  borderRadius: '50px', 

  mr: 1,
  '&:hover': {
    backgroundColor: "#319aa0",
  },
};



export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', backgroundColor: '#d9a6ab' }}
    >
      <Container sx={{ my: 0, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="" sx={iconStyle}>
                <FacebookIcon/>
                </Box>
                <Box component="a" href="" sx={iconStyle}>
                 <InstagramIcon/>
                </Box>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Grid>
       
        
        </Grid>
      </Container>
    </Typography>
  );
}
