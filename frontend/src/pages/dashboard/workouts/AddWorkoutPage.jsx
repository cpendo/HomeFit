import { Link } from "react-router";
import FormInput from "../components/FormInput";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useGetCategoriesQuery } from "../../../features/categories/categoriesApi";
import Swal from "sweetalert2";
import { useAddWorkoutMutation } from "../../../features/workouts/workoutsApi";
import AskAISection from "./AskAISection";
import { useState } from "react";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    border: "0px solid gray",
    borderRadius: "4px",
    outline: state.isFocused ? "1px solid black" : "1px solid #99a1af",
  }),
};

const intensityOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const extractYouTubeId = (urlOrId) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = urlOrId.match(regex);
  if (match) return match[1];
  if (/^[\w-]{11}$/.test(urlOrId)) return urlOrId;
  return null;
};

const AddWorkoutPage = () => {
  const [askAIActive, setAskAIActive] = useState(true);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: categoryOptions = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const [addWorkout, { isLoading }] = useAddWorkoutMutation();

  const onSubmit = async (data) => {
    const demoId = extractYouTubeId(data.youtube_video_id);

    const payload = {
      ...data,
      difficulty: data.difficulty?.value,
      category_id: data.category_id?.value,
      youtube_video_id: demoId,
    };

    try {
      const response = await addWorkout(payload).unwrap();

      await Swal.fire("Add Workout Successful", response.message, "success");
      reset();
    } catch (error) {
      Swal.fire("Add Workout Failed", error?.data?.message, "error");
    }

    console.log("submitted", payload);
  };
  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between">
        <div>
          <Link
            to="/dashboard/workouts"
            className="flex flex-row items-center gap-1 text-base text-gray-500"
          >
            <IoIosArrowRoundBack className="inline text-2xl" />
            Back to workouts
          </Link>
          <h4 className="text-2xl font-secondary">Add New Workout</h4>
        </div>

        <button
          onClick={() => setAskAIActive(!askAIActive)}
          className="bg-red-secondary font-secondary text-white p-2 rounded-sm"
        >
          Use AI
        </button>
      </div>{" "}
      <div className="flex flex-row gap-4 ">
        <div className="flex-1 flex flex-col gap-2  w-full bg-gray-200 p-3 rounded-sm">
          <fieldset
            disabled={!askAIActive}
            className={`${
              !askAIActive ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex-1 flex flex-col gap-3 "
            >
              <FormInput
                label="Workout Name"
                id="name"
                type="text"
                register={register("name", {
                  required: "Name is required",
                })}
                error={errors.name}
                styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
              />

              <div className="flex flex-row gap-3">
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="">Workout Difficulty</label>
                  <Controller
                    name="difficulty"
                    control={control}
                    rules={{ required: "Difficulty is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select difficulty level"
                        isClearable
                        options={intensityOptions}
                        styles={selectStyles}
                        onChange={(val) => field.onChange(val)}
                      />
                    )}
                  />
                  {errors.difficulty && (
                    <span className="text-red-600 text-sm">
                      {errors.difficulty.message}
                    </span>
                  )}
                </div>

                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="">Workout Category</label>
                  <Controller
                    name="category_id"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select workout category"
                        isLoading={isLoadingCategories}
                        isSearchable
                        isClearable
                        options={categoryOptions}
                        styles={selectStyles}
                        onChange={(val) => field.onChange(val)}
                      />
                    )}
                  />
                  {errors.category_id && (
                    <span className="text-red-500 text-sm">
                      {errors.category_id.message}
                    </span>
                  )}
                </div>
              </div>

              <FormInput
                label="Reps"
                placeholder="3 sets of 45 secs, 2 sets of 10 , 1 full routine"
                id="suggested_reps"
                register={register("suggested_reps", {
                  required: "Reps is required",
                })}
                error={errors.suggested_reps}
                styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
              />

              <div className="flex flex-col">
                <label htmlFor="">
                  Workout Description{" "}
                  <span className="text-gray-500 text-sm">(optional)</span>
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  rows="2"
                  className="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
                ></textarea>
              </div>

              <FormInput
                label="Youtube Video"
                placeholder="https://www.youtube.com/watch?v=AVyRmOdNO0U"
                optional={true}
                id="youtube_video_id"
                type="url"
                register={register("youtube_video_id", {
                  validate: (value) => {
                    if (!value) return;
                    const id = extractYouTubeId(value);
                    return id ? true : "Invalid YouTube URL or ID";
                  },
                })}
                error={errors.youtube_video_id}
                styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
              />

              <button
                disabled={isLoading}
                className="bg-red-secondary text-white font-secondary text-lg py-2 rounded-sm hover:cursor-pointer"
              >
                {isLoading ? "Saving..." : "Save Workout"}
              </button>
            </form>
          </fieldset>
        </div>

        <div className="flex-1 flex flex-col gap-3  w-full bg-gray-200 p-3 rounded-sm">
          <AskAISection disabled={askAIActive} />
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutPage;
