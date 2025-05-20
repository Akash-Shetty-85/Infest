import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);

    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId'); // get userId from localStorage
            console.log('userId:', userId);
            setCurrentUserId(userId);

            const response = await axios.get(`http://localhost:3000/api/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Event details:', response.data);
            setEvent(response.data);
        } catch (error) {
            console.error('Failed to fetch event details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventDetails();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Event deleted successfully!');
            navigate('/event/my-events');
        } catch (error) {
            console.error('Failed to delete event:', error);
            alert('Error deleting event.');
        }
    };

    const handleEdit = () => {
        navigate(`/event/edit/${id}`);
    };

    const handleRegister = () => {
        alert('You have registered for the event!');
        // Add registration logic here (API call, etc.)
    };

    if (loading) return <p className="p-4">Loading event details...</p>;
    if (!event) return <p className="p-4 text-red-600">Event not found.</p>;

    // Compare current userId to event.creator (either directly or from nested _id)
    const isCreator = event.createdBy === currentUserId || event.creator?._id === currentUserId;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl">
            <h1 className="text-3xl font-bold mb-4 text-pink-700">{event.name}</h1>
            <p className="text-gray-700"><strong>Duration:</strong> {event.duration}</p>
            <p className="text-gray-700"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p className="text-gray-700"><strong>Description:</strong> {event.description}</p>
            <p className="text-gray-700"><strong>Status:</strong> {event.status}</p>

            <div className="mt-6 flex space-x-4">
                {isCreator ? (
                    <>
                        <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Delete
                        </button>
                    </>
                ) : (
                    <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Register
                    </button>
                )}
            </div>
        </div>
    );
};

export default EventDetails;
