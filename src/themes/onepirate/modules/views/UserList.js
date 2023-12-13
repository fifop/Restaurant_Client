import React, { useState, useEffect } from 'react';
import { Link, useNavigate ,useSearchParams} from 'react-router-dom';
import Button from "@mui/material/Button";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Paper, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL, doApiGet, doApiMethod } from '../../../../services/apiServices';
import './Our_Users.css';
import AppAppBarForm from './AppAppBarForm';
import AppFooter from './AppFooter';
import PagesBtns from '../components/PagesBtns';
import { toast } from "react-toastify";


const UserDetailsModal = ({ user, onClose, onEdit, onDelete }) => {
    if (!user) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="user-modal">
                <Typography variant="h6">Name: {user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Role: {user.role}</Typography>
                <IconButton onClick={() => onEdit(user._id)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(user._id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={onClose}>
                    Close
                </IconButton>
            </div>
        </div>
    );
};

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [query] = useSearchParams();


    const fetchUsers = async () => {
        try {
            const pageNumber = query.get("page") || 1;

            const url = `${API_URL}/users/usersList?page=${pageNumber}`;
            const resp = await doApiGet(url);
            setUsers(resp);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [query]);

    const navigate = useNavigate();

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleEditUser = (userId) => {
        navigate(`/users/updateUser/${userId}`);
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
          try {
            await doApiMethod(`${API_URL}/users/${userId}`, 'DELETE');
            setSelectedUser(null); // סגור את המודל

            fetchUsers();
            toast.success('User deleted successfully.');
            navigate('/users'); // מעבר לרשימת המשתמשים לאחר מחיקה הצלחת
          } catch (error) {
            console.error("Error deleting user:", error);
            toast.error('Failed to delete user.');
          }
        }
      };

    return (
        <div className="users-page">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className="app-bar-form-container">
                        <AppAppBarForm />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Paper className="user-list"
                        sx={{
                            margin: 0,
                            padding: '20px',
                            borderRadius: '15px',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
                            className="add-user-button"
                            onClick={() => {
                                navigate("/users/addUsers");
                            }}
                        >
                            ADD  +
                        </Button>
                        <Typography variant="h4" sx={{
                            color: "#319aa0", fontWeight: "bold", fontFamily: "cursive",
                            textAlign: "center", marginBottom: '20px'
                        }}>
                            Our Users
                        </Typography>
                        <List sx={{ bgcolor: 'transparent', padding: 0 }}>
                            {users.map((user) => (
                                <ListItem key={user._id} sx={{
                                    borderBottom: '1px solid #eee',
                                    padding: '10px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        borderRadius: "20px",
                                    },
                                }} onClick={() => handleUserClick(user)}>
                                    <ListItemAvatar>
                                        <Avatar alt={user.name} src={user.imageUrl} sx={{ width: 56, height: 56 }} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography variant="body2" component="span" color="textPrimary">
                                                    {user.role}
                                                </Typography>
                                                <br />
                                                {user.email}
                                                <br />
                                            </React.Fragment>
                                        }
                                    />
                                    <div className="list-item-actions">
                                        <IconButton onClick={() => handleEditUser(user._id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteUser(user._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                        {selectedUser && (
                            <UserDetailsModal
                                user={selectedUser}
                                onClose={() => setSelectedUser(null)}
                                onEdit={handleEditUser}
                                onDelete={handleDeleteUser}
                            />
                        )}
                     <PagesBtns apiUrl={API_URL+"/users/count"} linkTo={"/users/usersList?page="}/>

                    </Paper>

                </Grid>
            </Grid>

            <AppFooter />
        </div>
    );
}
