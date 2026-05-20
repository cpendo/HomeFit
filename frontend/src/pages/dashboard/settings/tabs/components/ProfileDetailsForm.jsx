import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import {
  useGetAllGoalsQuery,
  useGetProfileDataQuery,
  useUpdateProfileMutation,
} from "../../../../../features/profiles/profilesApi";
import { useGetProfileQuery } from "../../../../../features/users/usersApi";
import Swal from "sweetalert2";

const fieldLabel = "text-xs uppercase tracking-[0.14em] text-mute";

const ProfileDetailsForm = () => {
  const { data: userData } = useGetProfileQuery();
  const user = userData?.user;
  const { data: profileData, isLoading } = useGetProfileDataQuery();
  const { data: goalOptions, isLoading: isLoadingGoals } =
    useGetAllGoalsQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    weight: "",
    height: "",
    age: "",
    goal_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setForm({
      weight: profileData?.weight || "",
      height: profileData?.height || "",
      age: profileData?.age || "",
      goal_id: profileData?.goal?.id || "",
    });
    setEditing(false);
  };

  const handleSave = async () => {
    const payload = { ...form, id: user?.id };
    try {
      const response = await updateProfile(payload).unwrap();
      await Swal.fire("Update Success!", response?.message, "success");
      setEditing(false);
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
      setForm({
        weight: profileData.weight || "",
        height: profileData.height || "",
        age: profileData.age || "",
        goal_id: profileData.goal?.id || "",
      });
    }
  }, [profileData]);

  return (
    <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-secondary text-2xl tracking-tight uppercase">
          Profile information
        </h3>
        {editing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isUpdatingProfile}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-ink text-paper hover:bg-brand transition-colors disabled:opacity-50"
            >
              {isUpdatingProfile ? "Saving" : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isUpdatingProfile}
              className="px-4 py-1.5 rounded-full text-sm font-medium border border-line text-ink hover:bg-ink/5"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm border border-line text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            <MdEdit className="size-3.5" /> Edit
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Weight (kg)", name: "weight" },
          { label: "Height (cm)", name: "height" },
          { label: "Age", name: "age" },
        ].map((field) => (
          <div className="flex flex-col gap-1" key={field.name}>
            <label className={fieldLabel}>{field.label}</label>
            {isLoading ? (
              <div className="h-10 bg-paper rounded-lg animate-pulse" />
            ) : (
              <input
                className={`bg-white px-3 py-2 rounded-lg text-sm outline-none transition-colors ${
                  editing
                    ? "border border-line focus:border-ink focus:ring-2 focus:ring-brand/15"
                    : "border border-transparent text-ink/70 cursor-not-allowed"
                }`}
                type="number"
                name={field.name}
                disabled={!editing || isUpdatingProfile}
                value={form[field.name] ?? ""}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label className={fieldLabel}>Goal</label>
          {editing ? (
            <select
              className="bg-white px-3 py-2 rounded-lg text-sm outline-none border border-line focus:border-ink focus:ring-2 focus:ring-brand/15 transition-colors"
              name="goal_id"
              disabled={isUpdatingProfile}
              value={form.goal_id ?? ""}
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
              className="bg-white border border-transparent px-3 py-2 rounded-lg text-sm text-ink/70 cursor-not-allowed"
              disabled
              value={
                goalOptions?.length
                  ? goalOptions.find(
                      (goal) => goal.id === Number(form.goal_id)
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
