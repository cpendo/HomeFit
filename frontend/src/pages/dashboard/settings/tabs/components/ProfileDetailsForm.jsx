import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import {
  useGetAllGoalsQuery,
  useGetProfileDataQuery,
} from "../../../../../features/profiles/profilesApi";

const ProfileDetailsForm = () => {
  const { data: profileData, isLoading } = useGetProfileDataQuery();
  const { data: goalOptions, isLoading: isLoadingGoals } =
    useGetAllGoalsQuery();
  const [editProfileDetails, setEditProfileDetails] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    weight: profileData?.weight || "",
    height: profileData?.height || "",
    age: profileData?.age || "",
    goal: profileData?.goal?.id || "",
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
      goal: profileData?.goal?.id || "",
    });
    setEditProfileDetails(false);
  };

  const handleSave = () => {
    console.log(profileFormData);
    // TODO: Send updated profileFormData to backend
    // setEditProfileDetails(false);
  };

  useEffect(() => {
    if (profileData) {
      setProfileFormData({
        weight: profileData.weight || "",
        height: profileData.height || "",
        age: profileData.age || "",
        goal: profileData.goal || { id: "", label: "" },
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
              className="bg-red-secondary text-white px-2 py-1 rounded-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
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
                name={field.name}
                disabled={!editProfileDetails}
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
              name="goal"
              value={profileFormData.goal.id ?? ""}
              onChange={(e) =>
                setProfileFormData((prev) => ({
                  ...prev,
                  goal: goalOptions.find(
                    (goal) => goal.id === Number(e.target.value)
                  ),
                }))
              }
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
              value={profileFormData?.goal?.label ?? ""}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsForm;
