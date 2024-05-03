"use client";

import Link from "next/link";
import { Home, Cloud, Settings } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { SettingsModal } from "./settings-modal";

export const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 w-64 p-4 flex-shrink-0 hidden md:block">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">HaberWeather</h2>
          <UserButton afterSignOutUrl="/" />
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/weather"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <Cloud className="h-5 w-5" />
                <span>Weather</span>
              </Link>
            </li>
            <li>
              <button
                onClick={openSettings}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
    </>
  );
};
