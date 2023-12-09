import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { API_URL, doApiGet } from '../../../../services/apiServices';
import './Our_Dishes.css';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.1,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  '&:hover': {
    zIndex: 1,
    
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
    
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  '& img': {
    borderRadius: '15px', // Increase this value for more rounded corners
  },
}));

export default function ProductCategories() {
  const [dishes, setDishes] = useState([]);
  const url = API_URL + `/dishes`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await doApiGet(url);
        setDishes(resp);
      } catch (err) {
        console.error("Error fetching dishes:", err);
      }
    };
    fetchData();
  }, [url]);

  return (
    <div id="menu-section" className='background'>
      <Container>
        <Typography variant="h4" 
      align="center" component="h2"
      sx={{
        // backgroundColor: "#319aa0",
        color: "white",
        fontWeight: "bold",
        fontFamily: "cursive",
        paddingRight: "30px",
        paddingLeft: "30px",
        paddingTop:"40px",
        fontSize: "36px",
        "&:hover": {
          backgroundColor: "#d9a6ab",
          border: '4px solid currentColor',
        },
        mr: 0,
      }}>
          Our Dishes:
        </Typography>

        <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {dishes.map((dish) => (
            <ImageIconButton
              key={dish.name}
              sx={{
                width: '100%',
                maxWidth: 300,
                mb: 4,
              }}
            >
              <Box sx={{ position: 'relative', width: '100%', height: '200px' }}>
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <ImageBackdrop className="imageBackdrop" />
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'common.white',
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className="imageTitle"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontFamily: "cursive",
                      paddingRight: "30px",
                      paddingLeft: "30px",
                      fontSize: "16px",
                      "&:hover": {
                        backgroundColor: "#d9a6ab",
                        opacity: 0.8,
                      },
                      mr: 1,
                    }}
                  >
                    {dish.name}
                    <div className="imageMarked" />
                  </Typography>
                </Box>
              </Box>
            </ImageIconButton>
          ))}
        </Box>
      </Container>
    </div>
  );
}

