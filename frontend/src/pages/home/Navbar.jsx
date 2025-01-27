import { Link } from "react-router";
import { FaDumbbell } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Settings", href: "/settings" },
];

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="w-full h-fit border-2 font-primary">
      <nav className="flex flex-row justify-between items-center px-2 py-2">
        {/* left side */}
        <div className="flex items-center">
          <FaDumbbell className="lg:size-8 size-10 text-red-secondary rotate-90" />
          <h1 className="font-secondary text-3xl font-medium hidden sm:inline">HomeFit</h1>
        </div>

        {/* center */}
        <div className="relative sm:w-72 w-48 space-x-2 ">
          <IoSearchOutline className="absolute inline-block left-2 inset-y-2" />
          <input
            type="text"
            placeholder="Search Workouts"
            className="bg-[#D3D3D3] w-full py-1 md:px-8 px-7 rounded-xs"
          />
        </div>

        {/* right side */}
        <div>
          <FaUserCircle onClick={() => setShowDropdown(!showDropdown)} className="size-8 cursor-pointer" />
          {/* drop down */}
          {showDropdown && <div className="absolute right-2 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
            <ul className="py-2">
              {navigation.map(({ name, href }) => (
                <li key={name} onClick={() => setShowDropdown(false)}>
                  <Link
                    // to={href}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  //   onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
