import {
  FaDumbbell,
  FaShapes,
  FaNoteSticky,
  FaBell,
  FaGear,
  FaPowerOff,
} from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import ActiveWorkoutImg from "../assets/biceps.png";
import DefaultWorkoutImg from "../assets/biceps-1.png";
import { LuUserCog } from "react-icons/lu";
import { FaUser } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogoutMutation, useGetProfileQuery } from "../features/users/usersApi";
import LoadingPage from "./LoadingPage";

const mainMenuItems = [
  {
    text: "Dashboard",
    route: "/dashboard",
    icon: MdDashboard,
  },
  {
    text: "Workouts",
    route: "workouts",
    image: DefaultWorkoutImg,
  },
  {
    text: "Sets",
    route: "sets",
    icon: FaShapes,
  },
  {
    text: "Logs",
    route: "logs",
    icon: FaNoteSticky,
  },
  {
    text: "Settings",
    route: "settings",
    icon: FaGear,
  },
];

const DashboardNavbar = () => {
  const { data, error, isLoading } = useGetProfileQuery();
  const user = data?.user;

  const navigate = useNavigate();
  const [logout] = useLogoutMutation(); // Call the hook in the component body

  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await logout().unwrap(); // Trigger the query and wait for the result
      if (result) {
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/");
    }
  };

  if (isLoading) return <LoadingPage />
  if (error) {
    console.error("Profile fetch error:", error);
  
    // Optional: redirect to login if user is not authenticated
    if (error.status === 401) {
      navigate("/login"); // or wherever your login is
    }
  
    return <div>Error loading profile.</div>;
  }

  return (
    <header>
      <nav className="flex items-center justify-between">
        <div className="dashboard-menu-div px-2">
          {/* wrap with link to dashboard home */}
          <FaDumbbell className="size-8 text-red-secondary rotate-90" />
          <h1 className="font-secondary sm:text-3xl text-2xl font-medium">
            HomeFit
          </h1>
        </div>

        <div className="dashboard-menu-div px-2">
          <ul className="flex flex-row gap-2 font-medium ">
            {mainMenuItems.map(({ text, route, icon: Icon, image }) => (
              <NavLink
                end
                key={text}
                to={route}
                className={({ isActive }) =>
                  `dashboard-menu-item ${
                    isActive
                      ? "text-white bg-red-secondary"
                      : "text-black bg-gray-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {Icon ? (
                      <Icon />
                    ) : image ? (
                      <img
                        src={isActive ? ActiveWorkoutImg : image}
                        alt={`${text} icon`}
                        className="size-4"
                      />
                    ) : null}{" "}
                    {text}
                  </>
                )}
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="flex flex-row gap-2">
          <div className="dashboard-menu-div px-2">
            <ul className="flex flex-row gap-2">
              <li
                className={`dashboard-menu-item w-9 ${
                  showNotifications
                    ? "text-white bg-black"
                    : "text-black bg-gray-200"
                }`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell className="text-xl" />
              </li>
              <NavLink to="/" className="dashboard-menu-item w-9 bg-[#EEEEEE]">
                <AiFillHome className="text-2xl" />
              </NavLink>
            </ul>
          </div>

          <div
            className="dashboard-menu-div px-3"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <FaUser className="text-2xl" />
          </div>
          {showDropDown && (
            <div className="absolute right-5 top-18 w-30 p-3 bg-white shadow-xl rounded-lg z-40">
              <ul className="flex flex-col justify-center  gap-1">
                <li className="flex flex-row items-center gap-2 capitalize">
                  <LuUserCog className="inline text-xl" /> {user?.first_name || "John"}
                </li>
                <hr className="w-full text-gray-200" />
                <li
                  className="flex flex-row items-center gap-2 hover:cursor-pointer"
                
                >
                  <button   onClick={handleLogout}>
                    {" "}
                    <FaPowerOff className="inline" /> Logout{" "}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
