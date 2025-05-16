import { useState } from "react";
import ProfileTab from "./tabs/ProfileTab";
import NotificationsTab from "./tabs/NotificationsTab";
import SecurityTab from "./tabs/SecurityTab";
import DataTab from "./tabs/DataTab";
import { useGetProfileQuery } from "../../../features/users/usersApi";
import LoadingPage from "../../../components/LoadingPage";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const {
    data: { user },
    isLoading,
  } = useGetProfileQuery();

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user} />;
      case "notifications":
        return <NotificationsTab />;
      case "security":
        return <SecurityTab />;
      case "data":
        return <DataTab />;
      default:
        return null;
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="w-full min-h-129 mx-auto bg-white rounded-sm mt-4">
      <div className="min-h-max pt-3  flex md:flex-row flex-col md:gap-0 gap-5 text-base settings-tab-wrapper">
        <div className="md:flex-[1] flex flex-col font-primary ps-4  rounded-l-lg ">
          <h2 className="text-4xl font-secondary pb-6 ">Settings</h2>

          <ul className="flex md:flex-col flex-row md:gap-3 gap-1 font-medium settings-tab md:overflow-x-hidden overflow-x-scroll whitespace-nowrap">
            <li
              onClick={() => setActiveTab("profile")}
              className={
                activeTab === "profile" ? "bg-red-secondary text-white" : " "
              }
            >
              Profile
            </li>
           
            <li
              onClick={() => setActiveTab("security")}
              className={
                activeTab === "security" ? "bg-red-secondary text-white" : ""
              }
            >
              Security
            </li>
            <li
              onClick={() => setActiveTab("data")}
              className={
                activeTab === "data" ? "bg-red-secondary text-white" : ""
              }
            >
              Data
            </li>
          </ul>
        </div>
        <div className="md:flex-[7] flex px-3">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
