import * as React from "react";
import "./AppAppBar.css";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
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


const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};
const backgroundImage = "../../../../../public/images/309291.jpg";

function AppAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignInClick = () => {
    navigate('/signin'); // Navigate to the Sign In page
  };
  return (
    <div>
      <AppBar position="fixed" sx={{ padding: 0, margin: 0 }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: 0,
            borderBottom: "3px solid white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", p: 0, m: 0 }}>
            <img
              src="/images/GreyandBeigeRestaurantLOGO.png"
              alt="Fifo Rest Logo"
              style={{ height: "300px", width: "300px", margin: 0 }}
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
                display: { sm: "none", xs: "block" },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                ml: 2,
              }}
            >
              <Button onClick={handleSignInClick}
                className="btn"
                sx={{
                  backgroundColor: "#319aa0",
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "cursive",
                  /* borderRadius: "35%", */
                  paddingRight: "30px",
                  paddingLeft: "30px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "darkcyan",
                  },
                  ml: 3,
                }}
              >
                {"Sign In"}
              </Button>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Button
                className="btn"
                sx={{
                  backgroundColor: "#319aa0",
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "cursive",
                  /* borderRadius: "35%", */
                  paddingRight: "30px",
                  paddingLeft: "30px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "darkcyan",
                  },
                  ml: 2,
                }}
              >
                {"Sign Up"}
              </Button>
            </Box>
            
          </Box>
        </Toolbar>
      </AppBar>

      {/* <Toolbar /> */}

      <Drawer
  anchor="right"
  open={menuOpen}
  onClose={toggleMenu}
  sx={{
    // backgroundImage: `url(${backgroundImage}) no-repeat center center fixed`,
    // backgroundSize: "cover",
  }}
>
  <List className="background-home2">
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
          {"Sign In"}
        </Button>
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
        Contact
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

export default AppAppBar;
