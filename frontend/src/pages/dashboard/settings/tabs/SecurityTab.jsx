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
  const { data, isLoading } = useGetProfileQuery();
  const user = data?.user;

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
      await Swal.fire("Password updated", response?.message, "success");
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
      title: "Delete all workouts and logs?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!result.isConfirmed) {
      Swal.fire("Data kept", "", "info");
      return;
    }
    try {
      const response = await deleteUserWorkouts(user?.id).unwrap();
      await Swal.fire("Data deleted", response?.message, "success");
    } catch (error) {
      Swal.fire(
        "Delete Failed!",
        error?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-secondary text-2xl tracking-tight uppercase">
            Change password
          </h3>
          <p className="text-sm text-mute mt-1">
            You&apos;ll be signed out and need to log in again after updating.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-md"
        >
          <FormInput
            label="Current password"
            id="current_password"
            type="password"
            register={register("current_password")}
            error={errors.current_password}
          />
          <FormInput
            label="New password"
            id="new_password"
            type="password"
            register={register("new_password")}
            error={errors.new_password}
          />
          <FormInput
            label="Confirm new password"
            id="confirm_password"
            type="password"
            register={register("confirm_password")}
            error={errors.confirm_password}
          />
          <button
            disabled={isLoading || isUpdatingPassword}
            className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full font-medium bg-ink text-paper hover:bg-brand transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isUpdatingPassword ? "Updating…" : "Change password"}
          </button>
        </form>
      </div>

      <div className="bg-white border border-brand/20 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-secondary text-xl tracking-tight uppercase">
            Delete workout data
          </h3>
          <p className="text-sm text-mute">
            All workouts and related logs will be lost forever.
          </p>
        </div>
        <button
          disabled={isDeletingWorkouts}
          onClick={handleDeleteUserWorkouts}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-brand text-paper hover:bg-brand-dark transition-colors disabled:opacity-50"
        >
          <FaRegTrashAlt className="size-3.5" /> Delete data
        </button>
      </div>
    </div>
  );
};

export default SecurityTab;
