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

const AdminCard = ({ event }) => {
    const navigate = useNavigate();

    // Determine button variant based on status
    const getVariant = (status) => {
        switch (status) {
            case 'accepted':
                return 'outline';      // You could define a green variant in CVA if needed
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
        <Card
            onClick={handleClick}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
        >
            <CardHeader>
                <CardTitle>{event.title || event.name}</CardTitle>
                <CardDescription>{event.organizedBy}</CardDescription>
            </CardHeader>
            <CardContent>
                {/* <p>{event.description}</p> */}
                <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleString()}</p>
                <p className="text-sm">Location: {event.location}</p>
            </CardContent>
            <CardFooter>
                <Button variant={getVariant(event.status)} className="capitalize pointer-events-none">
                    {event.status}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AdminCard;
