import React from 'react';

const EventCard = ({ event, onClick }) => {
    const { name, duration, date, status } = event;

    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const statusColor = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
    };

    return (
        <div className="border rounded-xl p-4 shadow hover:shadow-md transition bg-white cursor-pointer"
            onClick={onClick}
        >
            <h2 className="text-xl font-semibold text-blue-700">{name}</h2>
            <p className="text-gray-600 mt-1"><strong>Duration:</strong> {duration}</p>
            <p className="text-gray-600"><strong>Date:</strong> {formattedDate}</p>
            <span className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${statusColor[status] || 'bg-gray-100 text-gray-800'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        </div>
    );
};

export default EventCard;
