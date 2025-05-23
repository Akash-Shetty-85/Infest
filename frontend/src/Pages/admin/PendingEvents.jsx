import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminCard from '@/components/event.card';

const PendingEvents = () => {
    const [events] = useOutletContext();
    const pendingEvents = events.filter(event => event.status === "pending");

    return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-4">
    {pendingEvents.map((event) => (
      <AdminCard key={event._id} event={event} />
    ))}
  </div>
);
};

export default PendingEvents;
