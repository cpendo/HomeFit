import { Outlet } from "react-router";
import DashboardNavbar from "../../components/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="max-w-screen w-screen min-h-screen overflow-x-hidden bg-dash-secondary">
      <div className="py-3 px-4">
        <DashboardNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
