import {
  FaDumbbell,
  FaShapes,
  FaNoteSticky,
  FaBell,
  FaGear,
} from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import ActiveWorkoutImg from "../assets/biceps.png";
import DefaultWorkoutImg from "../assets/biceps-1.png";

import { NavLink } from "react-router";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

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
];

const iconMenuItems = [
  { icon: FaBell },
  { icon: FaGear, route: "settings" },
  { icon: AiFillHome, route: "/" },
];

const DashboardNavbar = () => {
  const [notificationsVisibility, setNotificationsVisibility] = useState(false);
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
              {iconMenuItems.map(({ icon: Icon, route }, index) => (
                <li key={index}>
                  {route ? (
                    <NavLink
                      to={route}
                      className={({ isActive }) =>
                        `dashboard-menu-item ${
                          isActive
                            ? "text-white bg-red-secondary"
                            : "text-black bg-gray-200"
                        }`
                      }
                    >
                      <Icon className="text-2xl" />
                    </NavLink>
                  ) : (
                    <div
                      className={`dashboard-menu-item ${
                        notificationsVisibility
                          ? "text-white bg-red-secondary"
                          : "text-black bg-gray-200"
                      }`}
                      onClick={() =>
                        setNotificationsVisibility(!notificationsVisibility)
                      }
                    >
                      <Icon className="text-2xl" />
                    </div>
                  )}
                </li>

                //   <NavLink
                //     key={index}
                //     to={route}
                //     end
                //     className={({ isActive }) =>
                //       `dashboard-menu-item ${
                //         isActive
                //           ? "text-white bg-red-secondary"
                //           : "text-black bg-gray-200"
                //       }`
                //     }
                //   >
                //     <Icon className="text-2xl" />
                //   </NavLink>
              ))}
            </ul>
          </div>

          <div className="dashboard-menu-div px-3">
            <FaUser className="text-2xl" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
