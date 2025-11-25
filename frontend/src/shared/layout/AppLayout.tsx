
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";



export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar /> 
      <Outlet />
    </div>
  );
};
