import { FaDumbbell } from "react-icons/fa6";
import { Link } from "react-router";
 
const NotFound = () => {
  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <FaDumbbell className="size-72 text-red-secondary" />
      <h1 className="text-4xl uppercase font-secondary font-semibold">
        Page not Found
      </h1>
      <p className="text-2xl mt-4 mb-10 font-light">
        The page you&apos;re looking for does not exist
      </p>
      <Link to="/">
        <button className="bg-red-primary px-3 py-2 text-white text-2xl rounded-xs hover:bg-red-secondary">
          Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
