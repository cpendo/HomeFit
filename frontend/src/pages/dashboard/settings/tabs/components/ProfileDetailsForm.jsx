import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import {
  useGetAllGoalsQuery,
  useGetProfileDataQuery,
  useUpdateProfileMutation,
} from "../../../../../features/profiles/profilesApi";
import { useGetProfileQuery } from "../../../../../features/users/usersApi";
import Swal from "sweetalert2";

const ProfileDetailsForm = () => {
  const {
    data: { user },
  } = useGetProfileQuery();
  const { data: profileData, isLoading } = useGetProfileDataQuery();
  const { data: goalOptions, isLoading: isLoadingGoals } =
    useGetAllGoalsQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();

  const [editProfileDetails, setEditProfileDetails] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    weight: profileData?.weight || "",
    height: profileData?.height || "",
    age: profileData?.age || "",
    goal_id: profileData?.goal?.id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setProfileFormData({
      weight: profileData?.weight || "",
      height: profileData?.height || "",
      age: profileData?.age || "",
      goal_id: profileData?.goal?.id || "",
    });
    setEditProfileDetails(false);
  };

  const handleSave = async () => {
    const data = { ...profileFormData, id: user?.id };

    try {
      const response = await updateProfile(data).unwrap();
      await Swal.fire("Update Success!", response?.message, "success");
      setEditProfileDetails(false);
    } catch (error) {
      Swal.fire(
        "Update Failed!",
        error?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  useEffect(() => {
    if (profileData) {
      setProfileFormData({
        weight: profileData.weight || "",
        height: profileData.height || "",
        age: profileData.age || "",
        goal_id: profileData.goal?.id || "",
      });
    }
  }, [profileData]);

  return (
    <div className="flex flex-col gap-5 bg-gray-200 rounded-sm p-5">
      <div className="flex flex-row justify-between items-center">
        <h4 className="font-secondary text-2xl">Profile information</h4>
        {editProfileDetails ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isUpdatingProfile}
              className="bg-red-secondary text-white px-2 py-1 rounded-sm"
            >
              {isUpdatingProfile ? "Saving" : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isUpdatingProfile}
              className="bg-gray-400 text-black px-2 py-1 rounded-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditProfileDetails(true)}
            className="bg-gray-200 text-black flex flex-row items-center gap-1 py-1 px-2 rounded-sm hover:bg-red-secondary hover:text-white cursor-pointer"
          >
            <MdEdit className="inline text-sm" /> Edit
          </button>
        )}
      </div>

      <div className="flex flex-row gap-5">
        {[
          { label: "Weight (kgs)", name: "weight" },
          { label: "Height (cms)", name: "height" },
          { label: "Age", name: "age" },
        ].map((field) => (
          <div className="flex flex-col gap-1" key={field.name}>
            <label className="font-semibold">{field.label}</label>
            {isLoading ? (
              <p className="bg-gray-400 animate-pulse w-50 h-10 rounded-sm"></p>
            ) : (
              <input
                className={`bg-white  p-1 rounded-sm outline-none 
               ${
                 editProfileDetails
                   ? "border border-black"
                   : "border border-white cursor-not-allowed"
               }`}
                type="number"
                name={field.name}
                disabled={!editProfileDetails || isUpdatingProfile}
                value={profileFormData[field.name] ?? ""}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <h5 className="font-semibold">Goal</h5>
          {editProfileDetails ? (
            <select
              className="p-1 rounded-sm border border-black outline-none bg-white"
              name="goal_id"
              disabled={isUpdatingProfile}
              value={profileFormData.goal_id ?? ""}
              onChange={handleChange}
            >
              {!isLoadingGoals &&
                goalOptions.map((goal) => (
                  <option key={goal.id} value={goal.id}>
                    {goal.label}
                  </option>
                ))}
            </select>
          ) : (
            <input
              className="bg-white p-1 rounded-sm cursor-not-allowed"
              disabled
              value={
                goalOptions?.length
                  ? goalOptions.find(
                      (goal) => goal.id === Number(profileFormData.goal_id)
                    )?.label ?? ""
                  : "Loading..."
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsForm;
