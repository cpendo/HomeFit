import { Link } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import { LuBicepsFlexed } from "react-icons/lu";

const NotFound = () => {
  return (
    <main className="w-full min-h-[calc(100vh-3.5rem)] bg-paper text-ink flex items-center">
      <div className="max-w-6xl mx-auto w-full px-6 sm:px-8 py-16 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Copy */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <p className="font-secondary uppercase text-brand text-7xl sm:text-8xl leading-none tracking-tight">
            404
          </p>
          <h1 className="font-secondary uppercase text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
            Looks like a <span className="text-brand">rest day</span>.
          </h1>
          <p className="text-base sm:text-lg text-ink/70 max-w-md leading-relaxed">
            The page you&apos;re looking for isn&apos;t here. Head back to the
            homepage and pick up where you left off.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center pt-2">
            <Link to="/">
              <button className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-brand transition-colors">
                Back to homepage
                <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
            <a
              href="/#features"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-ink/80 hover:text-ink hover:bg-ink/5 transition-colors"
            >
              Browse features
            </a>
          </div>
        </div>

        {/* Vector illustration — scales crisply at any size */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            aria-hidden="true"
            className="relative aspect-square w-full max-w-sm rounded-3xl bg-brand/5 border border-brand/10 flex items-center justify-center"
          >
            <LuBicepsFlexed className="text-brand w-1/2 h-1/2" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
