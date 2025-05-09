import { Outlet } from "react-router";
import DashboardNavbar from "../../components/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="max-w-screen w-full min-h-screen overflow-x-hidden">
      <div className="w-full py-2 sm:px-3 px-2">
        <DashboardNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
