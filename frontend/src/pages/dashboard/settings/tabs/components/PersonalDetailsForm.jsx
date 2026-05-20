import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateMutation,
} from "../../../../../features/users/usersApi";
import Swal from "sweetalert2";

const fieldLabel = "text-xs uppercase tracking-[0.14em] text-mute";

const PersonalDetailsForm = () => {
  const { data, isLoading } = useGetProfileQuery();
  const user = data?.user;
  const [update, { isLoading: isUpdatingUser }] = useUpdateMutation();
  const [editing, setEditing] = useState(false);
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
    setEditing(false);
  };

  const handleSave = async () => {
    const payload = { ...personalData, id: user.id };
    try {
      const response = await update(payload).unwrap();
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
    if (user) {
      setPersonalData({
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user]);

  return (
    <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-secondary text-2xl tracking-tight uppercase">
          Personal information
        </h3>
        {editing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isUpdatingUser}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-ink text-paper hover:bg-brand transition-colors disabled:opacity-50"
            >
              {isUpdatingUser ? "Saving" : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isUpdatingUser}
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "First name", name: "first_name" },
          { label: "Last name", name: "last_name" },
        ].map((field) => (
          <div className="flex flex-col gap-1" key={field.name}>
            <label className={fieldLabel}>{field.label}</label>
            {isLoading ? (
              <div className="h-10 bg-paper rounded-lg animate-pulse" />
            ) : (
              <input
                className={`bg-white capitalize px-3 py-2 rounded-lg text-sm outline-none transition-colors ${
                  editing
                    ? "border border-line focus:border-ink focus:ring-2 focus:ring-brand/15"
                    : "border border-transparent text-ink/70 cursor-not-allowed"
                }`}
                name={field.name}
                disabled={!editing || isUpdatingUser}
                value={personalData[field.name]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label className={fieldLabel}>Email</label>
          <input
            className="bg-white lowercase border border-transparent px-3 py-2 rounded-lg text-sm text-ink/70 cursor-not-allowed"
            disabled
            value={user?.email || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
