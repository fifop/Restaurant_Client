import React, { useState, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBookForm from './AppBookForm';
import { API_URL,doApiMethod } from '../../../../services/apiServices';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EventsList2 from './EventsList2';

function BookTable() {

    const {control, register, handleSubmit,reset, formState: { errors } } = useForm();
    
    const handleScrollToEvents = () => {
        const eventsListElement = document.getElementById('events-list');
        if (eventsListElement) {
          eventsListElement.scrollIntoView({ behavior: 'smooth' ,
        block: "end"});
        }
      };

    
const nav = useNavigate();
    const onSub = async(bodyData) => {
        console.log(bodyData)
        try {
              const url = API_URL+ "/events";
              const resp = await doApiMethod(url, "POST", bodyData);
              console.log('Response object:', resp);
    
              
           
            if(resp &&resp._id){
              toast.success("The Event has been successfully added", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000
              });
              reset();

           nav("/")
            }
            else {
                console.error("Event was not created, or the response is not in the expected format.");
            }
          } catch (error) {
            console.error("Error add Event:", error);
        
        
        
            }
      }

      const [showEventsList, setShowEventsList] = useState(false);

      const toggleEventsList = () => {
          setShowEventsList(!showEventsList);
      };
    

    return (
        <section id="book-section" name="book-section">

        <Box 
        component="form"
        onSubmit={handleSubmit(onSub)}
        noValidate
        sx={{ 
          backgroundColor: '#ccc495', 
          borderRadius: '8px', 
        }}
      >   

<AppBookForm sx={{ p: { xs: 2, sm: 3, md: 10,} ,  backgroundColor: '#ccc495', 
}}>

<Typography sx={{
          color: "",
          fontSize: "36px",
          fontWeight: "bold",
          fontFamily: "cursive",
          textAlign: "center",
          alignContent: "center",
          marginBottom:"20px"
        }} variant="h2" align="center">                Book a Table
            </Typography>

            <TextField
                label="Event Name"
                {...register("eventName", { required: true })}
                error={!!errors.numberOfGuests}
                helperText={errors.numberOfGuests ? "This field is required" : ""}
                sx={{ width: 250 ,marginBottom: "20px"}}
            />
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <Controller
    name="eventDate"
    control={control}
    defaultValue={null} // Ensure consistent default value
    render={({ field: { onChange, value } }) => (
      <DatePicker
        label="Event Date" // Add a label for the DatePicker
        value={value} // Controlled by the Controller
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    )}
  />
</LocalizationProvider>

            <TextField
                label="Number of Guests"
                margin="normal"
                {...register("numberOfGuests", { required: true })}
                error={!!errors.numberOfGuests}
                helperText={errors.numberOfGuests ? "This field is required" : ""}
                sx={{ width: 250 }}
            />

            <TextField
                label="description"
                margin="normal"
                multiline
                rows={4}
                {...register("description")}
                sx={{ width: 250 }}
            />

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, width: 250,
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
             }, }}>

                Book Now
            </Button>
            <Button onClick={()=>{
                 handleScrollToEvents()
                toggleEventsList();
            }}

                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    width: 250,
                    backgroundColor: "#319aa0",
                    borderRadius: '50px',
                    color: "white",
                    fontWeight: "bold",
                    fontFamily: "cursive",
                    paddingRight: "30px",
                    paddingLeft: "30px",
                    fontSize: "14px",
                    marginTop: '20px',
                    "&:hover": {
                        backgroundColor: "#d9a6ab",
                    },
                }}
            >
                Our Events
            </Button>
            
        {showEventsList && <Box sx={{marginTop:"50PX",}} ><EventsList2/></Box>}
        <Box id="events-list" sx={{marginTop:"50PX",}} ></Box>

        </AppBookForm>  

        </Box>
        </section>

    );
}

export default BookTable;
