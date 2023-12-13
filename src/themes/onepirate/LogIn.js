import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../themes/onepirate/modules/components/features/auth/authActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBarForm from "./modules/views/AppAppBarForm";
import AppForm from "./modules/views/AppForm";
import FormButton from "./modules/form/FormButton";
import withRoot from "./modules/withRoot";

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, error, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin"||userInfo.role === "user") {
        navigate("/");
      } else {
        navigate("/user-profile");
      }
    }
  }, [userInfo, navigate]);

  const onSub = (bodyData) => {
    dispatch(loginUser(bodyData));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <React.Fragment>
      <AppAppBarForm />

      <Box
        sx={{
          backgroundColor: "#ccc495",
          borderRadius: "8px",
        }}
      >
        <AppForm sx={{ p: { xs: 2, sm: 3, md: 10 } }}>
          <Typography
            sx={{
              color: "",
              fontSize: "36px",
              fontWeight: "bold",
              fontFamily: "cursive",
              textAlign: "center",
              alignContent: "center",
              marginBottom: "20px",
            }}
            variant="h2"
            align="center"
          >
            Log In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link
              to="/signup"
              align="center"
              underline="always"
              sx={{
                color: "#319aa0",
                "&:hover": {
                  color: "darkcyan",
                },
              }}
            >
              Sign Up here
            </Link>
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSub)}
            noValidate
            sx={{ mt: 6 }}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              error={!!errors.email}
              helperText={errors.email ? "* Enter valid email" : ""}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              {...register("password", { required: true, minLength: 3 })}
              error={!!errors.password}
              helperText={
                errors.password ? "* Enter valid password (min 3 chars)" : ""
              }
            />

            <FormButton
              sx={{
                backgroundColor: "#319aa0",
                borderRadius: "50px",

                color: "white",
                fontWeight: "bold",
                fontFamily: "cursive",
                paddingRight: "30px",
                paddingLeft: "30px",
                fontSize: "14px",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#d9a6ab",
                },
              }}
              color="secondary"
              fullWidth
            >
              log In
            </FormButton>
            <Typography align="center">
          <Link to="/password-reset-request"
            underline="always" 
            sx={{ 
              marginTop:"20px",
              color: "#319aa0",
              "&:hover": { color: "darkcyan" },
            }}
          >
            Forgot password?
          </Link>
        </Typography>
          </Box>
        </AppForm>
        
      </Box>

      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(LogIn);
