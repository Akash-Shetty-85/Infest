
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const AdminCard = ({ event }) => {
    const navigate = useNavigate();

    const getVariant = (status) => {
        switch (status) {
            case 'accepted':
                return 'outline'; 
            case 'pending':
                return 'default';
            case 'rejected':
                return 'destructive';
            default:
                return 'ghost';
        }
    };

    const handleClick = () => {
        navigate(`/admin/event/${event._id}`);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >


    <Card
  onClick={handleClick}
  className="cursor-pointer border rounded-xl p-4 bg-white shadow-lg  transition duration-300"
>
  <CardHeader>
    <CardTitle className="text-[#e6007a]">{event.title || event.name}</CardTitle>
    <CardDescription className="text-black">{event.organizedBy}</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-black text-sm">{new Date(event.date).toLocaleString()}</p>
    <p className="text-black text-sm">Location: {event.location}</p>
  </CardContent>
  <CardFooter>
    <Button variant={getVariant(event.status)} className="capitalize pointer-events-none">
      {event.status}
    </Button>
  </CardFooter>
</Card>

        </motion.div>
    );
};

export default AdminCard;
