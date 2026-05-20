import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import {
  useLoginMutation,
  useLazyGetProfileQuery,
} from "../../../features/users/usersApi";
import Swal from "sweetalert2";

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";
const DEMO_EMAIL = "demo@homefit.app";
const DEMO_PASSWORD = "demo1234";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [getProfile] = useLazyGetProfileQuery();

  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: DEMO_MODE
      ? { email: DEMO_EMAIL, password: DEMO_PASSWORD }
      : { email: "", password: "" },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      await login(data).unwrap();

      const { user } = await getProfile().unwrap();

      if (user) {
        reset();
        navigate("/dashboard");
      }
    } catch (error) {
      const { message, token, redirect } = error?.data || {};

      if (redirect && token) {
        sessionStorage.setItem("token", token);
        await Swal.fire(
          "Account Not Verified",
          "Redirecting to verification page...",
          "info"
        );
        navigate("/auth/verify-user");
      } else {
        Swal.fire("Login Failed!", message || "An error occurred", "error");
      }
    }
  };

  return (
    <div className="w-4/5 mx-auto flex-1 flex flex-col justify-center items-center">
      <div className="w-full flex flex-col mb-2">
        <h3 className="uppercase font-secondary lg:text-4xl text-3xl tracking-tight">
          Hello, <span className="text-brand">welcome back.</span>
        </h3>
        <p className="text-base sm:text-lg text-ink/70 font-light pt-1">
          Enter your account details to continue.
        </p>
      </div>

      {DEMO_MODE && (
        <div className="w-full mb-4 px-4 py-3 rounded-lg border border-brand/30 bg-brand/5 text-sm">
          <p className="font-medium text-brand mb-0.5">
            Demo mode — prefilled credentials
          </p>
          <p className="text-ink/70 leading-snug">
            The form is preloaded with{" "}
            <code className="font-mono text-xs">{DEMO_EMAIL}</code>. Click Sign
            In to explore, or sign up to create your own account.
          </p>
        </div>
      )}

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

        <div className="w-full flex justify-end mt-2">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-ink/70 hover:text-brand hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <button
          disabled={isLoading}
          className="w-full mt-6 inline-flex items-center justify-center bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-brand transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="text-base text-ink/70 mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/auth/register" className="underline text-ink hover:text-brand transition-colors">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
