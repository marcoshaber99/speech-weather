"use client";

import { useState, useEffect } from "react";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { SpeechRecognitionComponent } from "../../components/speech-recognition";
import { WeatherData } from "@/components/weather-data";
import { Sidebar } from "@/components/sidebar";
import Image from "next/image";

const DashboardPage = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [city, setCity] = useState("");

  useEffect(() => {
    // Retrieve the last selected city from local storage
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      setCity(storedCity);
    }
  }, []);

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    // Store the selected city in local storage
    localStorage.setItem("selectedCity", newCity);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Image
          src="/cloud.svg"
          alt="WeatherVoice"
          width={64}
          height={64}
          className="animate-spin dark:hidden"
        />
        <Image
          src="/cloud-dark.svg"
          alt="WeatherVoice"
          width={64}
          height={64}
          className="animate-spin"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect the user to the login page if not authenticated
    redirect("/");
  }

  return (
    <div className="flex min-h-screen dark:bg-[#181A20]">
      <Sidebar />
      <div className="flex-1 p-8 md:p-12 lg:p-16 mt-8">
        {/* <h1 className="text-4xl font-bold mb-8">Weather Dashboard</h1> */}
        <div className="mb-8">
          <SpeechRecognitionComponent onCityChange={handleCityChange} />
        </div>
        <WeatherData city={city} />
      </div>
    </div>
  );
};

export default DashboardPage;
