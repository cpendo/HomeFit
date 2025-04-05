import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useRegisterUserMutation } from "../../features/users/usersApi";
import SidePanel from "./components/SidePanel";
import FormInput from "./components/FormInput";
import PasswordInput from "./components/PasswordInput";
import { FaDumbbell } from "react-icons/fa6";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { checkbox, confirmPassword, ...filteredData } = data;

    try {
      const response = await registerUser(filteredData).unwrap();
      console.log("User registered :" + response);
      Swal.fire({
        title: "User registered!",
        text: "Check your email for verification.",
        icon: "success",
      });
      reset();
    } catch (error) {
      console.error("Registration failed:", error);
      console.log(filteredData)
      Swal.fire({
        title: "Registration Failed!",
        text: error?.data?.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="h-max lg:h-dvh flex lg:my-0 my-10">
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
            Create an account to start using HomeFit
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="font-light text-base w-full"
          >
            <div className="flex lg:flex-row flex-col lg:gap-3">
              <FormInput
                label="First name"
                id="first_name"
                register={register}
                error={errors.first_name}
              />
              <FormInput
                label="Last name"
                id="last_name"
                register={register}
                error={errors.last_name}
              />
            </div>

            <FormInput
              label="Email"
              id="email"
              type="email"
              register={register}
              error={errors.email}
            />

            <div className="flex lg:flex-row flex-col lg:gap-3">
              <PasswordInput
                label="Password"
                id="password"
                register={register}
                error={errors.password}
              />

              <PasswordInput
                label="Confirm password"
                id="confirmPassword"
                register={register}
                error={errors.confirmPassword}
              />
            </div>

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

            <button
              disabled={isLoading}
              className="w-full mt-6 text-white font-secondary font-medium bg-red-primary p-2 rounded-xs cursor-pointer hover:bg-red-secondary focus:outline"
            >
              {/* Sign Up */}
              {isLoading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <p className="font-secondary text-gray-800 lg:text-lg text-base mt-2">
            Already Registered?{" "}
            <Link to="/login" className="underline text-black">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
