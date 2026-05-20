import { FaDumbbell } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const QUICK_LINKS = [
  { text: "Features", href: "#features" },
  { text: "How it works", href: "#how-it-works" },
  { text: "FAQ", href: "#faq" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-paper text-ink">
      {/* Newsletter band */}
      <div className="border-t border-line">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-20 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h3 className="font-secondary uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Be the first to know.
            </h3>
            <p className="text-base text-ink/70 mt-2">
              New workouts and updates, straight to your inbox.
            </p>
          </div>
          <form
            className="lg:col-span-5 flex items-center gap-2 bg-white border border-line rounded-full pl-5 pr-1.5 py-1.5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 bg-transparent text-base text-ink placeholder:text-mute outline-none py-2"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-brand hover:bg-brand-dark text-white w-11 h-11 rounded-full transition-colors"
              aria-label="Subscribe"
            >
              <FaTelegramPlane className="text-base" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer band */}
      <div className="bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
          <div className="grid sm:grid-cols-12 gap-10 sm:gap-8">
            {/* Brand */}
            <div className="sm:col-span-7 flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <FaDumbbell className="size-8 text-brand rotate-90" />
                <span className="font-secondary uppercase text-3xl tracking-tight">
                  HomeFit
                </span>
              </div>
              <p className="text-paper/70 max-w-sm leading-relaxed">
                Customize your workouts, track every session, and stay in
                control of your fitness journey.
              </p>
            </div>

            {/* Links */}
            <div className="sm:col-span-5">
              <h4 className="font-secondary uppercase text-sm tracking-[0.18em] text-paper/60 mb-4">
                Explore
              </h4>
              <ul className="flex flex-col gap-2.5">
                {QUICK_LINKS.map(({ text, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-paper/85 hover:text-brand transition-colors"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-paper/15 mt-12 pt-6 flex flex-col sm:flex-row gap-2 justify-between text-sm text-paper/55">
            <p>© {new Date().getFullYear()} HomeFit.</p>
            <p>Built with React, Tailwind &amp; SQLite.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
