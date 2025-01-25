import { Outlet } from "react-router";
import AuthVideo from "../../assets/option_1.mp4";
import { FaDumbbell } from "react-icons/fa6";

const Auth = () => {
  return (
    <div className="h-dvh flex">
      <div className="bg-auth h-full w-1/2 p-16 hidden lg:flex flex-col gap-y-8 justify-center items-center">
        <video src={AuthVideo} className="" autoPlay muted loop></video>
        <h1 className="font-secondary text-6xl text-white text-center">
          Simply your fitness, one workout at a time
        </h1>
      </div>
      <div className="h-full lg:w-1/2 w-full flex flex-col justify-center">
      <div className="flex justify-center items-center lg:mb-8 mb-5">
        <FaDumbbell className="lg:size-16 size-10 text-black rotate-90" />
        <h2 className="uppercase font-secondary lg:text-5xl text-3xl">Homefit</h2>
      </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
