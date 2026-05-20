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
      <div className="w-full flex flex-col mb-2">
        <h3 className="uppercase font-secondary lg:text-4xl text-3xl tracking-tight">
          New <span className="text-brand">password</span>.
        </h3>
        <p className="text-base sm:text-lg text-ink/70 font-light pt-1">
          Must be at least 8 characters.
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
          {isLoading ? "Resetting…" : "Reset password"}
        </button>
      </form>

      <Link
        to="/auth"
        className="text-base text-ink/70 mt-4 underline hover:text-brand transition-colors"
      >
        Back to Sign In
      </Link>
    </div>
  );
};

export default ResetPassword;
