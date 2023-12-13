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
import { log } from "util";

export default function EditUsers() {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const params = useParams();
      const [user,setUser] = useState({});
    
      const nav = useNavigate();
    
    
    
      useEffect(() => {
        fetchData();
      }, [params.id]);
    
      const fetchData = async () => {
        try {
          const id = params.id;
          const url = `${API_URL}/users/single/${id}`;
          const resp = await doApiGet(url);
          setUser(resp)
          console.log(resp);
        } catch (error) {
          console.log(error);
        }
      };
      const onSub = async (bodyData) => {
        console.log(bodyData);
        try {
          const id = params.id
      
          const url = `${API_URL}/users/updateUser/${id}`;

   const resp = await doApiMethod(url, "PUT", bodyData);
          console.log("Response object:", resp);
    
          if(resp.modifiedCount){
            toast.success("The worker has been successfully updated", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000,
            });
            reset();
    
            nav(-1);
          } else {
            console.error(
              "worker was not updated, or the response is not in the expected format."
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
        Edit User
      </Typography>

      <TextField
        {...register("name", { required: true })}
        placeholder={user.name}
        error={!!errors.name}
        InputLabelProps={{
          shrink: true, 
          htmlFor: "Name",
      }}
      label="Name"
        helperText={errors.name ? "This field is required" : ""}
        sx={{ width: 250, marginBottom: "20px" }}
      />
      <TextField
        {...register("role", { required: true })}
        placeholder={user.role}
        error={!!errors.role}
        helperText={errors.role ? "This field is required" : ""}
        InputLabelProps={{
          shrink: true, 
          htmlFor: "role",
      }}
      label="role"
        sx={{ width: 250, marginBottom: "20px" }}
      />

      <TextField
        placeholder={user.email}
        margin="normal"
        {...register("email", { required: true })}
        error={!!errors.email}
        helperText={errors.email ? "This field is required" : ""}
        InputLabelProps={{
          shrink: true, 
          htmlFor: "email",
      }}
      label="email"
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