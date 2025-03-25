import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa6";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required(),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="h-dvh flex">
      <div className="bg-auth h-full w-1/2 p-16 hidden lg:flex flex-col gap-y-8 justify-center items-center">
        {/* <video src={AuthVideo} className="" autoPlay muted loop></video> */}
        <video autoPlay muted loop>
          <source src="/video.mp4" type="video/mp4" />{" "}
        </video>
        <h1 className="font-secondary uppercase text-5xl text-white text-center">
          Simplify your <span className="text-black text-6xl"> fitness</span>{" "}
          one <span className="text-black text-6xl"> workout </span> at a time
        </h1>
      </div>
      <div className="h-full lg:w-1/2 w-full flex flex-col justify-center">
        <div className="flex justify-center items-center lg:mb-8 mb-5">
          <FaDumbbell className="lg:size-14 size-10 text-red-secondary rotate-90" />
          <Link to="/">
            <h2 className="uppercase font-secondary lg:text-5xl text-4xl">
              Homefit
            </h2>
          </Link>
        </div>

        {/* login form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-4/5 font-light text-base"
        >
          <h3 className="uppercase font-secondary font-normal lg:text-3xl text-2xl">
            Hello,👋
          </h3>
          <p className="lg:text-xl text-lg font-light pt-1 pb-2">
            Enter your account details{" "}
          </p>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="bg-[#D3D3D3] text-base w-full p-1.5 rounded-xs outline-none focus:bg-white focus:border-2"
            />
          </div>
          {errors.email && (
            <span className="text-red-600 text-sm">
              {errors.email?.message}
            </span>
          )}

          <div className="flex flex-col mt-3">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                {...register("password")}
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                className="bg-[#D3D3D3] text-base w-full p-1.5 rounded-xs outline-none focus:bg-white focus:border-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <FaEye className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black cursor-pointer" />
                ) : (
                  <FaEyeSlash className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <div className="w-full text-nowrap flex lg:flex-row flex-col justify-between items-center">
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password?.message}
              </span>
            )}
            <Link className="ml-auto">
              <p className="text-right mt-1 text-sm hover:underline">
                forgot password?
              </p>
            </Link>
          </div>

          <button className="w-full mt-6 text-white font-secondary font-medium bg-red-primary p-2 rounded-xs cursor-pointer hover:bg-red-secondary focus:outline">
            Sign In
          </button>

          <p className="font-secondary text-gray-800 lg:text-lg text-base mt-2">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline text-black">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
