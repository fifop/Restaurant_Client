import * as React from "react";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBookForm from "./AppBookForm";
import { API_URL, doApiMethod,doApiGet } from "../../../../services/apiServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function EditBookTable() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const [event,setEvent] = useState({});

  const nav = useNavigate();



  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      const id = params.id;
      const url = `${API_URL}/events/single/${id}`;
      const resp = await doApiGet(url);
      setEvent(resp)
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const onSub = async (bodyData) => {
    console.log(bodyData);
    try {
      const id = params.id
      const url = `${API_URL}/events/${id}`;

      const resp = await doApiMethod(url, "PUT", bodyData);
      console.log("Response object:", resp);

      if(resp.modifiedCount){
        toast.success("The Event has been successfully updated", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        reset();

        nav(-1);
      } else {
        console.error(
          "Event was not updated, or the response is not in the expected format."
        );
      }
    } catch (error) {
      console.error("Error update Event:", error);
    }
  };

  

  return (
    <Box
      id="book-section"
      component="form"
      onSubmit={handleSubmit(onSub)}
      noValidate
      sx={{
        backgroundColor: "#ccc495",
        borderRadius: "8px",
      }}
    >
      <AppBookForm
        sx={{ p: { xs: 2, sm: 3, md: 10 }, backgroundColor: "#ccc495" }}
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
          {" "}
          Edit Table
        </Typography>

        <TextField
          {...register("eventName", { required: true })}
          placeholder={event.eventName}
          error={!!errors.eventName}
          helperText={errors.eventName ? "This field is required" : ""}
          InputLabelProps={{
            shrink: true, 
            htmlFor: "eventName",
        }}
        label="EventName"
          sx={{ width: 250, marginBottom: "20px" }}
        />
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <Controller
    name="eventDate"
    control={control}
    defaultValue={null}
    render={({ field: { onChange, value } }) => (
      <DatePicker
        value={value}
        onChange={onChange}
        placeholder={event.eventDate}
        TextFieldComponent={TextField} // Use TextField for rendering
        inputFormat="dd/MM/yyyy" // Customize the date format as needed
        renderInput={(params) => <TextField {...params} variant="outlined" label="EventDate" />}
      />
    )}
  />
</LocalizationProvider>


        <TextField
            placeholder={event.numberOfGuests}
            margin="normal"
          {...register("numberOfGuests", { required: true })}
          error={!!errors.numberOfGuests}
          helperText={errors.numberOfGuests ? "This field is required" : ""}
          InputLabelProps={{
            shrink: true, 
            htmlFor: "numberOfGuests",
        }}
        label="NumberOfGuests"
          
          sx={{ width: 250 }}
        />

        <TextField
 placeholder={event.description}
           margin="normal"
          multiline
          rows={4}
          {...register("description")}
          InputLabelProps={{
            shrink: true, 
            htmlFor: "Description",
        }}
        label="Description"
          sx={{ width: 250 }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
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
          Update Event
        </Button>
        <Button onClick={()=> nav(-1)}
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
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

        </AppBookForm>
    </Box>
  );
}
