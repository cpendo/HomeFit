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

const fieldLabel = "text-xs uppercase tracking-[0.14em] text-mute";

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
      youtube_video_id: defaultValues.youtube_video_id
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
      className="flex flex-col gap-4"
    >
      <FormInput
        label="Workout name"
        id="name"
        type="text"
        register={register("name", { required: "Name is required" })}
        error={errors.name}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={fieldLabel}>Difficulty</label>
          <Controller
            name="difficulty"
            control={control}
            rules={{ required: "Difficulty is required" }}
            render={({ field }) => (
              <Select
                {...field}
                classNamePrefix="select"
                placeholder="Select difficulty"
                isClearable
                options={intensityOptions}
                styles={selectStyles}
                onChange={(val) => field.onChange(val)}
              />
            )}
          />
          {errors.difficulty && (
            <span className="text-brand text-xs">
              {errors.difficulty.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className={fieldLabel}>Category</label>
          <Controller
            name="category_id"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                classNamePrefix="select"
                placeholder="Select category"
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
            <span className="text-brand text-xs">
              {errors.category_id.message}
            </span>
          )}
        </div>
      </div>

      <FormInput
        label="Suggested reps"
        placeholder="3 sets of 45 secs, 2 sets of 10, 1 full routine"
        id="suggested_reps"
        register={register("suggested_reps", {
          required: "Reps is required",
        })}
        error={errors.suggested_reps}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className={fieldLabel}>
          Description <span className="normal-case ml-1">(optional)</span>
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows="3"
          className="bg-white border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-brand/15 transition-colors"
        />
      </div>

      <FormInput
        label="YouTube video"
        placeholder="https://www.youtube.com/watch?v=…"
        optional
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
      />

      <button
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full font-medium bg-ink text-paper hover:bg-brand transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving…" : "Save workout"}
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
