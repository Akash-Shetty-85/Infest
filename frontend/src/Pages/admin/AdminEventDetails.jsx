import React, { useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';  // <-- Import delete icon
import axios from 'axios';

const AdminEventDetails = () => {
    const { id } = useParams();
    const [events, setEvents] = useOutletContext();
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    const eventIndex = events.findIndex(e => e._id === id);
    const event = events[eventIndex];

    if (!event) return <div className="p-4 text-red-500">Event not found</div>;

    const handleStatusChange = async (newStatus) => {
        const oldStatus = event.status;
        const updatedEvent = { ...event, status: newStatus };
        const updatedEvents = [...events];
        updatedEvents[eventIndex] = updatedEvent;

        setEvents(updatedEvents);
        setStatus(newStatus);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("You must be logged in.");
                setStatus(oldStatus);
                setEvents(events);
                return;
            }

            await axios.patch(
                `http://localhost:3000/api/events/admin/event/${id}/status`,
                { status: newStatus },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        } catch (error) {
            console.error("Status update failed:", error);
            if (error.response) {
                console.error("Server response:", error.response.data);
            } else if (error.request) {
                console.error("No response from server:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
            alert("Failed to update status. Please try again.");
            // rollback UI
            setStatus(oldStatus);
            setEvents(events);
        }
    };


    const handleDeleteEvent = async () => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to delete events.");
                return;
            }

            await axios.delete(`http://localhost:3000/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Event deleted successfully!");
            // Remove from UI, or redirect etc.

            const updatedEvents = events.filter(e => e._id !== id);
            setEvents(updatedEvents);
            navigate('/admin/events');
        } catch (error) {
            console.error("Failed to delete event:", error);
            alert("Failed to delete event. Try again.");
        }
    };

    const currentStatus = status || event.status;

    return (
        <div className="p-6 bg-white shadow-md rounded-xl max-w-3xl mx-auto relative">
            {/* Delete button with trash icon in top-right corner */}
            <button
                onClick={handleDeleteEvent}
                aria-label="Delete event"
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                title="Delete Event"
            >
                <Trash2 size={24} />
            </button>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/events">Admin</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>Events</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>{event._id}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-3xl font-bold mb-2 text-pink-700">
                {event.name || event.title}
            </h1>
            <p className="text-gray-500 text-sm mb-4">
                {new Date(event.date).toLocaleString()}
            </p>

            <p className="text-gray-800 mb-2">
                <strong>Description:</strong> {event.description}
            </p>
            <p className="text-gray-800 mb-2">
                <strong>Organized By:</strong> {event.organizedBy}
            </p>
            <p className="text-gray-800 mb-2">
                <strong>Location:</strong> {event.location}
            </p>

            <p className="text-gray-800 mb-4">
                <strong>Status:</strong>
                <span className={`ml-2 px-2 py-1 rounded-full text-white text-sm font-medium ${currentStatus === 'accepted' ? 'bg-green-600' :
                    currentStatus === 'rejected' ? 'bg-red-600' :
                        'bg-yellow-500'
                    }`}>
                    {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                </span>
            </p>

            {currentStatus === 'pending' && (
                <div className="mt-4 flex gap-3">
                    <Button
                        variant="default"
                        onClick={() => handleStatusChange('accepted')}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Accept
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleStatusChange('rejected')}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Reject
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AdminEventDetails;
