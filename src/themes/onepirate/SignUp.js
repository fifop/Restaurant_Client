import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../themes/onepirate/modules/components/features/auth/authActions';
import TextField from '@mui/material/TextField'; 
import Box from '@mui/material/Box';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBarForm from './modules/views/AppAppBarForm';
import AppForm from './modules/views/AppForm';
import FormButton from './modules/form/FormButton';
import withRoot from './modules/withRoot';

function SignUp() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [signupCompleted, setSignupCompleted] = useState(false);
  const password = watch("password", "");



  
  useEffect(() => {
    if (signupCompleted) {
      navigate("/login");
    }
  }, [navigate, signupCompleted]);

  const onSub = (bodyData) => {
    dispatch(registerUser(bodyData));
    console.log(bodyData)
    
    setSignupCompleted(true);
  };



  return (
    <React.Fragment>
      <AppAppBarForm />

      <Box 
        sx={{ 
          backgroundColor: '#ccc495', 
          borderRadius: '8px', 
        }}
      >   
<AppForm sx={{ p: { xs: 2, sm: 3, md: 10 } }}>

        <Typography sx={{
          color: "",
          fontSize: "36px",
          fontWeight: "bold",
          fontFamily: "cursive",
          textAlign: "center",
          alignContent: "center",
          marginBottom:"20px"
        }} variant="h2" align="center">
          Sign Up
        </Typography>
        <Typography variant="body2" align="center">
          <Link to={"/login"}>
            Already have an account?
          </Link>
        </Typography>
        <Box   component="form" onSubmit={handleSubmit(onSub)} noValidate sx={{ mt: 6 }}>
        <TextField  
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("name", { required: true, minLength: 2 })}
          error={!!errors.name}
          helperText={errors.name ? "* Enter name (min 2 chars)" : ""}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
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
          helperText={errors.password ? "* Enter valid password (min 3 chars)" : ""}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          {...register("confirmPassword", { 
            required: "Confirm password is required",
            validate: value => value === password || "Passwords do not match"
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
        />
        <FormButton sx={{
  backgroundColor: "#319aa0",
  borderRadius: '50px', 

  color: "white",
  fontWeight: "bold",
  fontFamily: "cursive",
  paddingRight: "30px",
  paddingLeft: "30px",
  fontSize: "14px",
  marginTop:'20px',
  "&:hover": {
    backgroundColor: "#d9a6ab",
  },
}}
 disabled={signupCompleted} color="secondary" fullWidth>
          {signupCompleted ? 'In progress…' : 'Sign Up'}
        </FormButton>
      </Box>
      </AppForm>
      </Box>

      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
