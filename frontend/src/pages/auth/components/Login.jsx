import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";

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
    <div className="w-4/5 mx-auto flex-1 flex flex-col justify-center items-center">
      <div className="w-full flex flex-col">
        <h3 className="uppercase font-secondary font-normal lg:text-3xl text-2xl">
          Hello,👋
        </h3>
        <p className="lg:text-xl text-lg font-light pt-1 pb-2">
          Enter your account details{" "}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-light text-base w-full"
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

      <button className="font-secondary text-gray-800 lg:text-lg text-base mt-2">
        Don&apos;t have an account?{" "}
        <Link to="/auth/register" className="underline text-black">
          Sign Up
        </Link>
      </button>
    </div>
  );
};

export default Login;
