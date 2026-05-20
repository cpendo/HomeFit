import { useState } from "react";
import {
  useCreateProfileMutation,
  useGetAllGoalsQuery,
} from "../../features/profiles/profilesApi";
import Select from "react-select";
import FormInput from "./components/FormInput";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLazyGetProfileQuery } from "../../features/users/usersApi";
import { FaDumbbell } from "react-icons/fa6";
import { selectStyles } from "./styles";

const UserProfile = () => {
  const { data: goalOptions, isLoading: isLoadingGoals } =
    useGetAllGoalsQuery();
  const [trigger] = useLazyGetProfileQuery();
  const [createProfile, { isLoading }] = useCreateProfileMutation();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!selectedGoal) {
      await Swal.fire("Failed", "Please select a fitness goal", "error");
      return;
    }
    const payload = { ...data, goal_id: selectedGoal.id };
    try {
      const response = await createProfile(payload).unwrap();
      await Swal.fire(response.message, "", "success");
      await trigger();
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      Swal.fire("Failed!", error?.data?.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-paper p-4 overflow-y-auto">
      <div className="min-h-full w-full flex flex-col items-center justify-center gap-6 py-8">
        <div className="flex items-center gap-1">
          <FaDumbbell className="size-7 text-brand rotate-90" />
          <span className="font-secondary text-3xl tracking-tight">
            HomeFit
          </span>
        </div>

        <div className="text-center max-w-md">
          <h1 className="font-secondary text-4xl sm:text-5xl tracking-tight uppercase">
            One more <span className="text-brand">step</span>.
          </h1>
          <p className="text-base text-ink/70 mt-2">
            Complete your profile to get personalized workouts.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white border border-line rounded-2xl p-5 sm:p-7 flex flex-col gap-4"
        >
          <FormInput
            label="Age"
            id="age"
            type="number"
            register={register("age", {
              required: "Age is required",
              min: { value: 10, message: "Must be at least 10" },
            })}
            error={errors.age}
          />

          <FormInput
            label="Weight (kg)"
            id="weight"
            type="number"
            register={register("weight", {
              required: "Weight is required",
              min: 20,
            })}
            error={errors.weight}
          />

          <FormInput
            label="Height (cm)"
            id="height"
            type="number"
            register={register("height", {
              required: "Height is required",
              min: 50,
            })}
            error={errors.height}
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-[0.14em] text-mute">
              Goal
            </label>
            <Select
              classNamePrefix="select"
              isLoading={isLoadingGoals}
              isClearable
              isSearchable
              placeholder="Pick your focus"
              options={goalOptions ?? []}
              value={selectedGoal}
              onChange={setSelectedGoal}
              styles={selectStyles}
            />
          </div>

          <button
            disabled={isLoading}
            className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full font-medium bg-ink text-paper hover:bg-brand transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving…" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
