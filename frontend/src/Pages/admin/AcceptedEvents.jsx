import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminCard from '@/components/event.card';

const AcceptedEvents = () => {
    const [events] = useOutletContext();
    const pendingEvents = events.filter(event => event.status === "accepted");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {pendingEvents.map((event) => (
                <AdminCard key={event._id} event={event} />
            ))}
        </div>
    );
};

export default AcceptedEvents;
