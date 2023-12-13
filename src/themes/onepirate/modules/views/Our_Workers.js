import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useSearchParams } from 'react-router-dom';
import Button from "@mui/material/Button";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Paper, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL, doApiGet, doApiMethod } from '../../../../services/apiServices';
import './Our_Workers.css';
import AppAppBarForm from './AppAppBarForm';
import AppFooter from './AppFooter';
import Box from '@mui/material/Box';
import PagesBtns from '../components/PagesBtns';
import { toast } from "react-toastify";

const WorkerDetailsModal = ({ worker, onClose, onEdit, onDelete }) => {
    if (!worker) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="event-modal">
                <Typography variant="h6">{worker.fullName}</Typography>
                <Typography>Email: {worker.contactEmail}</Typography>
                <Typography>Phone: {worker.phoneNumber}</Typography>
                <Typography>Salary: {worker.salary}</Typography>
                <IconButton onClick={() => onEdit(worker._id)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(worker._id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={onClose}>
                    Close
                </IconButton>
            </div>
        </div>
    );
};

export default function Our_Workers() {
    const [workers, setWorkers] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [query] = useSearchParams();


    const fetchWorkers = async () => {
        try {
            const pageNumber = query.get("page") || 1;

            const url =`${API_URL}/workers/workersList?page=${pageNumber}`
            const resp = await doApiGet(url);
            setWorkers(resp);
        } catch (error) {
            console.error('Failed to fetch workers', error);
        }
    };

    useEffect(() => {
        fetchWorkers();
    }, [query]);
    const navigate = useNavigate();

    const handleWorkerClick = (worker) => {
        setSelectedWorker(worker);
    };

    const handleEditWorker = (workerId) => {
        navigate(`/workers/${workerId}`);
    };

    const handleDeleteWorker = async (workerId) => {
        if (window.confirm('Are you sure you want to delete this worker?')) {
          try {
            await doApiMethod(`${API_URL}/workers/${workerId}`, 'DELETE');
            setSelectedWorker(null); // סגור את המודל

            navigate('/workers'); // מעבר לרשימת העובדים לאחר מחיקה הצלחת
            fetchWorkers();
            toast.success('Worker deleted successfully.');
          } catch (error) {
            console.error("Error deleting worker:", error);
            toast.error('Failed to delete worker.');
          }
        }
      };

    return (
        <div className="workers-page">
<Grid container spacing={2}>
  <Grid item xs={12}>
  <div className="app-bar-form-container">

    <AppAppBarForm />
    </div>
  </Grid>
  <Grid item xs={12}>
            <Paper className="worker-list"
                sx={{
                    margin: 0,
                    padding: '20px',
                    borderRadius: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    maxWidth: '100%',
                }}
            >
                <Button
                    sx={{
                        backgroundColor: "#319aa0",
                        borderRadius: "20px",
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "cursive",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        fontSize: "14px",
                        "&:hover": {
                            backgroundColor: "#d9a6ab",
                            
                        },
                        mr: 1,
                    }}
                    className="add-worker-button"
                    onClick={() => {
                        navigate("/addWorkers");
                    }}
                >
                    ADD  +
                </Button>
                <Typography variant="h4" sx={{
                    color: "#319aa0", fontWeight: "bold", fontFamily: "cursive",
                    textAlign: "center", marginBottom: '20px'
                }}>
                    Our Workers
                </Typography>
                <List sx={{ bgcolor: 'transparent', padding: 0 }}>
                    {workers.map((worker) => (
                        <ListItem key={worker._id} sx={{
                            borderBottom: '1px solid #eee',
                            padding: '10px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                borderRadius: "20px",

                            },
                        }} onClick={() => handleWorkerClick(worker)}>
                            <ListItemAvatar>
                                <Avatar alt={worker.fullName} src={worker.imageUrl} sx={{ width: 56, height: 56 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={worker.fullName}
                                secondary={
                                    <React.Fragment>
                                        <Typography variant="body2" component="span" color="textPrimary">
                                            {worker.role}
                                        </Typography>
                                        <br />
                                        {worker.contactEmail}
                                        <br />
                                        {worker.phoneNumber}
                                        <br />
                                        {`Salary: ${worker.salary}`}
                                        <br />
                                        {`Date Joined: ${new Date(worker.dateJoined).toLocaleDateString()}`}
                                    </React.Fragment>
                                }
                            />
                            <div className="list-item-actions">
                                <IconButton onClick={() => handleEditWorker(worker._id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteWorker(worker._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </ListItem>
                    ))}
                </List>
                {selectedWorker && (
                    <WorkerDetailsModal
                        worker={selectedWorker}
                        onClose={() => setSelectedWorker(null)}
                        onEdit={handleEditWorker}
                        onDelete={handleDeleteWorker}
                    />
                )}
               <PagesBtns apiUrl={API_URL+"/workers/count"} linkTo={"/workers?page="}/>

            </Paper>
            </Grid>
</Grid>
            <AppFooter />
        </div>
    );
}
