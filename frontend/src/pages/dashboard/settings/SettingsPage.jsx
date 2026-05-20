import { useState } from "react";
import ProfileTab from "./tabs/ProfileTab";
import SecurityTab from "./tabs/SecurityTab";
import { FaUser, FaLock } from "react-icons/fa6";

const tabs = [
  { id: "profile", label: "Profile", icon: FaUser },
  { id: "security", label: "Security", icon: FaLock },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "security":
        return <SecurityTab />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full pt-6 sm:pt-8 flex flex-col gap-5">
      <div>
        <h1 className="font-secondary text-3xl sm:text-4xl tracking-tight uppercase">
          Settings
        </h1>
        <p className="text-sm text-mute mt-1">
          Manage your account, profile details, and security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        <nav className="lg:sticky lg:top-20 lg:self-start">
          <ul className="flex flex-row lg:flex-col gap-1.5 bg-white border border-line rounded-2xl p-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <li key={id} className="flex-1 lg:flex-none">
                <button
                  onClick={() => setActiveTab(id)}
                  className={`w-full inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === id
                      ? "bg-ink text-paper"
                      : "text-ink/70 hover:bg-paper"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
