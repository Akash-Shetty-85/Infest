import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            setCurrentUserId(userId);

            const response = await axios.get(`http://localhost:3000/api/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEvent(response.data);
            if (response.data?.registeredUsers?.includes(userId)) {
                setIsRegistered(true);
            }
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

    const handleRegister = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:3000/api/registerEvent/${id}/register`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('You have registered for the event!');
            setIsRegistered(true);
        } catch (error) {
            console.error('Failed to register for event:', error);
            alert('Error registering for event.');
        }
    };

    if (loading) return <p className="p-4 text-lg font-semibold">Loading event details...</p>;
    if (!event) return <p className="p-4 text-red-600 text-lg font-semibold">Event not found.</p>;

    const isCreator = event.createdBy === currentUserId || event.creator?._id === currentUserId;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-xl border border-gray-200">
            <h1 className="text-4xl font-bold mb-4 text-pink-700">{event.name}</h1>
            <div className="space-y-2 text-gray-700 text-lg">
                <p><strong>Title:</strong> {event.title}</p>
                <p><strong>Duration:</strong> {event.duration}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                <p><strong>Organized By:</strong> {event.organizedBy}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Location:</strong> {event.location || 'TBD'}</p>
                <p><strong>Status:</strong>
                    <span className={`ml-2 px-2 py-1 rounded text-white ${event.status === 'accepted' ? 'bg-green-600' : event.status === 'rejected' ? 'bg-red-600' : 'bg-yellow-500'}`}>
                        {event.status.toUpperCase()}
                    </span>
                </p>
                <p><strong>Tags:</strong> {event.tags?.join(', ') || 'None'}</p>
                <p><strong>Registered Users:</strong> {event.registeredUsers?.length || 0}</p>
            </div>

            <div className="mt-8 flex gap-4">
                {isCreator ? (
                    <>
                        <button
                            onClick={handleEdit}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </>
                ) : isRegistered ? (
                    <button
                        disabled
                        className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                    >
                        Registered
                    </button>
                ) : (
                    <button
                        onClick={handleRegister}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                )}
            </div>
        </div>
    );
};

export default EventDetails;
