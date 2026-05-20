import { FaRegTrashAlt } from "react-icons/fa";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import ProfileDetailsForm from "./components/ProfileDetailsForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteUserMutation,
  useGetProfileQuery,
  useLogoutMutation,
} from "../../../../features/users/usersApi";

const ProfileTab = () => {
  const { data } = useGetProfileQuery();
  const user = data?.user;

  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (!user) return;

    const result = await Swal.fire({
      title: "Delete your account?",
      text: "All your data will be lost. This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!result.isConfirmed) {
      Swal.fire("Account kept", "", "info");
      return;
    }

    try {
      const response = await deleteUser(user?.id).unwrap();
      await Swal.fire({
        title: "Account deleted",
        text: response?.message,
        icon: "success",
        didClose: async () => {
          await logout().unwrap();
          await new Promise((r) => setTimeout(r, 1000));
          navigate("/auth");
        },
      });
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
      <PersonalDetailsForm />
      <ProfileDetailsForm />

      <div className="bg-white border border-brand/20 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-secondary text-xl tracking-tight uppercase">
            Delete account
          </h3>
          <p className="text-sm text-mute">
            All workout progress and account details will be lost forever.
          </p>
        </div>
        <button
          disabled={isDeletingUser}
          onClick={handleDeleteUser}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-brand text-paper hover:bg-brand-dark transition-colors disabled:opacity-50"
        >
          <FaRegTrashAlt className="size-3.5" /> Delete everything
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
