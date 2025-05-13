
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  BookOpen, 
  Search, 
  Calendar, 
  UserRound, 
  BellRing, 
  Menu, 
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { userData } from "@/lib/data";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: SidebarProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <BookOpen className="h-5 w-5" /> },
    { path: "/search", label: "Search Books", icon: <Search className="h-5 w-5" /> },
    { path: "/borrowed", label: "Borrowed Books", icon: <BookOpen className="h-5 w-5" /> },
    { path: "/due-dates", label: "Due Dates", icon: <Calendar className="h-5 w-5" /> },
    { path: "/profile", label: "Profile", icon: <UserRound className="h-5 w-5" /> },
    { path: "/notifications", label: "Notifications", icon: <BellRing className="h-5 w-5" /> },
  ];

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm p-4 md:hidden flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-lg">Library MS</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
        >
          {isMobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Sidebar - Desktop always visible, mobile conditional */}
      <aside 
        className={cn(
          "bg-white w-64 shadow-md md:shadow-sm flex-shrink-0 border-r border-gray-200 transition-all duration-300 ease-in-out",
          "fixed md:sticky top-0 md:top-0 h-full md:h-screen z-40",
          isMobileNavOpen ? "left-0" : "-left-full md:left-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 hidden md:block">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-lg">Library MS</span>
            </div>
          </div>
          
          {/* User Info */}
          <div className="p-4 flex items-center space-x-3 border-b border-gray-200">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              {userData.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-sm">{userData.name}</p>
              <p className="text-xs text-gray-500">{userData.role}</p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" className="w-full text-sm">
              Log out
            </Button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden" 
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
