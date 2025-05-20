import React, { useState } from 'react';
import axios from 'axios';
import pImage from "../../assets/images/party.png";
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
  <div
    className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-8"
    style={{ backgroundImage: `url(${pImage})` }}
  >
    <div className="max-w-xl bg-black opacity-70 text-white p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-5 text-center text--500 drop-shadow-lg">
        CREATE EVENT
      </h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded- xl bg-transparent border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Event Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded bg-transparent border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                    type="text"
                    name="duration"
                    placeholder="Duration (e.g. 3 hours)"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded bg-transparent border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                    type="text"
                    name="organizedBy"
                    placeholder="Organized By"
                    value={formData.organizedBy}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded bg-transparent border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded bg-transparent border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-transparent border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-transparent border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated)"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-transparent border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-[#e6007a] text-white font-semibold rounded-md hover:bg-[#cc0066] hover:shadow-[0_0_20px_#e6007a80] transition duration-300"
                >
                    Create Event
                </button>
            </form>
        </div>
    </div>
);
};
export default CreateEvent;
