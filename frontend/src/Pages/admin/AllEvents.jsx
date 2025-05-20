import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminCard from '@/components/event.card.jsx';

const AllEvents = () => {
    const [events] = useOutletContext();
console.log(events);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {events.map((event) => (
                <AdminCard key={event._id} event={event} />
            ))}
        </div>
    );
};

export default AllEvents;
