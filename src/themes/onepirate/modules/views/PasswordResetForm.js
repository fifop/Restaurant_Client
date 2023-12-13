import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import AppFooter from './AppFooter'

import { API_URL } from '../../../../services/apiServices';
import AppBookForm from './AppBookForm';


export default function PasswordResetForm({ token }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const params = useParams();
    const token_params = params.token;
    const nav = useNavigate();
  
    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
          toast.error('Passwords do not match', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
    
        try {
            const url = `${API_URL}/passwordReset/${token_params}`;
            const payload = {
            token,
            newPassword: data.password
          };
    
          const response = await axios({
            method: 'POST',
            url,
            data: payload,
            headers: {
                'x-api-key': token_params
            }
          });
    
          if (response.data) {
            toast.success('Password has been reset successfully!', {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => nav('/')
            });
          } else {
            toast.info('Failed to reset password. Please try again.', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } catch (error) {
          console.error('Error occurred:', error);
          toast.error('Failed to reset password. Please try again.', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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
              variant="h4"
              sx={{
                color: '',
                fontSize: '36px',
                fontWeight: 'bold',
                fontFamily: 'cursive',
                marginBottom: '20px',
              }}
            >
              Password Reset
            </Typography>
            <TextField
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              fullWidth
              variant="outlined"
              label="New Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
              fullWidth
              label="Confirm New Password"
              type="password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={{ marginBottom: '20px' }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: 250,
                backgroundColor: '#319aa0',
                borderRadius: '50px',
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'cursive',
                paddingRight: '30px',
                paddingLeft: '30px',
                fontSize: '14px',
                '&:hover': {
                  backgroundColor: '#d9a6ab',
                },
              }}
            >
              Reset Password
            </Button>
          </Box>
        </Container>
      );
    }