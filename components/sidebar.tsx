"use client";

import Link from "next/link";
import { Home, Cloud, Settings, CloudSnow, Menu } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { SettingsModal } from "./settings-modal";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

export const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const currentPath = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/weather",
      label: "Your Weather",
      icon: <Cloud className="h-5 w-5" />,
    },
  ];

  if (isMobile) {
    return (
      <>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="fixed top-9 right-8 z-50 p-2 bg-blue-600 hover:bg-blue-800 rounded-full shadow-lg">
              <Menu height="24" width="24" className="text-white" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>WeatherVoice</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col space-y-4 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classNames(
                    "flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out",
                    {
                      "bg-gray-200 dark:bg-gray-700": currentPath === link.href,
                      "hover:bg-gray-200 dark:hover:bg-gray-600":
                        currentPath !== link.href,
                    }
                  )}
                >
                  {link.icon}
                  <span className="text-lg ml-2">{link.label}</span>
                </Link>
              ))}
              <span
                onClick={openSettings}
                className={classNames(
                  "flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out",
                  {
                    "bg-gray-200 dark:bg-gray-700": isSettingsOpen,
                    "hover:bg-gray-200 dark:hover:bg-gray-600": !isSettingsOpen,
                  }
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="text-lg ml-2">Settings</span>
              </span>
            </div>
            <DrawerClose />
          </DrawerContent>
        </Drawer>
        <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      </>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-b from-gray-100/50 to-gray-200 dark:from-[#23272F] dark:to-[#1b1e24] w-64 p-6 flex-shrink-0 hidden md:block shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-1">
            <CloudSnow height="30" width="30" className="dark:hidden" />
            <CloudSnow
              height="30"
              width="30"
              className="hidden dark:block text-blue-400"
            />
            <h2 className="text-md font-bold text-gray-800 dark:text-white">
              WeatherVoice
            </h2>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <nav>
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  className={classNames(
                    "w-full flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out justify-start",
                    {
                      "bg-gray-200 dark:bg-gray-700": currentPath === link.href,
                      "hover:bg-gray-200 dark:hover:bg-gray-600":
                        currentPath !== link.href,
                    }
                  )}
                >
                  {link.icon}
                  <span className="text-lg ml-2">{link.label}</span>
                </Link>
              </li>
            ))}
            <li className="w-full">
              <span
                onClick={openSettings}
                className={classNames(
                  "w-full flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out justify-start",
                  {
                    "bg-gray-200 dark:bg-gray-700": isSettingsOpen,
                    "hover:bg-gray-200 dark:hover:bg-gray-600": !isSettingsOpen,
                  }
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="text-lg ml-2">Settings</span>
              </span>
            </li>
          </ul>
        </nav>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
    </>
  );
};
