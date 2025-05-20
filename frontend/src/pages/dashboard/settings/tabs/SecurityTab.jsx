import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormInput from "../../components/FormInput";
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useLogoutMutation,
} from "../../../../features/users/usersApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SecurityTab = () => {
  const {
    data: { user },
    isLoading,
  } = useGetProfileQuery();

  const [changePassword, { isLoading: isUpdatingPassword }] =
    useChangePasswordMutation();
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const schema = yup.object({
    current_password: yup.string().required("Password is required"),
    new_password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("new_password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    if (!user) return;
    const data = { ...formData, id: user?.id };

    try {
      const response = await changePassword(data).unwrap();
      await Swal.fire("Update Success!", response?.message, "success");
      await logout().unwrap();
      await new Promise((r) => setTimeout(r, 1000));
      navigate("/auth");
    } catch (error) {
      Swal.fire(
        "Update Failed!",
        error?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="w-full flex flex-col bg-gray-200 rounded-sm p-5">
      <h4 className="font-secondary text-2xl">Change Password</h4>
      <p className="text-sm text-gray-600 mb-5">
        If password is successfully updated, you&apos;ll need to login again.
      </p>
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
          label="Confirm Password"
          id="confirm_password"
          type="text"
          register={register("confirm_password", {
            required: "Confirm Password is required",
          })}
          error={errors.confirm_password}
          styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
        />

        <button
          disabled={isLoading || isUpdatingPassword}
          className="w-full lg:text-lg mt-6 text-white font-secondary font-medium bg-red-secondary p-2 rounded-sm cursor-pointer hover:bg-black focus:outline"
        >
          {/* {isLoading ? "Reseting..." : " Reset Password"} */}
          {isUpdatingPassword ? "Updating Password" : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default SecurityTab;
