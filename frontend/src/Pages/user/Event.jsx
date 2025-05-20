import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventCard from '../../components/eventcard';


const Event = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/events');
            setEvents(Array.isArray(response.data.allEvents) ? response.data.allEvents : []);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleClick = (id) => {
        console.log(id);
        navigate(`/event/${id}`);
    };
    // Check if user is on the base /event route
    const isBaseRoute = location.pathname === '/event';

    return (
   <div className="min-h-screen w-full bg-[#0f0f0f] text-white p-5">
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-2xl font-bold">Events</h2>
    <section className="flex gap-4">
      <Link to="/event" className="cursor-pointer hover:text-[#e6007a] active:text-[#e6007a] transition">Events</Link>
      <Link to="/event/my-events" className="cursor-pointer hover:text-[#e6007a] active:text-[#e6007a] transition">My Events</Link>
      <Link to="/event/create-event" className="cursor-pointer hover:text-[#e6007a] active:text-[#e6007a] transition">Create Event</Link>
    </section>
  </div>


            {isBaseRoute ? (
                loading ? (
                    <p>Loading events...</p>
                ) : events.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    <div className="grid gap-12 sm:grid-cols-4 lg:grid-cols-4">
                        {events.map(event =>
                            event?._id && event.status === 'accepted' ? (
                                <EventCard key={event._id} event={event} onClick={() => handleClick(event._id)} />
                            ) : null
                        )}
                    </div>
                )
            ) : (
                <Outlet />
            )}
        </div>
    );
};

export default Event;
