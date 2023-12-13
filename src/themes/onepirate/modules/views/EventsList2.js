import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // For clickable events
import { API_URL, doApiMethod, doApiGet ,doApiGetNoToken} from '../../../../services/apiServices';
import { useNavigate } from 'react-router-dom';
import EventModal from './EventModal';
import { toast } from "react-toastify";
import './EventList2.css'; // Ensure this is the correct path to your CSS file
import { useSelector, useDispatch } from "react-redux";



const EventList2 = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { userInfo, role } = useSelector((state) => state.auth);


  const fetchEvents = async () => {
    try {
        const resp = await doApiGetNoToken(`${API_URL}/events`);
        const formattedEvents = resp.map(event => ({
          title: event.eventName,
          start: new Date(event.eventDate),
          id: event._id,
          description: event.description,
        }));
        
        setEvents(formattedEvents);
        console.log(formattedEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
    }
};

  useEffect(() => {
   

    fetchEvents();
}, []);



  const handleEventClick = ({ event }) => {
    console.log("Event clicked:", event);
    console.log(event);
    setSelectedEvent({
        id: event.id,
        title: event.title,
        start: event.start,
        description: event.extendedProps.description,

    });
};


const handleEditEvent = (eventId) => {
  navigate(`/events/${eventId}`);
};

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
        try {
          const url =`${API_URL}/events/${eventId}`;

       const resp =     await doApiMethod(url, 'DELETE');
            if (resp.deletedCount == 1) {
              console.log(resp);
    
              toast.success("The item has been successfully deleted", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
              });
              fetchEvents()
              navigate("/")
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    }
};

  return (
    <div className="calendar-container">
    <FullCalendar 
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={handleEventClick}
      eventReceive={handleDeleteEvent}
      locale='he'  // Set locale to Hebrew

    />

    {userInfo && (<>

   
 {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}
     </> )}
    </div>
  );
};

export default EventList2;
