import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SidePanel from "./components/SidePanel";
import FormInput from "./components/FormInput";
import PasswordInput from "./components/PasswordInput";
import { FaDumbbell } from "react-icons/fa6";

const Login = () => {
  const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="h-dvh flex">
      <SidePanel />

      <div className="h-full lg:w-1/2 w-full flex flex-col justify-center">
        <div className="mx-auto w-4/5">
          <Link
            to="/"
            className="flex justify-center items-center lg:mb-8 mb-5"
          >
            <FaDumbbell className="lg:size-12 size-8 text-red-secondary rotate-90" />
            <p className="text-5xl font-secondary">Homefit</p>
          </Link>
          <h3 className="uppercase font-secondary font-normal lg:text-3xl text-2xl">
            Hello,👋
          </h3>
          <p className="lg:text-xl text-lg font-light pt-1 pb-2">
            Enter your account details{" "}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="font-light text-base"
          >
            <FormInput
              label="Email"
              id="email"
              type="email"
              register={register}
              error={errors.email}
            />

            <PasswordInput
              label="Password"
              id="password"
              register={register}
              error={errors.password}
            />

            <div className="w-full text-nowrap flex lg:flex-row flex-col justify-between items-center">
              <Link className="ml-auto">
                <p className="text-right mt-1 text-sm hover:underline">
                  forgot password?
                </p>
              </Link>
            </div>

            <button className="w-full mt-6 text-white font-secondary font-medium bg-red-primary p-2 rounded-xs cursor-pointer hover:bg-red-secondary focus:outline">
              Sign In
            </button>
          </form>

          <p className="font-secondary text-gray-800 lg:text-lg text-base mt-2">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline text-black">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
