import { Outlet } from "react-router";
import DashboardNavbar from "../../components/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="max-w-screen w-screen min-h-screen overflow-x-hidden">
      <div className="py-2 sm:px-4 px-2">
        <DashboardNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
