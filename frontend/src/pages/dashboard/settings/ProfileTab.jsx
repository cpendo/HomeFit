import PropTypes from "prop-types";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const ProfileTab = ({ user }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-5 border-2 border-dash-secondary rounded-sm p-5">
        <div className="flex flex-row justify-between items-center">
          <h4 className="font-secondary text-2xl">Personal information</h4>
          <button className="bg-gray-200 text-black flex flex-row items-center gap-1 py-1 px-2 rounded-sm">
            <MdEdit className="inline text-sm" /> Edit
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">First Name</h5>
            <p className="font-medium capitalize text-gray-700">
              {user.first_name}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">Last Name</h5>
            <p className="font-medium capitalize text-gray-600">
              {user.last_name}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">Email</h5>
            <p className="font-medium capitalize text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap  justify-between items-center md:gap-0 gap-4  border-2 border-dash-secondary rounded-sm p-5">
        <div className="flex flex-col gap-2">
          <h4 className="font-secondary text-2xl">Delete Account</h4>
          <p>
            Deleting your account is irreversible. All your workout progress and
            account details will be lost forever
          </p>
        </div>
        <button className="bg-gray-200 text-red-secondary flex flex-row items-center gap-1 py-1 px-2 rounded-sm hover:bg-black hover:text-white">
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
