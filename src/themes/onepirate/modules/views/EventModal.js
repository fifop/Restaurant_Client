import React from 'react'
import Button from '@mui/material/Button';
import "./EventModal.css"

export default function EventModal({ event, onClose, onEdit, onDelete }) {
    if (!event) return null;

    return (
        <>
 
            <div className="modal-backdrop" onClick={onClose}></div> {/* Backdrop to close the modal */}
  
        <div className="event-modal" >
            <h2 style={{ fontFamily: "cursive", color: '#319aa0' }}>{event.title}</h2>
            <p style={{ fontFamily: "cursive", marginBottom: '20px' }}>
  {event.start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
  <br />
  {event.description ? event.description: ''}
</p>
            <Button onClick={() => onEdit(event.id)} variant="contained" sx={{
                backgroundColor: "#319aa0",
                borderRadius: '50px',
                color: "white",
                fontWeight: "bold",
                fontFamily: "cursive",
                paddingRight: "30px",
                paddingLeft: "30px",
                fontSize: "14px",
                "&:hover": { backgroundColor: "#d9a6ab" },
                marginRight: '10px'
            }}>
                Edit
            </Button>
            <Button onClick={() => onDelete(event.id)} variant="contained" sx={{
                backgroundColor: "#319aa0",
                borderRadius: '50px',
                color: "white",
                fontWeight: "bold",
                fontFamily: "cursive",
                paddingRight: "30px",
                paddingLeft: "30px",
                fontSize: "14px",
                "&:hover": { backgroundColor: "#d9a6ab" },
            }}>
                Delete
            </Button>
            <div style={{ marginTop: '20px' }}>
                <Button onClick={onClose} variant="contained" sx={{
                    backgroundColor: "#319aa0",
                    borderRadius: '50px',
                    color: "white",
                    fontWeight: "bold",
                    fontFamily: "cursive",
                    paddingRight: "30px",
                    paddingLeft: "30px",
                    fontSize: "14px",
                    "&:hover": { backgroundColor: "#d9a6ab" },
                }}>
                    Close
                </Button>
            </div>
        </div>
        </>
  
    );
};

