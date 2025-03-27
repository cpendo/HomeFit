import { useState } from "react";
import { FaDumbbell } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

import { Link, NavLink } from "react-router";

const menuItems = [
  {
    text: "Home",
    route: "/",
  },
  {
    text: "Training",
    route: "/training",
  },
  {
    text: "Help",
    route: "/get-help",
  },
];

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="w-full font-primary h-14 sm:h-17 py-3 px-4 bg-black text-[#F5F3F4]">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center">
            <FaDumbbell className="sm:size-8 size-7 text-red-secondary rotate-90" />
            <h1 className="font-secondary sm:text-3xl text-2xl font-medium">
              HomeFit
            </h1>
          </div>
        </Link>

        <div className="sm:flex hidden flex-row items-center gap-4 text-lg">
          <ul className="flex flex-row gap-4 font-medium">
            {menuItems.map(({ text, route }, index) => (
              <NavLink
                key={index}
                to={route}
                className={({ isActive }) =>
                  isActive ? "text-red-secondary" : "text-[#F5F3F4]" 
                }
              >
                {text}
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="sm:flex hidden items-center gap-2">
          <Link to="/register">
            <button className="bg-[#F5F3F4] text-black py-2 px-4 rounded-4xl cursor-pointer hover:bg-red-secondary hover:text-white">
              Register
            </button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <IoMenu
          className="size-8 sm:hidden block"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />
        {showMobileMenu && (
          <div className="sm:hidden absolute right-2 top-12 w-30 p-2 bg-[#F5F3F4] shadow-lg rounded-xs z-40">
            <ul className="flex flex-col gap-2">
              {menuItems.map(({ text, route }, index) => (
                <NavLink
                  key={index}
                  to={route}
                  className={({ isActive }) =>
                    isActive ? "text-red-secondary" : "text-black"
                  }
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  {text}
                </NavLink>
              ))}

              <li>
                <Link to="/register">
                  <button className="bg-black py-1 px-4 rounded-xs">
                    Register
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
