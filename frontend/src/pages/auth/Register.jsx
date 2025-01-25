import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // eslint-disable-next-line no-unused-vars
    const { checkbox, ...filteredData } = data;
    console.log(filteredData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-2/3 font-light text-lg"
    >
      <h3 className="uppercase font-secondary font-normal lg:text-4xl text:2xl">
        Hello,👋
      </h3>
      <p className="lg:text-2xl text:lg font-light pt-1 pb-2">
        Create an account to start using HomeFit
      </p>
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          {...register("name", { required: true })}
          type="text"
          id="name"
          className="bg-[#D3D3D3] text-base w-full p-1.5 rounded-xs outline-none focus:bg-white focus:border-2"
        />
      </div>
      {errors.name && (
        <span className="text-red-600 text-sm">Name is required</span>
      )}

      <div className="flex flex-col mt-3">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          className="bg-[#D3D3D3] text-base w-full p-1.5 rounded-xs outline-none focus:bg-white focus:border-2"
        />
      </div>
      {errors.email && (
        <span className="text-red-600 text-sm">Email Adress is required</span>
      )}

      <div className="flex flex-col mt-3">
        <label htmlFor="password">Password</label>

        <div className="relative">
          <input
            {...register("password", { required: true, minLength: 8 })}
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
          Password must be atleast 8 characters
        </span>
      )}

      <div className="flex flex-row gap-2 items-center mt-2">
        <input
          {...register("checkbox", { required: true })}
          type="checkbox"
          id="checkbox"
          className="size-4 focus:outline"
        />
        <label htmlFor="checkbox" className="text-sm text-nowrap">
          {" "}
          Accept our{" "}
          <span className="text-blue-600 underline">
            terms & conditions
          </span>{" "}
        </label>
      </div>
      {errors.checkbox && (
        <span className="text-red-600 text-sm">
          Please accept the terms and conditions to register
        </span>
      )}

      <button className="w-full mt-6 text-white font-secondary font-medium bg-red-primary p-2 rounded-xs cursor-pointer hover:bg-red-secondary focus:outline">
        Sign Up
      </button>
      <p className="font-secondary text-gray-800 lg:text-lg text-base mt-2">
        Already Registered?{" "}
        <Link to="/auth/login" className="underline text-black">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default Register;
