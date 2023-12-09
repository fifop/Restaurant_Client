import * as React from "react";
import "./AppAppBar.css";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBarForm from "../components/AppBarForm";
import Toolbar from "../components/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';




function AppAppBarForm() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignInClick = () => {
    navigate('/login'); 
  };
  const handleSignUpClick = () => {
    navigate('/signUp'); 
  };
  return (
    <div>
      <AppBarForm  sx={{ padding: 0, margin: 0 }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: 0,
            borderBottom: "3px solid white",
            display: 'flex',
            backgroundImage: 'url(/images/324941.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment:"scroll",
            backgroundColor: '#ccc495', 
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", p: 0, m: 0 }}>
            <img
              src="/images/GreyandBeigeRestaurantLOGO.png"
              alt="Fifo Rest Logo"
              style={{ height: "300px", width: "300px", margin: "-80PX" }}
              />
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              className="menu-btn"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
              sx={{
                "& svg": {
                  fontSize: "36px",
                },
                mr: 3,
                display: { sm: "flex", xs: "block" },
              }}
            >
              <MenuIcon />
            </IconButton>       
          </Box>
        </Toolbar>
      </AppBarForm>

      {/* <Toolbar /> */}

      <Drawer
  anchor="right"
  open={menuOpen}
  onClose={toggleMenu}

>
  <List className="list_background">
    <ListItem>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // הצג את הכפתורים ליד זה לצד זה
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Button onClick={handleSignInClick}
          className="btn"
          sx={{
            backgroundColor: "#319aa0",
            color: "white",
            fontWeight: "bold",
            fontFamily: "cursive",
            paddingRight: "30px",
            paddingLeft: "30px",
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#d9a6ab",
            },
            mr: 1,
          }}
        >
          {"Log In"}
        </Button>
        <Button onClick={handleSignUpClick}
          className="btn"
          sx={{
            backgroundColor: "#319aa0",
            color: "white",
            fontWeight: "bold",
            fontFamily: "cursive",
            paddingRight: "30px",
            paddingLeft: "30px",
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#d9a6ab",
            },
          }}
        >
          {"Sign Up"}
        </Button>
      </Box>
    </ListItem>
    <ListItem className="category-separator" />

    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Link
        variant="h6"
        underline="none"
        href="/about"
        sx={{
          color: "white",
          fontSize: "20px",
          "&:hover": {
            backgroundColor: "#d9a6ab",
          },
          fontWeight: "bold",
          fontFamily: "cursive",
        }}
      >
        About
      </Link>
    </ListItem>
    <ListItem className="category-separator" />

    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Link
        variant="h6"
        underline="none"
        href="/menu"
        sx={{
          color: "white",
          fontSize: "20px",
          "&:hover": {
            backgroundColor: "#d9a6ab",
          },
          fontWeight: "bold",
          fontFamily: "cursive",
        }}
      >
        Our Menu
      </Link>
    </ListItem>
    <ListItem className="category-separator" />

    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Link
        variant="h6"
        underline="none"
        href="/contact"
        sx={{
          color: "white",
          fontSize: "20px",
          "&:hover": {
            backgroundColor: "#d9a6ab",
          },
          fontWeight: "bold",
          fontFamily: "cursive",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        Book a table
      </Link>
    </ListItem>
    <ListItem className="category-separator" />

    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Button
        onClick={toggleMenu}
        sx={{
          backgroundColor: "#319aa0",
          color: "white",
          fontWeight: "bold",
          fontFamily: "cursive",
          paddingRight: "30px",
          paddingLeft: "30px",
          fontSize: "14px",
          "&:hover": {
            backgroundColor: "#d9a6ab",
          },
        }}
      >
        Close
      </Button>
    </ListItem>
  </List>
</Drawer>


      {/* <Toolbar /> */}
    </div>
  );
}

export default AppAppBarForm;
