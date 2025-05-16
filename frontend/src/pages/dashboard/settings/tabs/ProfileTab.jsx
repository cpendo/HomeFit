import { FaRegTrashAlt } from "react-icons/fa";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import ProfileDetailsForm from "./components/ProfileDetailsForm";

const ProfileTab = () => {
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
        <button className="bg-red-secondary text-white flex flex-row items-center gap-1 py-1 px-2 rounded-sm cursor-pointer hover:bg-black ">
          <FaRegTrashAlt className="inline text-sm" /> Delete Everything
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
