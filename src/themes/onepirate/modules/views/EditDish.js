import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBookForm from "./AppBookForm";
import { API_URL, doApiMethod,doApiGet } from "../../../../services/apiServices";
import { Link, useNavigate,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";


export default function EditDish() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const nav = useNavigate();
    const params = useParams();
    const [dish,setDish] = useState({});
    const categoryOptions = ["starter", "main course", "dessert", "beverage"];


    useEffect(() => {
        fetchData();
      }, [params.id]);
    
      const fetchData = async () => {
        try {
          const id = params.id;
          const url = `${API_URL}/dishes/single/${id}`;
          const resp = await doApiGet(url);
          setDish(resp)
          console.log(resp);
        } catch (error) {
          console.log(error);
        }
      };

      

    const onSub = async (bodyData) => {
        try {
            
            console.log("Submitting data:", bodyData);
             console.log(bodyData.image);
            // Upload the image if present
            let imageUrl = "";
            if (bodyData.image && bodyData.image.length > 0){
                const formData = new FormData();
                formData.append("dishImage", bodyData.image[0]);
                console.log("Uploading image...");
    
                let imageResp = await doApiMethod(`${API_URL}/dishes/upload-dish-image`, "POST", formData);
                console.log("Image Upload Response:", imageResp);
    
                imageUrl = imageResp.imageUrl;
                if (imageUrl && !imageUrl.startsWith('http')) {
                    imageUrl = API_URL + imageUrl;
                    console.log(imageUrl);

                }
                
            } else {
                toast.info("No image to upload");
            }
    
            // Submit dish details including image URL
            let dishDetails = { ...bodyData, imageUrl };
            delete dishDetails.image; // Remove image from dish details
            console.log("Submitting dish details:", dishDetails);

            // dishDetails.imageUrl = API_URL + dishDetails.imageUrl;
            dishDetails.category  = dishDetails.category.toLowerCase();

            const __id = params.id;

            let resp = await doApiMethod(`${API_URL}/dishes/${__id}`, "PUT", dishDetails);
            console.log("Dish Details Response:", resp);
    
            if(resp.modifiedCount){
                toast.success("The dish has been successfully updated", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 5000,
                });
                reset();
        
                nav(-1);
              } else {
                console.error(
                  "dish was not updated, or the response is not in the expected format."
                );
              }
            } catch (error) {
              console.error("Error update dish:", error);
            }
          };
    
    
    
    
    return (
        <AppBookForm>
            <Box component="form" onSubmit={handleSubmit(onSub)} noValidate sx={{ /* styling here */ }}>
                <Typography variant="h2" align="center"    sx={{
          color: "",
          fontSize: "36px",
          fontWeight: "bold",
          fontFamily: "cursive",
          textAlign: "center",
          alignContent: "center",
          marginBottom: "20px",
        }}
                > Edit Dish</Typography>

                <TextField
                    // label="Dish Name"
                    placeholder={dish.name}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("name", { required: true })}
                    error={!!errors.name}
                    InputLabelProps={{
                        shrink: true, 
                        htmlFor: "Name",
                    }}
                    label="Name"

                />
                <TextField
                    // label="Description"
                    placeholder={dish.description}

                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("description", { required: true })}
                    error={!!errors.description}
                    InputLabelProps={{
                        shrink: true, 
                        htmlFor: "description",
                    }}
                    label="Description"
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
    value={dish.category}
    onChange={(e) => {
      setDish({ ...dish, category: e.target.value });
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
                 sx ={{marginBottom: "20px"}}
                 placeholder={dish.price}

                    // label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    {...register("price", { required: true })}
                    error={!!errors.price}
                    InputLabelProps={{
                        shrink: true, 
                        htmlFor: "Price",
                    }}
                    label="Price"
                />
    {/* File input for image upload */}
    <div style={{ fontFamily: 'cursive', fontSize: '16px', color: '#333', marginBottom: '10px' }}>
    <label htmlFor="image-upload" style={{ marginRight: '10px', fontWeight: 'bold' }}>
        Upload Dish Image:
    </label>
    <input type="file" id="image-upload" {...register("image")} style={{ fontFamily: 'cursive', fontSize: '16px' }} />
</div>
<Button
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
  type="submit"
  variant="contained"
>
  Update Dish
</Button>

                <Button   sx={{
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
