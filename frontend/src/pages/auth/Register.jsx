import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa6";
// import AuthVideo from "../../assets/option_1.mp4";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterUserMutation } from "../../features/users/usersApi";

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const schema = yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    checkbox: yup
      .boolean()
      .oneOf([true], "Please accept the terms and conditions to register"),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { checkbox, confirmPassword, ...filteredData } = data;

    try {
      const response = await registerUser(filteredData).unwrap();
      console.log("User registered :" + response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <div className="h-dvh flex lg:my-0 my-10">
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-4/5 font-light text-base"
        >
          <h3 className="uppercase font-secondary font-normal lg:text-3xl text-2xl">
            Hello,👋
          </h3>
          <p className="lg:text-xl text-lg font-light pt-1 pb-2">
            Create an account to start using HomeFit
          </p>

          <div className="flex lg:flex-row flex-col lg:gap-3">
            <div>
              <label htmlFor="firstName">First name</label>
              <input
                {...register("first_name")}
                type="text"
                id="firstName"
                className="bg-[#D3D3D3] text-base w-full p-1.5 rounded-xs outline-none focus:bg-white focus:border-2"
              />
              {errors.firstName && (
                <span className="text-red-600 text-sm">
                  {errors.firstName?.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="lastName">Last name</label>
              <input
                {...register("last_name")}
                type="text"
                id="lastName"
                className="bg-[#D3D3D3] text-base w-full p-1.5 rounded-xs outline-none focus:bg-white focus:border-2"
              />
              {errors.lastName && (
                <span className="text-red-600 text-sm">
                  {errors.lastName?.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-3">
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
          {errors.password && (
            <span className="text-red-600 text-sm">
              {errors.password?.message}
            </span>
          )}

          <div className="flex flex-col mt-3">
            <label htmlFor="password">Confirm password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              className="bg-[#D3D3D3] text-base w-full p-1.5 rounded-xs outline-none focus:bg-white focus:border-2 pr-10"
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-red-600 text-sm">
              {errors.confirmPassword?.message}
            </span>
          )}

          <div className="flex flex-row gap-2 items-center mt-2">
            <input
              {...register("checkbox")}
              type="checkbox"
              id="checkbox"
              className="size-4 focus:outline"
            />
            <label
              htmlFor="checkbox"
              className="text-sm font-medium text-nowrap"
            >
              {" "}
              Accept our{" "}
              <span className="text-blue-600 underline">
                Terms & Conditions
              </span>{" "}
            </label>
          </div>
          {errors.checkbox && (
            <span className="text-red-600 text-sm">
              {errors.checkbox?.message}
            </span>
          )}

          <button disabled={isLoading} className="w-full mt-6 text-white font-secondary font-medium bg-red-primary p-2 rounded-xs cursor-pointer hover:bg-red-secondary focus:outline">
            {/* Sign Up */}
            {isLoading ? "Registering..." : "Sign Up"}

          </button>
          <p className="font-secondary text-gray-800 lg:text-lg text-base mt-2">
            Already Registered?{" "}
            <Link to="/login" className="underline text-black">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
