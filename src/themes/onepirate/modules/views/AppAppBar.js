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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Typography from "../components/Typography";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../components/features/auth/authSlice";


function AppAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignInClick = () => {
    navigate("/login");
  };
  const handleSignUpClick = () => {
    navigate("/signUp");
  };
  const { userInfo, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


const handleLogoutClick = () => {
  dispatch(logout());
  navigate("/");
  window.scrollTo(0, 0);

};


  return (
    <div>
      <AppBar sx={{ padding: 0, margin: 0 }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: 0,
            borderBottom: "3px solid white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
      <a href="#section-home">
  <img
    src="/images/GreyandBeigeRestaurantLOGO.png"
    alt="Fifo Rest Logo"
    style={{ height: "300px", width: "300px", margin: "-80px" }}
  />
</a>



          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            {userInfo && (
              <Button
                onClick={handleLogoutClick}
                sx={{
                  backgroundColor: "#319aa0",
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "cursive",
                  paddingRight: "30px",
                  paddingLeft: "30px",
                  marginRight: "30px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#d9a6ab",
                  },
                }}
              >
                Logout
              </Button>
            )}
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
      </AppBar>

      <Drawer anchor="right" open={menuOpen} onClose={toggleMenu}>
        <List className="list_background">
          {!userInfo && (
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <Button
                  onClick={handleSignInClick}
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
                <Button
                  onClick={handleSignUpClick}
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
          )}
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
        <a
  href="#section-home"
  onClick={() => setMenuOpen(false)}
  style={{ textDecoration: "none", color: "white" }}
>
  <Typography
    sx={{ fontFamily: "cursive", fontSize: "20px", color: "white" }}
  >
    {userInfo ? `Hello ${userInfo.name}` : "Hello Guest"}
  </Typography>
</a>


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
              onClick={() => {
                setMenuOpen(false);
              }}
              variant="h6"
              underline="none"
              href="#about-section"
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
              onClick={() => {
                setMenuOpen(false);
              }}
              variant="h6"
              underline="none"
              href="#menu-section"
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
              onClick={() => {
                setMenuOpen(false);
              }}
              variant="h6"
              underline="none"
              href="#book-section"
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

          {role === "admin" && (
            <><ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Link
                component={RouterLink}
                to="/workers"
                onClick={() => setMenuOpen(false)}
                variant="h6"
                underline="none"
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
                Our Workers
              </Link>
            </ListItem><ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
          <ListItem className="category-separator" />

                <Link
                  component={RouterLink}
                  to="/users"
                  onClick={() => setMenuOpen(false)}
                  variant="h6"
                  underline="none"
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
                  Users Mangment
                </Link>
              </ListItem>
              <ListItem className="category-separator" />

              </>


          )}


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
