import { Outlet } from "react-router";
import DashboardNavbar from "../../components/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="w-screen h-screen bg-gray-300 py-3 px-4">
      <DashboardNavbar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
