import { FaDumbbell, FaGear, FaPowerOff, FaNoteSticky } from "react-icons/fa6";
import { MdDashboard, MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { LuBicepsFlexed, LuUserCog } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  useGetProfileQuery,
  useLogoutMutation,
} from "../features/users/usersApi";

const menuItems = [
  { text: "Dashboard", route: "/dashboard", icon: MdDashboard, end: true },
  { text: "Workouts", route: "/dashboard/workouts", icon: LuBicepsFlexed },
  { text: "Logs", route: "/dashboard/logs", icon: FaNoteSticky },
  { text: "Settings", route: "/dashboard/settings", icon: FaGear },
];

const DashboardNavbar = () => {
  const matchWorkouts = useMatch("/dashboard/workouts/*");
  const matchLogs = useMatch("/dashboard/logs/*");
  const matchSettings = useMatch("/dashboard/settings/*");
  const { data } = useGetProfileQuery();
  const user = data?.user;

  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const [showDropDown, setShowDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    if (showDropDown) document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [showDropDown]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate("/");
    }
  };

  const isActiveCustom = (route, end) => ({ isActive }) => {
    const forced =
      (route.endsWith("/workouts") && matchWorkouts) ||
      (route.endsWith("/logs") && matchLogs) ||
      (route.endsWith("/settings") && matchSettings);
    const active = end ? isActive : isActive || forced;
    return [
      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-brand text-paper"
        : "text-paper/80 hover:text-paper hover:bg-white/10",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        <Link to="/dashboard" className="flex items-center gap-1 group">
          <FaDumbbell className="size-6 sm:size-7 text-brand rotate-90 group-hover:rotate-45 transition-transform duration-300" />
          <span className="font-secondary text-2xl sm:text-3xl tracking-tight">
            HomeFit
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {menuItems.map(({ text, route, icon: Icon, end }) => (
            <li key={route}>
              <NavLink to={route} end={end} className={isActiveCustom(route, end)}>
                <Icon className="size-4" />
                {text}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowDropDown((v) => !v)}
              className="hidden md:inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border border-white/10 hover:border-white/30 transition-colors"
              aria-label="Account menu"
            >
              <span className="inline-flex items-center justify-center size-8 rounded-full bg-brand/15 text-paper">
                <FaRegUser className="size-3.5" />
              </span>
              <span className="text-sm">{user?.first_name || "Account"}</span>
            </button>

            {showDropDown && (
              <div className="absolute right-0 top-12 w-48 bg-white text-ink border border-line rounded-xl shadow-lg overflow-hidden">
                <NavLink
                  to="/dashboard/settings"
                  onClick={() => setShowDropDown(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-paper"
                >
                  <LuUserCog className="size-4 text-mute" />
                  Profile & Settings
                </NavLink>
                <div className="h-px bg-line" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-brand hover:bg-brand/5"
                >
                  <FaPowerOff className="size-3.5" />
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center size-10 rounded-full border border-white/10"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <MdMenu className="size-5" />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-ink text-paper flex flex-col p-6">
          <div className="flex items-center justify-between">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1"
            >
              <FaDumbbell className="size-7 text-brand rotate-90" />
              <span className="font-secondary text-3xl">HomeFit</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center size-10 rounded-full border border-white/10"
              aria-label="Close menu"
            >
              <IoClose className="size-5" />
            </button>
          </div>

          <ul className="mt-8 flex flex-col gap-1">
            {menuItems.map(({ text, route, icon: Icon, end }) => (
              <li key={route}>
                <NavLink
                  to={route}
                  end={end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-lg",
                      isActive
                        ? "bg-brand text-paper"
                        : "text-paper/80 hover:bg-white/10",
                    ].join(" ")
                  }
                >
                  <Icon className="size-5" />
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center size-10 rounded-full bg-brand/15">
                <FaRegUser className="size-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-sm text-paper/70">Signed in as</span>
                <span className="text-base">{user?.first_name || "Demo"}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium hover:bg-brand-dark transition-colors"
            >
              <FaPowerOff className="size-4" /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardNavbar;
