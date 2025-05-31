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
  const {
    data: { user },
  } = useGetProfileQuery();

  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (!user) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete your account and ALL your data. This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) {
      Swal.fire("Account not deleted", "", "info");
      return;
    }

    try {
      const response = await deleteUser(user?.id).unwrap();
      await Swal.fire({
        title: "Delete Successful!",
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
    <div className="w-full flex flex-col gap-4">
      <PersonalDetailsForm />
      <ProfileDetailsForm />

      <div className="flex flex-row flex-wrap  justify-between items-center md:gap-0 gap-4 bg-gray-200 rounded-sm p-5">
        <div className="flex flex-col gap-2">
          <h4 className="font-secondary text-2xl">Delete Account</h4>
          <p>
            Deleting your account is irreversible. All your workout progress and
            account details will be lost forever
          </p>
        </div>
        <button
          disabled={isDeletingUser}
          onClick={handleDeleteUser}
          className="bg-red-secondary text-white flex flex-row items-center gap-1 py-1 px-2 rounded-sm cursor-pointer hover:bg-black "
        >
          <FaRegTrashAlt className="inline text-sm" /> Delete Everything
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
