import { useState } from "react";
import { FaDumbbell } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router";

import { useGetProfileQuery } from "../features/users/usersApi";

const menuItems = [
  { text: "Features", href: "#features" },
  { text: "How it works", href: "#how-it-works" },
  { text: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const { data, error } = useGetProfileQuery();
  // `!error` flips the CTA back to "Sign in" after logout — RTK Query
  // keeps stale `data` on failed refetches, so we have to check `error`.
  const user = !error && data?.user;
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Default to Sign in; once the profile resolves with a user, swap to Dashboard.
  // No `isFetching` gate — nav renders immediately on first paint.
  const ctaTo = user ? "/dashboard" : "/auth";
  const ctaText = user ? "Dashboard" : "Sign in";

  return (
    <header className="w-full font-primary h-14 sm:h-17 py-3 px-4 bg-black text-[#F5F3F4] sticky top-0 z-40 border-b border-white/5">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center">
            <FaDumbbell className="sm:size-8 size-7 text-red-secondary rotate-90" />
            <h1 className="font-secondary sm:text-3xl text-2xl font-medium">
              HomeFit
            </h1>
          </div>
        </Link>

        <div className="sm:flex hidden flex-row items-center gap-6 text-lg">
          <ul className="flex flex-row gap-6 font-medium">
            {menuItems.map(({ text, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[#F5F3F4] hover:text-red-secondary transition-colors"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:flex hidden items-center">
          <Link to={ctaTo}>
            <button className="bg-[#F5F3F4] text-black py-2 px-4 rounded-4xl cursor-pointer hover:bg-red-secondary hover:text-white transition-colors">
              {ctaText}
            </button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <IoMenu
          className="size-8 sm:hidden block cursor-pointer"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Open menu"
        />
        {showMobileMenu && (
          <div className="sm:hidden absolute right-2 top-12 w-40 p-3 bg-[#F5F3F4] shadow-lg rounded-md z-40">
            <ul className="flex flex-col gap-2 text-black">
              {menuItems.map(({ text, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setShowMobileMenu(false)}
                    className="block py-1 hover:text-red-secondary"
                  >
                    {text}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <Link to={ctaTo} onClick={() => setShowMobileMenu(false)}>
                  <button className="w-full bg-black text-white py-1.5 px-3 rounded-md">
                    {ctaText}
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
