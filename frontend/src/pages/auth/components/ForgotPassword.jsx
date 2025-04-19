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
      await Swal.fire("Email Sent", response.message, "success" )
      reset();
    } catch (error) {
      const { message } = error?.data || {};
      Swal.fire("Login Failed!", message || "An error occurred", "error");
    }
  };

  return (
    <div className="w-4/5 mx-auto flex-1 flex flex-col justify-center items-center">
      <div className="w-full flex flex-col">
        <h3 className="uppercase font-secondary font-normal lg:text-4xl text-2xl">
          Forgot your Password?
        </h3>
        <p className="lg:text-xl text-lg font-light pt-1 pb-2">
          No worries. We&apos;ll send you reset instructions.
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
          className="w-full lg:text-lg mt-6 text-white font-secondary font-medium bg-red-primary p-2 rounded-xs cursor-pointer hover:bg-red-secondary focus:outline"
        >
          {isLoading ? "Sending..." : "Send instructions"}
          
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

export default ForgotPassword;
