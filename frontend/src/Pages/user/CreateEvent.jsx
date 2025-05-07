import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        duration: '',
        date: '',
        organizedBy: '',
        description: '',
        location: '',
        capacity: '',
        tags: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const tagsArray = formData.tags.split(',').map(tag => tag.trim());
            console.log(formData);

            const response = await axios.post(
                `${apiUrl}/api/events`,
                {
                    ...formData,
                    tags: tagsArray,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Event created successfully');
            setFormData({
                title: '',
                name: '',
                duration: '',
                date: '',
                organizedBy: '',
                description: '',
                location: '',
                capacity: '',
                tags: '',
            });
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Failed to create event');
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required className="w-full border p-2 rounded" />
                <input type="text" name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
                <input type="text" name="duration" placeholder="Duration (e.g. 3 hours)" value={formData.duration} onChange={handleChange} required className="w-full border p-2 rounded" />
                <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required className="w-full border p-2 rounded" />
                <input type="text" name="organizedBy" placeholder="Organized By" value={formData.organizedBy} onChange={handleChange} required className="w-full border p-2 rounded" />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded" />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="text" name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} className="w-full border p-2 rounded" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
