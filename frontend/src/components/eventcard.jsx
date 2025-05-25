import React from 'react';

const EventCard = ({ event, onClick }) => {
    const { name, duration, date } = event;

    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div
            className="border rounded-xl p-4 shadow-lg hover:shadow-pink-300 transition duration-300 bg-black opacity-70 cursor-pointer"
            onClick={onClick}
        >
            {/* Title and info */}
            <h2 className="text-xl font-bold text-[#e6007a]">{name}</h2>
            <p className="text-white mt-1">
                <strong>Duration:</strong> {duration}
            </p>
            <p className="text-white">
                <strong>Date:</strong> {formattedDate}
            </p>

            {/* Register + More Info in same row */}
            <div className="flex justify-between items-center mt-3">
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#e6007a] text-white">
                    Register
                </span>
                <span className="text-sm font-medium text-white underline hover:opacity-80">
                    more info...
                </span>
            </div>
        </div>
    );
};

export default EventCard;
