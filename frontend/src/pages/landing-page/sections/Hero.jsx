import { Link } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import BannerImg from "../../../assets/banner-img.png";

const STATS = [
  { value: "100+", label: "Workouts" },
  { value: "16", label: "Categories" },
  { value: "0", label: "Equipment" },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full bg-paper text-ink scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-7 flex flex-col gap-7 fade-up">
            <h1 className="font-secondary uppercase text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
              Train. <span className="text-brand">Track.</span>
              <br />
              Transform.
            </h1>
            <p className="font-primary text-lg sm:text-xl text-ink/70 max-w-xl font-light leading-relaxed">
              Customize your workouts, log every session, and stay in control of
              your fitness journey with no gym required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center pt-2">
              <Link to="/auth/register">
                <button className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-brand transition-colors duration-300">
                  Get Started
                  <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-ink/80 hover:text-ink hover:bg-ink/5 transition-colors"
              >
                How it works
              </a>
            </div>

            {/* Stats row */}
            <dl className="grid grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-line max-w-md">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <dt className="font-secondary text-3xl sm:text-4xl">
                    {value}
                  </dt>
                  <dd className="text-xs uppercase tracking-[0.16em] text-mute mt-1">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Image */}
          <div className="lg:col-span-5 relative fade-up fade-up-2">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand/10">
              {/* Decorative offset block */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -right-3 w-full h-full rounded-2xl bg-brand/20 -z-0"
              />
              <img
                src={BannerImg}
                alt="Athlete training with dumbbells"
                className="relative z-10 w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
