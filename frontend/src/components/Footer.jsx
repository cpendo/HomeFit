import { FaDumbbell } from "react-icons/fa6";
import { NavLink } from "react-router";
import { FaTelegramPlane } from "react-icons/fa";

const quickLinks = [
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

const Footer = () => {
  return (
    <section className="w-full bg-[#D3D3D3]">
      {/* Get Email Alerts */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10 py-10 sm:py-20 font-light">
        <div className="flex flex-col items-center justify-center">
          <h4 className="font-secondary capitalize text-4xl sm:text-5xl">
            Be the first to know
          </h4>
          <p className="font-medium sm:text-base text-sm  text-red-secondary sm:tracking-widest">
            Get the latest workouts and news alerts.
          </p>
        </div>
        <div className="bg-white sm:h-20 rounded-full py-2 sm:py-0 px-2 flex flex-row justify-center items-center">
          <input
            type="text"
            placeholder="johndoe@gmail.com"
            className="bg-white sm:text-2xl rounded-3xl px-4 border-none outline-none"
            // className="bg-white text-lg py-3 px-8 border-none outline-none rounded-3xl"
          />
          <div className="flex justify-center items-center bg-red-secondary size-9 sm:size-12 rounded-3xl cursor-pointer hover:bg-black">
            <FaTelegramPlane className="text-white text-2xl" />
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="flex flex-col bg-black text-white font-light rounded-t-xl p-5 sm:p-10">
        <div className="flex flex-col sm:flex-row gap-10 justify-between items-start pb-5">
          <div>
            <div className="flex items-center">
              <FaDumbbell className="sm:size-8 size-9 text-red-secondary rotate-90" />
              <h1 className="font-secondary sm:text-3xl text-3xl font-medium">
                HomeFit
              </h1>
            </div>
            <p className="sm:w-90">
              Customize your workouts, track every session, and stay in control
              of your fitness journey.
            </p>
          </div>
          <div className="flex flex-row gap-20 capitalize">
            <div className="">
              <h5 className="font-secondary text-xl text-nowrap underline">
                Quick links
              </h5>
              {quickLinks.map(({ text, route }, index) => (
                <NavLink
                  key={index}
                  to={route}
                  className="block  hover:text-red-secondary hover:underline"
                >
                  {text}
                </NavLink>
              ))}
            </div>
            <div>
              <h5 className="font-secondary text-xl underline">Legal</h5>
              <p className="hover:text-red-secondary hover:underline">
                privacy policy
              </p>
              <p className="hover:text-red-secondary hover:underline">
                terms of service
              </p>
            </div>
          </div>
        </div>
        <hr />
        <p className="capitalize text-sm text-center text-nowrap pt-2">
          © 2025 HomeFit. all rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
