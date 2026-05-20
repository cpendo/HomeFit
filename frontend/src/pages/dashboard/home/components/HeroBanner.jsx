import { useGetProfileDataQuery } from "../../../../features/profiles/profilesApi";
import { useGetProfileQuery } from "../../../../features/users/usersApi";

const Stat = ({ label, value, suffix }) => (
  <div className="flex flex-col">
    <span className="text-xs uppercase tracking-[0.18em] text-mute">
      {label}
    </span>
    <span className="font-secondary text-3xl sm:text-4xl tracking-tight mt-1">
      {value}
      {suffix && (
        <span className="text-base text-mute font-primary ml-1">{suffix}</span>
      )}
    </span>
  </div>
);

const HeroBanner = () => {
  const { data: userResp, isLoading: loadingUser } = useGetProfileQuery();
  const { data: profile, isLoading: loadingProfile } = useGetProfileDataQuery();
  const user = userResp?.user;

  const isLoading = loadingUser || loadingProfile;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-ink text-paper px-6 sm:px-10 py-8 sm:py-10">
      <div
        aria-hidden
        className="absolute -right-16 -top-16 size-64 rounded-full bg-brand/15 blur-3xl"
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.22em] text-brand">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
            })}
            <span className="text-paper/40 mx-2">/</span>
            <span className="text-paper/60">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
          <h1 className="font-secondary text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[0.95]">
            Welcome back,{" "}
            <span className="text-brand">
              {isLoading ? "…" : user?.first_name || "athlete"}
            </span>
            .
          </h1>
          {profile?.goal?.label && (
            <p className="inline-flex items-center gap-2 text-sm sm:text-base text-paper/70">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Goal — {profile.goal.label}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-10 pt-5 lg:pt-0">
          {isLoading ? (
            <div className="col-span-3 h-12 bg-white/5 rounded animate-pulse" />
          ) : (
            <>
              <Stat label="Weight" value={profile?.weight ?? "—"} suffix="kg" />
              <Stat label="Height" value={profile?.height ?? "—"} suffix="cm" />
              <Stat label="Age" value={profile?.age ?? "—"} suffix="yrs" />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
