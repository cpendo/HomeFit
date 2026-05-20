import { Outlet } from "react-router";
import DashboardNavbar from "../../components/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-paper text-ink font-primary">
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
