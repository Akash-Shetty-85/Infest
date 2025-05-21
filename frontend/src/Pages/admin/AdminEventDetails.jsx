import React, { useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';

const AdminEventDetails = () => {
    const { id } = useParams();
    const [events, setEvents] = useOutletContext();
    const [status, setStatus] = useState(null);

    const eventIndex = events.findIndex(e => e._id === id);
    const event = events[eventIndex];

    if (!event) return <div className="p-4 text-red-500">Event not found</div>;

    const handleStatusChange = (newStatus) => {
        const updatedEvent = { ...event, status: newStatus };
        const updatedEvents = [...events];
        updatedEvents[eventIndex] = updatedEvent;

        setEvents(updatedEvents);     // update parent context
        setStatus(newStatus);         // local UI update

        // Optionally: persist via API call here
        // await fetch(`/api/events/${id}/status`, {
        //     method: 'PATCH',
        //     body: JSON.stringify({ status: newStatus }),
        //     headers: { 'Content-Type': 'application/json' }
        // });
    };

    const currentStatus = status || event.status;

    return (
        <div className="p-4">
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

            <h1 className="text-2xl font-bold mb-2">{event.name || event.title}</h1>
            <p className="text-gray-500 text-sm mb-4">
                {new Date(event.date).toLocaleString()}
            </p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Organized By:</strong> {event.organizedBy}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Status:</strong>
                <span className={`ml-2 px-2 py-1 rounded text-white ${currentStatus === 'accepted' ? 'bg-green-500' :
                    currentStatus === 'rejected' ? 'bg-red-500' :
                        'bg-yellow-500'
                    }`}>
                    {currentStatus}
                </span>
            </p>

            {currentStatus === 'pending' && (
                <div className="mt-4 flex gap-2">
                    <Button variant="default" onClick={() => handleStatusChange('accepted')}>
                        Accept
                    </Button>
                    <Button variant="destructive" onClick={() => handleStatusChange('rejected')}>
                        Reject
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AdminEventDetails;
