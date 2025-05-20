import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Home, List, Users, BarChart2, Clock } from "lucide-react";

export function AppSidebar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Sidebar>
            <SidebarHeader>
                <h2 className="text-xl font-bold p-4">Admin Panel</h2>
            </SidebarHeader>

            <SidebarContent>
                {/* <SidebarGroup label="Main">
                    <Link
                        to="/admin"
                        className={`block px-4 py-2 hover:bg-gray-200 ${isActive("/admin") ? "bg-gray-300 font-semibold" : ""
                            }`}
                    >
                        <Home className="inline-block mr-2" />
                        Dashboard
                    </Link>
                </SidebarGroup> */}

                <SidebarGroup label="Events">
                    <Link
                        to="/admin/events"
                        className={`block px-4 py-2 hover:bg-gray-200 ${isActive("/admin/events") ? "bg-gray-300 font-semibold" : ""
                            }`}
                    >
                        <List className="inline-block mr-2" />
                        All Events
                    </Link>
                    <Link
                        to="/admin/events/pending"
                        className={`block px-4 py-2 hover:bg-gray-200 ${isActive("/admin/events/pending") ? "bg-gray-300 font-semibold" : ""
                            }`}
                    >
                        <Clock className="inline-block mr-2" />
                        Pending Events
                    </Link>
                    <Link
                        to="/admin/events/accepted"
                        className={`block px-4 py-2 hover:bg-gray-200 ${isActive("/admin/events/accepted") ? "bg-gray-300 font-semibold" : ""
                            }`}
                    >
                        <List className="inline-block mr-2" />
                        Accepted Events
                    </Link>
                </SidebarGroup>

                {/* <SidebarGroup label="Manage">
                    <Link
                        to="/admin/users"
                        className={`block px-4 py-2 hover:bg-gray-200 ${isActive("/admin/users") ? "bg-gray-300 font-semibold" : ""
                            }`}
                    >
                        <Users className="inline-block mr-2" />
                        Users
                    </Link>
                    <Link
                        to="/admin/reports"
                        className={`block px-4 py-2 hover:bg-gray-200 ${isActive("/admin/reports") ? "bg-gray-300 font-semibold" : ""
                            }`}
                    >
                        <BarChart2 className="inline-block mr-2" />
                        Reports
                    </Link>
                </SidebarGroup> */}
            </SidebarContent>

            <SidebarFooter>
                <div className="text-center text-sm text-gray-500 p-4">
                    © {new Date().getFullYear()} Admin Dashboard
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
