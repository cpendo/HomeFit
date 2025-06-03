import { useGetProfileDataQuery } from "../../../../features/profiles/profilesApi";
import { useGetProfileQuery } from "../../../../features/users/usersApi";
import BullsEyeImg from "../../../../assets/bullseye.png";

const UserProfile = () => {
  const {
    data: { user: userData },
    isLoading,
  } = useGetProfileQuery();
  const { data: profileData, isLoading: isLoadingProfile } =
    useGetProfileDataQuery();


  if (isLoading || isLoadingProfile)
    return (
      <div className="bg-gray-50 h-40 w-full rounded-sm animate-pulse"></div>
    );

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h3 className="capitalize font-secondary font-normal text-nowrap lg:text-2xl text-xl">
        Welcome, {userData?.first_name}!
      </h3>

      {/* user goal */}
      <p className="flex flex-row gap-2">
        <img
          src={BullsEyeImg}
          alt="Icon of a red bullseye"
          className="size-5"
        />
        <span> {profileData.goal.label} </span>
      </p>

      {/* user profile */}
      <div className="w-full flex flex-row justify-around bg-white shadow-lg rounded-sm py-2">
        <p className="flex flex-col">
          <span className="block text-sm ">Weight</span>
          <span className="font-bold text-lg tracking-tighter">{`${profileData.weight} kg`}</span>
        </p>
        <p className="flex flex-col">
          <span className="block text-sm">Height</span>
          <span className="font-bold text-lg tracking-tighter">{`${profileData.height} cm`}</span>{" "}
        </p>
        <p className="flex flex-col">
          <span className="block text-sm">Age</span>
          <span className="font-bold text-lg tracking-tighter">{`${profileData.age} yrs`}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
