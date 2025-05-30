import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import PropTypes from "prop-types";
import FormInput from "../../components/FormInput";
import { selectStyles } from "../../styles";
import { useGetCategoriesQuery } from "../../../../features/categories/categoriesApi";

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

const WorkoutForm = ({ onSubmit, defaultValues = {}, isSubmitting }) => {
  const { data: categoryOptions = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultValues.name || "",
      difficulty: defaultValues.difficulty
        ? intensityOptions.find((opt) => opt.value === defaultValues.difficulty)
        : null,
      category_id: defaultValues.category?.id
        ? categoryOptions.find(
            (opt) => opt.value === defaultValues.category?.id
          )
        : null,
      suggested_reps: defaultValues.suggested_reps || "",
      description: defaultValues.description || "",
      youtube_video_id:
        defaultValues.youtube_video_id
          ? `https://www.youtube.com/watch?v=${defaultValues.youtube_video_id}`
          : "",
    },
  });

  const submit = async (data) => {
    const demoId = extractYouTubeId(data.youtube_video_id);

    const payload = {
      ...data,
      difficulty: data.difficulty?.value,
      category_id: data.category_id?.value,
      youtube_video_id: demoId,
    };

    await onSubmit(payload, reset);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
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

      <div className="flex flex-col md:flex-row gap-3">
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
        disabled={isSubmitting}
        className="bg-red-secondary text-white font-secondary text-lg py-2 rounded-sm hover:cursor-pointer"
      >
        {isSubmitting ? "Saving..." : "Save Workout"}
      </button>
    </form>
  );
};

WorkoutForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isSubmitting: PropTypes.bool,
};

export default WorkoutForm;
