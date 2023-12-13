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

export default function AddWorkers() {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

    
      const nav = useNavigate();
    
    

    
      const onSub = async (bodyData) => {
        console.log(bodyData);
        try {
            const url = `${API_URL}/workers/addWorkers`;
    
          const resp = await doApiMethod(url, "POST", bodyData);
          console.log("Response object:", resp);
    
          if(resp &&resp._id){
            toast.success("The worker has been successfully Added", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000,
            });
            reset();
    
            nav(-1);
          } else {
            console.error(
              "worker was not Added, or the response is not in the expected format."
            );
          }
        } catch (error) {
          console.error("Error Added worker:", error);
        }
      };
    
      
    
      return (
        <AppBookForm>

    <Box
      component="form"
      onSubmit={handleSubmit(onSub)}
      noValidate
      sx={{
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column", 
        alignItems: "center",
        padding: "20px", 
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
        Add New Worker
      </Typography>

      <TextField
        {...register("fullName", { required: true })}
        label="fullName"
        error={!!errors.numberOfGuests}
        helperText={errors.fullName ? "This field is required" : ""}
        sx={{ width: 250, marginBottom: "20px" }}
      />
      <TextField
        {...register("role", { required: true })}
        label= "role"
        error={!!errors.role}
        helperText={errors.role ? "This field is required" : ""}
        sx={{ width: 250, marginBottom: "20px" }}
      />

      <TextField
        label="contactEmail"
        margin="normal"
        {...register("contactEmail", { required: true })}
        error={!!errors.contactEmail}
        helperText={errors.contactEmail ? "This field is required" : ""}
        sx={{ width: 250, marginBottom: "20px" }}
      />
      <TextField
        label= "phoneNumber"
        margin="normal"
        {...register("phoneNumber", { required: true })}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber ? "This field is required" : ""}
        sx={{ width: 250, marginBottom: "20px" }}
      />
      <TextField
        label= "salary"
        margin="normal"
        {...register("salary", { required: true })}
        error={!!errors.salary}
        helperText={errors.salary ? "This field is required" : ""}
        sx={{ width: 250, marginBottom: "20px" }}
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
        Add Worker
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