import FeaturesImg from "../../../assets/features-img.png";
import { IoBarChartSharp } from "react-icons/io5";
import { RiListSettingsLine, RiListCheck } from "react-icons/ri";

const features = [
  {
    name: "Workout tracking",
    description:
      "Log exercises, sets, reps, and durations. See your progress build session by session.",
    icon: IoBarChartSharp,
  },
  {
    name: "Personalization",
    description:
      "Build workout sets around your goals — Leg Day, Cardio Blast, your own routines.",
    icon: RiListSettingsLine,
  },
  {
    name: "Exercise library",
    description:
      "Browse a diverse catalog of exercises with descriptions and video demos.",
    icon: RiListCheck,
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full bg-paper text-ink scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <div className="flex flex-col gap-4 max-w-2xl mb-12 sm:mb-16">
          <h2 className="font-secondary uppercase text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
            Built to keep you <span className="text-brand">consistent</span>.
          </h2>
        </div>

        {/* Editorial spotlight: image + statement */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-ink/5">
            <img
              src={FeaturesImg}
              alt="HomeFit interface"
              className="w-full h-full object-cover aspect-[16/10] lg:aspect-auto"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center gap-5">
            <h3 className="font-secondary uppercase text-3xl sm:text-4xl leading-tight tracking-tight">
              We elevate your{" "}
              <span className="text-brand">fitness journey</span>.
            </h3>
            <p className="text-base sm:text-lg text-ink/70 leading-relaxed">
              Every workout counts. HomeFit helps you stay consistent, track
              your progress, and see real results whether you&apos;re just
              starting or pushing your limits.
            </p>
            <p className="text-base text-ink/60">
              Beginner or experienced athlete, you get the structure, tools, and
              motivation to keep moving forward.
            </p>
          </div>
        </div>

        {/* Feature trio */}
        <div className="grid md:grid-cols-3 gap-5">
          {features.map(({ name, description, icon: Icon }) => (
            <article
              key={name}
              className="card flex flex-col gap-4 transition-colors hover:border-brand/40"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand/10 text-brand">
                <Icon className="text-xl" />
              </div>
              <h3 className="font-secondary uppercase text-2xl tracking-tight">
                {name}
              </h3>
              <p className="text-ink/70 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
