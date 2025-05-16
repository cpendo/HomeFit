import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormInput from "../../components/FormInput";

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
    <div className="w-full flex flex-col gap-5 bg-gray-200 rounded-sm p-5">
      <h4 className="font-secondary text-2xl">Change Password</h4>

      <form onSubmit={handleSubmit(onSubmit)} className="sm:w-3/4 w-full pb-3">
        <FormInput
          label="Current Password"
          id="current_password"
          type="text"
          register={register("current_password", {
            required: "Current Password is required",
          })}
          error={errors.current_password}
          styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
        />

        <FormInput
          label="New Password"
          id="new_password"
          type="text"
          register={register("new_password", {
            required: "New Password is required",
          })}
          error={errors.new_password}
          styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
        />

        <FormInput
          label="ConfirmPassword"
          id="confirm_password"
          type="text"
          register={register("confirm_password", {
            required: "Confirm Password is required",
          })}
          error={errors.confirm_password}
          styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
        />

        <button className="w-full lg:text-lg mt-6 text-white font-secondary font-medium bg-red-secondary p-2 rounded-sm cursor-pointer hover:bg-black focus:outline">
          {/* {isLoading ? "Reseting..." : " Reset Password"} */}
          Change Password
        </button>
      </form>
    </div>
  );
};

export default SecurityTab;
