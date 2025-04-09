import BannerImg from "../../../assets/banner-img.png";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="w-full flex lg:flex-row flex-col-reverse justify-between items-center lg:gap-0 gap-4 py-4 lg:px-10 px-5">
      <div className="flex-1 flex flex-col lg:gap-8 gap-4">
        <h1 className="w-full font-secondary uppercase lg:text-7xl text-4xl text-black leading-tight">
          Train. <span className="lg:text-8xl text-5xl text-red-secondary">Track.</span>{" "}
          Transform.
        </h1>
        <h2 className="lg:text-xl text-base font-light">
          Customize your workouts, track every session, and stay in control of
          your fitness journey.
        </h2>
        <div className="lg:w-7/8 w-full flex flex-row justify-between font-secondary capitalize">
          <div>
            <h3 className="lg:text-4xl text-2xl">100+</h3>
            <p className="text-red-secondary">workouts</p>
          </div>
          <div>
            <h3 className="lg:text-4xl text-2xl">10+</h3>
            <p className="text-red-secondary">categoties</p>
          </div>
          <div>
            <h3 className="lg:text-4xl text-2xl">NO</h3>
            <p className="text-red-secondary">equipment</p>
          </div>
        </div>
        <Link to="/auth/register">
          <button className="lg:w-50 w-full bg-black text-white text-2xl font-secondary rounded-xs p-3 hover:bg-red-secondary cursor-pointer">
            Get Started
          </button>
        </Link>
      </div>
      <div className="flex-1 flex justify-center blob-bg ">       
        <img
          src={BannerImg}
          className="max-h-[500px] w-auto object-cover "
          alt="strong athletic man holding weights"
        />
      </div>
    </section>
  );
};

export default Hero;
