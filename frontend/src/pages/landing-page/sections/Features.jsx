import FeaturesImg from "../../../assets/features-img.png";
import { IoBarChartSharp } from "react-icons/io5";
import { RiListSettingsLine, RiListCheck } from "react-icons/ri";

const features = [
  {
    name: "Workout tracking",
    description:
      " Log exercises, sets, reps, and durations to keep track of your progress.",
    icon: IoBarChartSharp,
  },
  {
    name: "Personalization",
    description:
      "Create personalized workout sets for different fitness goals (e.g.'Leg Day', 'Cardio Blast').",
    icon: RiListSettingsLine,
  },
  {
    name: "Exercise Library",
    description:
      "Explore a diverse range of exercises, complete with descriptions, and demonstrations.",
    icon: RiListCheck,
  },
];

const Features = () => {
  return (
    <section className="w-full flex flex-col items-center gap-12 bg-[#D3D3D3] sm:py-16 py-10">
      <h1 className="font-secondary sm:text-5xl text-4xl capitalize">what we offer</h1>

      <div className="w-[90%] flex lg:flex-row flex-col items-center gap-5 lg:h-[500px]">
        <div className="flex-2 h-full flex justify-center">
          <img
            src={FeaturesImg}
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="flex-1 h-full flex flex-col justify-center bg-black rounded-2xl opacity-85 p-6">
          <h1 className="text-4xl font-secondary font-extrabold tracking-wide text-red-secondary">
            We Elevate Your Fitness Journey
          </h1>

          <p className="font-light text-white text-lg py-4 leading-relaxed">
            Every workout counts, and we ensure you get the most out of every
            session. Our platform is designed to help you stay consistent, track
            your progress, and achieve real results.
          </p>

          <p className="text-xl text-gray-300 font-secondary font-medium">
            Whether you&apos;re a beginner or an experienced athlete, we provide
            the structure, tools, and motivation to keep you pushing forward.
          </p>
        </div>
      </div>

      <div className="w-[90%] grid md:grid-cols-3 grid-cols-1 gap-12 text-center">
        {features.map(({ name, description, icon: Icon }, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
          <Icon className="text-5xl text-red-secondary" />

          <h2 className="text-black font-secondary text-3xl ">
            {name}
          </h2>
          <p className="text-center font-light text-lg text-gray-700">
            {description}
          </p>
        </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
