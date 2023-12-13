import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { API_URL, doApiGet,doApiMethod,doApiGetNoToken } from '../../../../services/apiServices';
import './Our_Dishes.css';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PagesBtns from '../components/PagesBtns';


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
  '& .editDeleteIcons': {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'none',
    zIndex: 2,
    '& .editIcon, & .deleteIcon': {
      fontSize: '24px',
      color: theme.palette.common.white,
      margin: '0 4px',
      cursor: 'pointer',
    },
    '&:hover': {
      '& .editIcon, & .deleteIcon': {
        display: 'inline-block',
      },
    },
  },
}));

export default function Our_Dishes_2() {
  const [dishes, setDishes] = useState([]);
  const url = API_URL + `/dishes`;
  const { userInfo, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  // let { page } = useParams();
  



  const addDishClick = () => {
    navigate('./addDishe')
  }

const handleEditDish = (dishId) => {
    navigate(`/editDishe/${dishId}`);
  };


  useEffect(() => {
    fetchData();
  }, [query]);

  const fetchData = async () => {
    try {
      const pageNumber = query.get("page") || 1;

      const resp = await doApiGetNoToken(`${url}?page=${pageNumber}`);
      setDishes(resp);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  const handleDeleteDish = async (dishID) => {
    if (window.confirm('Are you sure you want to delete this dishe?')) {
      try {
          await doApiMethod(`${API_URL}/dishes/${dishID}`, 'DELETE');
    fetchData();

        } catch (error) {
          console.error("Error deleting dishe:", error);
      }
  }

};
  return (
    <section id="menu-section" className='background'>
      <Container>
        <Typography variant="h4"
          align="center" component="h2"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontFamily: "cursive",
            paddingRight: "30px",
            paddingLeft: "30px",
            paddingTop: "40px",
            fontSize: "36px",
            mr: 0,
          }}>
          Our Dishes:
        </Typography>
        {(userInfo && role === "admin") && (
          <Button
            className="btn"
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
            onClick={addDishClick}
          >
            {"Add Dishes +"}
          </Button>
        )}
        <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {dishes.map((dish) => (
            <ImageIconButton
  key={dish._id}
  sx={{
    width: '100%',
    maxWidth: 300,
    mb: 4,
    position: 'relative',
    overflow: 'hidden',
    '&:hover .editDeleteIcons': {
      display: 'block',
    },
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
      className="editDeleteIcons" // Add this class for the icons container
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'none', // Hide the icons by default
      }}
    >
          {userInfo && userInfo.role === "admin" && ( 
            <>
              <EditIcon className="editIcon" onClick={()=>handleEditDish(dish._id)} />
              <DeleteIcon
                className="deleteIcon"
                onClick={()=>handleDeleteDish(dish._id)}
              />
            </>
          )}

    </Box>
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
        <PagesBtns apiUrl={API_URL+"/dishes/count"} linkTo={"/dishes?page="}/>
      </Container>
    </section>
  );
} 