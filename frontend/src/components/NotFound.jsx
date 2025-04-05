import { FaDumbbell } from "react-icons/fa6";
import { Link } from "react-router";

import Image1 from "../assets/404-illustration.png";

const NotFound = () => {
  return (
    <div className="lg:h-screen w-screen flex flex-col">
      <div className="flex w-full items-center justify-between bg-black text-white py-2 sm:px-4 px-1">
        <div className="flex flex-row items-center">
          <FaDumbbell className="size-8 text-red-secondary rotate-90" />
          <h1 className="font-secondary text-4xl font-medium">
            HomeFit
          </h1>
        </div>
        <p className="sm:block hidden text-3xl font-secondary">
          Train. <span className="text-red-secondary text-4xl">Track.</span>{" "}
          Transform.
        </p>
      </div>

      <div className="w-full lg:h-[90%] h-min flex lg:flex-row flex-col-reverse sm:gap-0 gap-5">
        <div className="flex flex-1 flex-col justify-center items-center gap-8 ps-6">
          <h1 className="sm:text-6xl text-4xl font-secondary font-semibold text-black text-center">
            <span className="block mb-3">Ooops...</span>
            Page not Found
          </h1>

          <p className="lg:w-full sm:w-2/3 w-4/5 text-base sm:text-xl text-gray-600 text-center">
            The page you&apos;re looking for does not exist. We suggest going
            back to the home page.
          </p>
          <Link to="/">
            <button className="bg-red-secondary px-3 py-2 sm:mb-2 mb-10 text-white font-light text-lg rounded-sm hover:cursor-pointer hover:bg-black">
              Back to homepage
            </button>
          </Link>
        </div>

        <div className="flex lg:flex-2 justify-center items-center lg:w-full lg:h-full w-[90%] md:h-100  m-auto">
          <img
            src={Image1}
            alt="error-404 illustration"
            className="w-full h-full lg:object-cover object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
