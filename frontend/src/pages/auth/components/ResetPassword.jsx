import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { useResetPasswordMutation } from "../../../features/users/usersApi";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import LoadingPage from "../../../components/LoadingPage";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [hasCheckedToken, setHasCheckedToken] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const schema = yup.object({
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
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

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    } else {
      setHasCheckedToken(true);
    }
  }, [token, navigate]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { checkbox, confirmPassword, newPassword } = data;

    try {
      const response = await resetPassword({
        token,
        newPassword,
        confirmPassword,
      }).unwrap();
      await Swal.fire("Email Sent", response.message, "success");
      reset();
      setTimeout(() => navigate("/auth"), 1000);
    } catch (error) {
      const { message } = error?.data || {};
      console.log(error);
      Swal.fire("Login Failed!", message || "An error occurred", "error");
    }
  };

  if (!hasCheckedToken) {
    return <LoadingPage />;
  }

  return (
    <div className="w-4/5 mx-auto flex-1 flex flex-col justify-center items-center">
      <div className="w-full flex flex-col">
        <h3 className="uppercase font-secondary font-normal lg:text-4xl text-2xl">
          Create a new Password
        </h3>
        <p className="lg:text-xl text-lg font-light pt-1 pb-2">
          Must be atleast 8 characters
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-light text-base w-full"
      >
        <PasswordInput
          label="Password"
          id="newPassword"
          register={register}
          error={errors.newPassword}
        />

        <PasswordInput
          label="Confirm password"
          id="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />

        <div className="flex flex-row gap-2 items-center mt-2">
          <input
            {...register("checkbox")}
            type="checkbox"
            id="checkbox"
            className="size-4 focus:outline"
          />
          <label htmlFor="checkbox" className="text-sm font-medium text-nowrap">
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
          className="w-full lg:text-lg mt-6 text-white font-secondary font-medium bg-red-primary p-2 rounded-xs cursor-pointer hover:bg-red-secondary focus:outline"
        >
          {isLoading ? "Reseting..." : " Reset Password"}
        </button>
      </form>

      <button className="font-secondary text-gray-800 lg:text-lg text-base mt-4">
        <Link to="/auth" className="underline text-black">
          Back to Sign In
        </Link>
      </button>
    </div>
  );
};

export default ResetPassword;
