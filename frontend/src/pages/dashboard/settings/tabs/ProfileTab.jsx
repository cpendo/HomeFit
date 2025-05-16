import PropTypes from "prop-types";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ProfileTab = ({ user }) => {
  const handleEditName = async (firstName = "", lastName = "") => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Name",
      html: `
        <input id="swal-firstname" class="swal2-input" placeholder="First Name" value="${firstName}">
        <input id="swal-lastname" class="swal2-input" placeholder="Last Name" value="${lastName}">
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        const first = document.getElementById("swal-firstname").value.trim();
        const last = document.getElementById("swal-lastname").value.trim();
        if (!first || !last) {
          Swal.showValidationMessage("Both fields are required");
          return;
        }
        return { firstName: first, lastName: last };
      },
    });

    if (formValues) {
      // Use RTK mutation here, e.g.
      // updateUserName(formValues)
      console.log("To send to backend:", formValues);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-5 bg-gray-200 rounded-sm p-5">
        <div className="flex flex-row justify-between items-center">
          <h4 className="font-secondary text-2xl">Personal information</h4>
          <button
            onClick={() => handleEditName(user.first_name, user.last_name)}
            className="bg-gray-200 text-black flex flex-row items-center gap-1 py-1 px-2 rounded-sm hover:bg-red-secondary hover:text-white cursor-pointer"
          >
            <MdEdit className="inline text-sm" /> Edit
          </button>
        </div>

        <div className="flex flex-row justify-start gap-20">
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">First Name</h5>
            <p className="capitalize text-gray-600">{user.first_name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">Last Name</h5>
            <p className="capitalize text-gray-600">{user.last_name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">Email</h5>
            <p className="capitalize text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 bg-gray-200 rounded-sm p-5">
        <div className="flex flex-row justify-between items-center">
          <h4 className="font-secondary text-2xl">Profile information</h4>
          <button
            onClick={() => handleEditName(user.first_name, user.last_name)}
            className="bg-gray-200 text-black flex flex-row items-center gap-1 py-1 px-2 rounded-sm hover:bg-red-secondary hover:text-white cursor-pointer"
          >
            <MdEdit className="inline text-sm" /> Edit
          </button>
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">First Name</h5>
            <p className="capitalize text-gray-600">{user.first_name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">Last Name</h5>
            <p className="capitalize text-gray-600">{user.last_name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">Email</h5>
            <p className="capitalize text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap  justify-between items-center md:gap-0 gap-4 bg-gray-200 rounded-sm p-5">
        <div className="flex flex-col gap-2">
          <h4 className="font-secondary text-2xl">Delete Account</h4>
          <p>
            Deleting your account is irreversible. All your workout progress and
            account details will be lost forever
          </p>
        </div>
        <button className="bg-gray-200 text-red-secondary flex flex-row items-center gap-1 py-1 px-2 rounded-sm cursor-pointer hover:bg-black hover:text-white">
          <FaRegTrashAlt className="inline text-sm" /> Delete Everything
        </button>
      </div>
    </div>
  );
};

ProfileTab.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileTab;
