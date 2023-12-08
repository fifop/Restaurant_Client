import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import "./Our_Dishes.css"
import { useState ,useEffect} from 'react';
import { API_URL,doApiGet } from '../../../../services/apiServices';



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
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
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
}));



export default function ProductCategories() {
  const [dishes,setDishes] = useState([]);
  const url = API_URL + `/dishes`;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await doApiGet(url);
        setDishes(resp);
        console.log(resp);
      } catch (err) {
        // Handle error here, e.g., set error state, show notification, etc.
        console.error("Error fetching dishes:", err);
      }
    };
    fetchData();

 }, [])


  return (
    <div className='backgruond' >
    <Container >
      <Typography variant="h4" 
      align="center" component="h2"
      sx={{
        // backgroundColor: "#319aa0",
        color: "white",
        fontWeight: "bold",
        fontFamily: "cursive",
        paddingRight: "30px",
        paddingLeft: "30px",
        fontSize: "36px",
        "&:hover": {
          backgroundColor: "#d9a6ab",
        },
        mr: 1,
      }}>
        Our Dishes:
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {dishes.map((dish) => (
          
          <ImageIconButton
            key={dish.name}
            style={{
              width: dish.price,
              
            }}
          >
{/* <img src={dish.imageUrl} alt="Dish" width="200px" height="200px"/> */}

            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                // backgroundImage: `url(${image.url})`,
              
              }}
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
              >
                {dish.name}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
    </div>
  );
}
