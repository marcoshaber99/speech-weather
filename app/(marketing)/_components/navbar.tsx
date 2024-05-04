"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 w-full p-4 md:p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-x-4">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-blue-600 text-white"
                >
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">Sign Up</Button>
              </SignInButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <Button
                size="sm"
                className="bg-blue-600 text-white dark:hover:bg-blue-800"
                asChild
              >
                <Link href="/dashboard">Enter WeatherVoice</Link>
              </Button>
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>{" "}
            </>
          )}
          <div className="flex justify-center">
            <ModeToggle />
          </div>
        </div>

        <button
          className="md:hidden text-gray-600 dark:text-gray-400 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col gap-y-4">
            {isLoading && <Spinner />}
            {!isAuthenticated && !isLoading && (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="w-full">
                    Log in
                  </Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button size="sm" className="w-full">
                    Sign Up
                  </Button>
                </SignInButton>
              </>
            )}
            {isAuthenticated && !isLoading && (
              <>
                <Button
                  size="sm"
                  asChild
                  className="w-full bg-blue-600 text-white dark:hover:bg-blue-800"
                >
                  <Link href="/dashboard">Enter WeatherVoice</Link>
                </Button>
                <div className="flex justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>{" "}
              </>
            )}
            <div className="flex justify-center">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
