import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateMutation,
} from "../../../../../features/users/usersApi";
import Swal from "sweetalert2";

const PersonalDetailsForm = () => {
  const {
    data: { user },
    isLoading,
  } = useGetProfileQuery();
  const [update, { isLoading: isUpdatingUser }] = useUpdateMutation();
  const [editPersonalDetails, setEditPersonalDetails] = useState(false);
  const [personalData, setPersonalData] = useState({
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setPersonalData({
      first_name: user.first_name,
      last_name: user.last_name,
    });
    setEditPersonalDetails(false);
  };

  const handleSave = async () => {
    const data = { ...personalData, id: user.id };
    console.log(data);

    try {
      const response = await update(data).unwrap();
      await Swal.fire("Update Success!", response?.message, "success");
      setEditPersonalDetails(false);

    } catch (error) {
      Swal.fire(
        "Update Failed!",
        error?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  useEffect(() => {
    if (user) {
      setPersonalData({
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-5 bg-gray-200 rounded-sm p-5">
      <div className="flex flex-row justify-between items-center">
        <h4 className="font-secondary text-2xl">Personal information</h4>
        {editPersonalDetails ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isUpdatingUser}
              className="bg-red-secondary text-white px-2 py-1 rounded-sm"
            >
              {isUpdatingUser ? "Saving" : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isUpdatingUser}
              className="bg-gray-400 text-black px-2 py-1 rounded-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditPersonalDetails(true)}
            className="bg-gray-200 text-black flex flex-row items-center gap-1 py-1 px-2 rounded-sm hover:bg-red-secondary hover:text-white cursor-pointer"
          >
            <MdEdit className="inline text-sm" /> Edit
          </button>
        )}
      </div>

      <div className="flex flex-row justify-start gap-20">
        {[
          { label: "First Name", name: "first_name" },
          { label: "Last Name", name: "last_name" },
        ].map((field) => (
          <div className="flex flex-col gap-1" key={field.name}>
            <label className="font-semibold">{field.label}</label>

            {isLoading ? (
              <p className="bg-gray-400 animate-pulse w-50 h-10 rounded-sm"></p>
            ) : (
              <input
                className={`bg-white capitalize p-1 rounded-sm outline-none ${
                  editPersonalDetails
                    ? "border border-black"
                    : "border border-white cursor-not-allowed"
                }`}
                name={field.name}
                disabled={!editPersonalDetails || isUpdatingUser}
                value={personalData[field.name]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <h5 className="font-semibold">Email</h5>
          <input
            className="w-70 lowercase bg-white p-1 rounded-sm cursor-not-allowed"
            disabled
            value={user.email}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
