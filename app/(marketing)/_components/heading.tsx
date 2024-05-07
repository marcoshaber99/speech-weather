"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Image from "next/image";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Speech to Weather in seconds
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        The best way to get weather updates using your voice.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button size="lg" asChild>
          <Link href="/dashboard">
            Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button size="lg">
            Get WeatherVoice
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}

      <div className="flex justify-center gap-2 pt-12">
        <Image
          className="hidden dark:block"
          src="/audio-dark.svg"
          width={175}
          height={175}
          alt="speech"
        />
        <Image
          className="dark:hidden"
          src="/audio.svg"
          width={175}
          height={175}
          alt="speech"
        />

        {/* arrow */}
        <Image
          className="hidden dark:block"
          src="/arrow-dark.svg"
          width={175}
          height={175}
          alt="speech"
        />
        <Image
          className="dark:hidden"
          src="/arrow.svg"
          width={175}
          height={175}
          alt="speech"
        />

        {/* weather  */}
        <Image
          className="hidden dark:block"
          src="/forecast-dark.svg"
          width={175}
          height={175}
          alt="speech"
        />
        <Image
          className="dark:hidden"
          src="/forecast.svg"
          width={175}
          height={175}
          alt="speech"
        />
      </div>
    </div>
  );
};
