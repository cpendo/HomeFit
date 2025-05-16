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

const selectStyles = {
  control: (base, state) => ({
    ...base,
    border: "0px solid gray",
    borderRadius: "0px",
    outline: state.isFocused ? "1px solid black" : "1px solid gray",
  }),
};

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
    <div className="fixed top-0 left-0 w-screen max-h-fit h-screen min-h-screen z-50 bg-white p-4">
      <div className="w-full h-full flex flex-col justify-center items-center sm:gap-4 gap-2">
        <h1 className="text-red-secondary sm:text-4xl text-3xl font-secondary capitalize">
          One more Step
        </h1>
        <h3 className="text-center">
          Please complete your profile to get personalized workouts.
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sm:w-1/3 w-full bg-gray-200 px-4 py-4 flex flex-col gap-3"
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
            styles="bg-white border-1 border-gray-400 outline-none text-base p-1 focus:border-black"
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
            styles="bg-white border-1 border-gray-400 outline-none text-base p-1 focus:border-black"
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
            styles="bg-white border-1 border-gray-400 outline-none text-base p-1 focus:border-black"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="age" className="">
              Goal
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isLoading={isLoadingGoals}
              isClearable
              isSearchable
              name="color"
              options={goalOptions ?? {}}
              value={selectedGoal}
              onChange={setSelectedGoal}
              styles={selectStyles}
            />
          </div>

          <button
            disabled={isLoading}
            className="mt-6 bg-red-secondary text-white text-xl font-secondary py-2"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
