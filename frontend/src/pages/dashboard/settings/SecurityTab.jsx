import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import PasswordInput from "../../auth/components/PasswordInput";
import * as yup from "yup";

const SecurityTab = () => {
  const schema = yup.object({
    currentPassword: yup.string().required("Password is required"),
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = () => {};

  return (
    <div className="w-full flex flex-col gap-5 border-2 border-dash-secondary rounded-sm p-5">
      <h4 className="font-secondary text-2xl">Change Password</h4>

      <form onSubmit={handleSubmit(onSubmit)} className="sm:w-3/4 w-full">
        <PasswordInput
          label="Current Password"
          id="currentPassword"
          register={register}
          error={errors.currentPassword}
        />

        <PasswordInput
          label="New Password"
          id="newPassword"
          register={register}
          error={errors.newPassword}
        />

        <PasswordInput
          label="Confirm Password"
          id="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />

        <button className="w-full lg:text-lg mt-6 text-white font-secondary font-medium bg-red-primary p-2 rounded-xs cursor-pointer hover:bg-red-secondary focus:outline">
          {/* {isLoading ? "Reseting..." : " Reset Password"} */}
          Change Password
        </button>
      </form>
    </div>
  );
};

export default SecurityTab;
