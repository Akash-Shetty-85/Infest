import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminLayout() {

    const [events, setEvents] = useState([])

    useEffect(() => {
        const data = [
            // Paste your `allEvents` data array here

            {
                "status": "pending",
                "_id": "6819b823202bea73f882dd60",
                "name": "Reva Events",
                "duration": "5 hours",
                "date": "2025-06-20T10:00:00.000Z",
                "organizedBy": "InFest Club",
                "description": "Annual technology summit with keynote speakers.",
                "location": "Main Hall",
                "capacity": 200,
                "tags": [
                    "tech",
                    "conference"
                ],
                "createdBy": "6819b6a895eda91f30855883",
                "registeredUsers": [],
                "createdAt": "2025-05-06T07:20:03.053Z",
                "__v": 0
            },
            {
                "status": "pending",
                "_id": "6819ba4b51ca34d87fdf1a0c",
                "name": "Reva Events 1",
                "duration": "5 hours",
                "date": "2025-06-20T10:00:00.000Z",
                "organizedBy": "InFest Club",
                "description": "Annual technology summit with keynote speakers.",
                "location": "Main Hall",
                "capacity": 200,
                "tags": [
                    "tech",
                    "conference"
                ],
                "createdBy": "6819b6a895eda91f30855883",
                "registeredUsers": [],
                "createdAt": "2025-05-06T07:29:15.035Z",
                "__v": 0
            },
            {
                "status": "pending",
                "_id": "6819bb3f2d8fcc0b052adf37",
                "name": "Reva Events 2",
                "duration": "5 hours",
                "date": "2025-06-20T10:00:00.000Z",
                "organizedBy": "InFest Club",
                "description": "Annual technology summit with keynote speakers.",
                "location": "Main Hall",
                "capacity": 200,
                "tags": [
                    "tech",
                    "conference"
                ],
                "createdBy": "6819b6a895eda91f30855883",
                "registeredUsers": [],
                "createdAt": "2025-05-06T07:33:19.057Z",
                "__v": 0
            },
            {
                "_id": "681b29e0b31ea716bc181f49",
                "name": "CsA",
                "title": "coading",
                "duration": "2",
                "date": "2025-05-23T10:00:00.000Z",
                "organizedBy": "Akash",
                "description": "nkfen",
                "location": "reva",
                "capacity": 16,
                "tags": [
                    "nothing"
                ],
                "createdBy": "6819b6a895eda91f30855883",
                "registeredUsers": [],
                "status": "accepted",
                "createdAt": "2025-05-07T09:37:36.802Z",
                "__v": 0
            },
            {
                "_id": "682ad6a282171d7378916a30",
                "name": "Khel Khoj",
                "title": "Fun",
                "duration": "3 hours",
                "date": "2025-05-20T04:30:00.000Z",
                "organizedBy": "MCA",
                "description": "fun and engaging event",
                "location": "Bangalore",
                "capacity": 100,
                "tags": [
                    "#khelkhoj"
                ],
                "createdBy": "682758a541f8bdbbda81a894",
                "registeredUsers": [],
                "status": "accepted",
                "createdAt": "2025-05-19T06:58:42.790Z",
                "__v": 0
            },
            {
                "_id": "682b508d71e1ef319a31dd77",
                "name": "Fresher's Party",
                "title": "Party",
                "duration": "2 hours",
                "date": "2025-05-30T00:30:00.000Z",
                "organizedBy": "BCA",
                "description": "Welcoming new students",
                "location": "Rangastala",
                "capacity": 200,
                "tags": [
                    "#Freshersday"
                ],
                "createdBy": "682758a541f8bdbbda81a894",
                "registeredUsers": [],
                "status": "pending",
                "createdAt": "2025-05-19T15:38:53.198Z",
                "__v": 0
            },
            {
                "_id": "682b511871e1ef319a31dd7a",
                "name": "DJ night",
                "title": "Music",
                "duration": "5 Hours",
                "date": "2025-06-03T01:30:00.000Z",
                "organizedBy": "ECE",
                "description": "Live Concert",
                "location": "Sougandika",
                "capacity": 500,
                "tags": [
                    "#partyallnight"
                ],
                "createdBy": "682758a541f8bdbbda81a894",
                "registeredUsers": [],
                "status": "pending",
                "createdAt": "2025-05-19T15:41:12.503Z",
                "__v": 0
            },
            {
                "_id": "682b519571e1ef319a31dd7d",
                "name": "Dandiya Night",
                "title": "Cultural",
                "duration": "1 hour",
                "date": "2025-06-15T00:30:00.000Z",
                "organizedBy": "Campus",
                "description": "Showcasing Indian cultural dance ",
                "location": "PG Street",
                "capacity": 400,
                "tags": [
                    "#dandiya"
                ],
                "createdBy": "682758a541f8bdbbda81a894",
                "registeredUsers": [],
                "status": "accepted",
                "createdAt": "2025-05-19T15:43:17.102Z",
                "__v": 0
            },
            {
                "_id": "682c0328c865eddac7d2dc2f",
                "name": "hackathon",
                "title": "Shecodes",
                "duration": "2",
                "date": "2025-05-22T04:30:00.000Z",
                "organizedBy": "Akash",
                "description": "its execlusively for the women to showcase there skills in the codeing",
                "location": "reva",
                "capacity": 46,
                "tags": [
                    "codeing"
                ],
                "createdBy": "6818e879de481e8e66329678",
                "registeredUsers": [],
                "status": "accepted",
                "createdAt": "2025-05-20T04:20:56.502Z",
                "__v": 0
            }

        ]
        setEvents(data)
    }, [])
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-screen">
                <SidebarTrigger  className="size-9 cursor-pointer"/>
                <Outlet context={[events]} />
            </main>
        </SidebarProvider>
    );
}
