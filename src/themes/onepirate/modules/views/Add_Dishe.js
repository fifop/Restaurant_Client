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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";



export default function AddDish() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const nav = useNavigate();
    const categoryOptions = ["starter", "main course", "dessert", "beverage"];

    const onSub = async (bodyData) => {
        try {
            console.log("Submitting data:", bodyData);
    
            // Upload the image if present
            let imageUrl = "";
            if (bodyData.image[0]) {
                const formData = new FormData();
                formData.append("dishImage", bodyData.image[0]);
                console.log("Uploading image...");
    
                let imageResp = await doApiMethod(`${API_URL}/dishes/upload-dish-image`, "POST", formData);
                console.log("Image Upload Response:", imageResp);
    
                imageUrl = imageResp.imageUrl;
            } else {
                toast.info("No image to upload");
            }
    
            // Submit dish details including image URL
            let dishDetails = { ...bodyData, imageUrl };
            delete dishDetails.image; // Remove image from dish details
            console.log("Submitting dish details:", dishDetails);
    
            dishDetails.imageUrl = API_URL + dishDetails.imageUrl;
    
            let resp = await doApiMethod(`${API_URL}/dishes`, "POST", dishDetails);
            console.log("Dish Details Response:", resp);
    
            if (resp && resp._id) {
                toast.success("Dish successfully added");
                reset();
                nav(-1);
            } else {
                toast.error("Failed to add dish");
            }
        } catch (error) {
            console.error("Error in adding dish:", error);
            toast.error("Error adding dish");
        }
    };

    return (
        <AppBookForm>
            <Box component="form" onSubmit={handleSubmit(onSub)} noValidate>
                <Typography variant="h2" align="center" sx={{
                    color: "",
                    fontSize: "36px",
                    fontWeight: "bold",
                    fontFamily: "cursive",
                    textAlign: "center",
                    alignContent: "center",
                    marginBottom: "20px",
                }}>Add New Dish</Typography>

                <TextField
                    label="Dish Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("name", { required: true })}
                    error={!!errors.name}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("description", { required: true })}
                    error={!!errors.description}
                />
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel htmlFor="category">Category</InputLabel>


                    <Select
  label="Category"
  {...register("category", { required: true })}
  error={!!errors.category}
  inputProps={{
    id: "category",
  }}
  value={""} // Initialize the value with an empty string
  onChange={(e) => {
    // Handle the value change if needed
  }}
>
  {categoryOptions.map((option) => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ))}
</Select>

                </FormControl>
                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    {...register("price", { required: true })}
                    error={!!errors.price}
                />
                {/* File input for image upload */}
                <div style={{ fontFamily: 'cursive', fontSize: '16px', color: '#333', marginBottom: '10px' }}>
                    <label htmlFor="image-upload" style={{ marginRight: '10px', fontWeight: 'bold' }}>
                        Upload Dish Image:
                    </label>
                    <input type="file" id="image-upload" {...register("image")} style={{ fontFamily: 'cursive', fontSize: '16px' }} />
                </div>

                <Button sx={{
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
                }} type="submit" variant="contained">Add Dish</Button>
                <Button sx={{
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
                }} onClick={() => nav(-1)} variant="contained">Go Back</Button>
            </Box>
        </AppBookForm>
    );
}