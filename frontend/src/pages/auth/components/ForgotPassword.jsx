import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import FormInput from "./FormInput";
import { Link } from "react-router";
import { useForgotPasswordMutation } from "../../../features/users/usersApi";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(data).unwrap();
      await Swal.fire("Email Sent", response.message, "success");
      reset();
    } catch (error) {
      const { message } = error?.data || {};
      Swal.fire("Login Failed!", message || "An error occurred", "error");
    }
  };

  return (
    <div className="w-4/5 mx-auto flex-1 flex flex-col justify-center items-center">
      <div className="w-full flex flex-col mb-2">
        <h3 className="uppercase font-secondary lg:text-4xl text-3xl tracking-tight">
          Forgot your <span className="text-brand">password?</span>
        </h3>
        <p className="text-base sm:text-lg text-ink/70 font-light pt-1">
          No worries, we&apos;ll send reset instructions to your inbox.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-light text-base w-full "
      >
        <FormInput
          label="Email"
          id="email"
          type="email"
          register={register}
          error={errors.email}
        />

        <button
          disabled={isLoading}
          className="w-full mt-6 inline-flex items-center justify-center bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-brand transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending…" : "Send instructions"}
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

export default ForgotPassword;
