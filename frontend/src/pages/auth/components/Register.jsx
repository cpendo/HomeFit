import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import Swal from "sweetalert2";

import { useRegisterMutation } from "../../../features/users/usersApi";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

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
    register: registerInput,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    // eslint-disable-next-line no-unused-vars
    const { checkbox, confirmPassword, ...filteredData } = data;

    try {
      const response = await register(filteredData).unwrap();

      const { token } = response;
      sessionStorage.setItem("token", token);

      reset();
      navigate("/auth/verify-user");
    } catch (error) {
      Swal.fire("Registration Failed!", error?.data?.message, "error");
    }
  };
  return (
    <div className="w-4/5 mx-auto flex-1 flex flex-col justify-center items-center">
      <div className="w-full flex flex-col mb-2">
        <h3 className="uppercase font-secondary lg:text-4xl text-3xl tracking-tight">
          Start <span className="text-brand">training</span>.
        </h3>
        <p className="text-base sm:text-lg text-ink/70 font-light pt-1">
          Create an account to start using HomeFit.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-light text-base w-full"
      >
        <div className="flex lg:flex-row flex-col lg:gap-3">
          <FormInput
            label="First name"
            id="first_name"
            register={registerInput}
            error={errors.first_name}
          />
          <FormInput
            label="Last name"
            id="last_name"
            register={registerInput}
            error={errors.last_name}
          />
        </div>

        <FormInput
          label="Email"
          id="email"
          type="email"
          register={registerInput}
          error={errors.email}
        />

        <div className="flex lg:flex-row flex-col lg:gap-3">
          <PasswordInput
            label="Password"
            id="password"
            register={registerInput}
            error={errors.password}
          />

          <PasswordInput
            label="Confirm password"
            id="confirmPassword"
            register={registerInput}
            error={errors.confirmPassword}
          />
        </div>

        <div className="flex flex-row gap-2 items-center mt-2">
          <input
            {...registerInput("checkbox")}
            type="checkbox"
            id="checkbox"
            className="size-4 focus:outline accent-brand"
          />
          <label htmlFor="checkbox" className="text-sm font-medium text-ink/80">
            Accept our{" "}
            <span className="text-brand underline">Terms & Conditions</span>
          </label>
        </div>
        {errors.checkbox && (
          <span className="text-brand text-sm">{errors.checkbox?.message}</span>
        )}

        <button
          disabled={isLoading}
          className="w-full mt-6 inline-flex items-center justify-center bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-brand transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Registering…" : "Sign Up"}
        </button>
      </form>

      <p className="text-base text-ink/70 mt-4 sm:mb-0 mb-6">
        Already registered?{" "}
        <Link
          to="/auth"
          className="underline text-ink hover:text-brand transition-colors"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
