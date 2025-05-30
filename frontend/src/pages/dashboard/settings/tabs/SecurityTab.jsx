import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormInput from "../../components/FormInput";
import {
  useChangePasswordMutation,
  useDeleteUserWorkoutsMutation,
  useGetProfileQuery,
  useLogoutMutation,
} from "../../../../features/users/usersApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

const SecurityTab = () => {
  const {
    data: { user },
    isLoading,
  } = useGetProfileQuery();

  const [changePassword, { isLoading: isUpdatingPassword }] =
    useChangePasswordMutation();
  const [logout] = useLogoutMutation();
  const [deleteUserWorkouts, { isLoading: isDeletingWorkouts }] =
    useDeleteUserWorkoutsMutation();

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
      await Swal.fire("Update Successful!", response?.message, "success");
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

  const handleDeleteUserWorkouts = async () => {
    if (!user) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete ALL your workouts and related logs. This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) {
      Swal.fire("Workouts not deleted", "", "info");
      return;
    }

    try {
      const response = await deleteUserWorkouts(user?.id).unwrap();
      await Swal.fire("Delete Successful!", response?.message, "success");
    } catch (error) {
      Swal.fire(
        "Delete Failed!",
        error?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="flex flex-col bg-gray-200 rounded-sm p-5">
        <h4 className="font-secondary text-2xl">Change Password</h4>
        <p className="text-sm text-gray-600 mb-5">
          If password is successfully updated, you&apos;ll need to login again.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sm:w-3/4 w-full pb-3"
        >
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

      <div className="flex flex-row flex-wrap justify-between items-center md:gap-0 gap-4  bg-gray-200 rounded-sm p-5">
        <div className="flex flex-col gap-2">
          <h4 className="font-secondary text-2xl">Delete Workout Data</h4>
          <p>
            Deleting your workouts is irreversible. All your workouts and
            related workout logs will be lost forever
          </p>
        </div>
        <button
          disabled={isDeletingWorkouts}
          onClick={handleDeleteUserWorkouts}
          className="bg-red-secondary text-white flex flex-row items-center gap-1 py-1 px-2 rounded-sm cursor-pointer hover:bg-black"
        >
          <FaRegTrashAlt className="inline text-sm" /> Delete Data
        </button>
      </div>
    </div>
  );
};

export default SecurityTab;
