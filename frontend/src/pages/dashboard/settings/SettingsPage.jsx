import { useState } from "react";
import ProfileTab from "./tabs/ProfileTab";
import SecurityTab from "./tabs/SecurityTab";
import DataTab from "./tabs/DataTab";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
 

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "security":
        return <SecurityTab />;
      case "data":
        return <DataTab />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-sm mt-4">
      <div className="flex flex-row min-h-max pt-6 settings-tab-wrapper">
        {/* Sidebar */}
        <div className="w-45 flex-shrink-0 font-primary">
          <h2 className="text-3xl font-secondary pb-6">Settings</h2>

          <ul className="flex flex-col gap-2 font-medium">
            {["profile", "security", "data"].map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-4 py-2 rounded-sm capitalize transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-red-secondary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-grow px-8">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
