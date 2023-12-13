import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_URL } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function PasswordResetRequest() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('Attempting to submit form with data:', data); // Log before submitting the form
    try {
      const response = await axios.post(`${API_URL}/passwordReset`, { email: data.email });
      console.log('Form submitted successfully:', response); // Log after successfully submitting the form
      toast.info("If the email exists in our system, you will receive instructions for password reset.", {
        position: "top-center",
        autoClose: 5000
      });
    } catch (error) {
      console.error('Form submission failed:', error); // Log in case of an error during form submission
      toast.info("If the email exists in our system, you will receive instructions for password reset.", {
        position: "top-center",
        autoClose: 5000
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: '',
            fontSize: "36px",
            fontWeight: "bold",
            fontFamily: "cursive",
            marginBottom: "20px",
          }}
        >
          Password Reset
        </Typography>
        <TextField
          {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
          fullWidth
          variant="outlined"
          label="Email Address"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          placeholder="Enter your email address"
        />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: 250,
              backgroundColor: "#319aa0",
              borderRadius: "50px",
              color: "white",
              fontWeight: "bold",
              fontFamily: "cursive",
              paddingRight: "5px",
              paddingLeft: "5px",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#d9a6ab",
              },
            }}
          >
            Password Reset
          </Button>
        </Box>
        <Box sx={{ marginBottom: "300px" }}></Box>
      </Box>
    </Container>
  );
}
