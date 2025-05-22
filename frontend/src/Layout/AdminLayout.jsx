import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLayout() {

    const [events, setEvents] = useState([])

   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/events/");
        console.log("data", response.data);
        setEvents(response.data.allEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);
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
