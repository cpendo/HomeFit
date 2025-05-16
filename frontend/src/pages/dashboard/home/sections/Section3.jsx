import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
// import { FaEllipsis, FaCircleCheck } from "react-icons/fa6";

import { useGetProfileDataQuery } from "../../../../features/profiles/profilesApi";
import { useGetProfileQuery } from "../../../../features/users/usersApi";
import BullsEyeImg from "../../../../assets/bullseye.png";

const Section3 = () => {
  const {
    data: { user: userData },
    isLoading,
  } = useGetProfileQuery();
  const { data: profileData, isLoading: isLoadingProfile } =
    useGetProfileDataQuery();

  if (isLoading || isLoadingProfile) return "loading...";

  return (
    <div className="bg-gray-200 flex flex-col h-fit items-center gap-3 rounded-sm p-3">
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

      {/* Streak Calender -- Add the selected days from logs. Add red bg and white color for them*/}
      <div className="w-full flex justify-center py-2 bg-white rounded-sm ">
        <DayPicker
          mode="single"
          selected={new Date()}
          disabled //use this to disable days in the past and future
          className="text-base"
        />
      </div>

      {/* Total workouts logged */}
      <div className="w-full bg-white flex flex-col gap-2 py-2 rounded-sm">
        <h4 className="font-secondary text-2xl text-center">Workouts</h4>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col items-center">
            <span className="text-base capitalize">saved</span>
            <h5 className="font-bold text-3xl">30</h5>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base capitalize">logged</span>
            <h5 className="font-bold text-3xl">10</h5>
          </div>
        </div>
      </div>

      {/* Total setts logged */}

      <div className="w-full bg-white flex flex-col gap-2 py-2 rounded-sm">
        <h4 className="font-secondary text-2xl text-center">Sets</h4>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col items-center">
            <span className="text-base capitalize">saved</span>
            <h5 className="font-bold text-3xl">10</h5>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-base capitalize">logged</span>
            <h5 className="font-bold text-3xl">05</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
