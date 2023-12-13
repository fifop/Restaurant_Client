import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography";
import AppBookForm from "./AppBookForm";
import { API_URL, doApiMethod,doApiGet } from "../../../../services/apiServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditUsers() {
    const {
        control,
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm();

      const password = watch("password", "");

      const nav = useNavigate();
    
      const onSub = async (bodyData) => {
        console.log(bodyData);
        try {
      
          const url = `${API_URL}/users`;

   const resp = await doApiMethod(url, "POST", bodyData);
          console.log("Response object:", resp);
    
          if(resp && resp._id){
            toast.success("The User has been successfully Added", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000,
            });
            reset();
    
            nav(-1);
          } else {
            console.error(
              "User was not Adedd, or the response is not in the expected format."
            );
          }
        } catch (error) {
          console.error("Error update worker:", error);
        }
      };
      
    
      
    
      return (
        <AppBookForm>

    <Box
      component="form"
      onSubmit={handleSubmit(onSub)}
      noValidate
      sx={{
        // backgroundColor: "#ccc495",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column", // Stack elements vertically by default
        alignItems: "center", // Center elements horizontally
        padding: "20px", // Add padding as needed
      }}
    >
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
        Add New User
      </Typography>

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
     
      

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          width: 250,
          backgroundColor: "#319aa0",
          borderRadius: "50px",
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
        Update User
      </Button>
      <Button
        onClick={() => nav(-1)}
        variant="contained"
        sx={{
          mt: 2, 
          width: 250,
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
      >
        Go Back
      </Button>
    </Box>
      </AppBookForm>

  );
}