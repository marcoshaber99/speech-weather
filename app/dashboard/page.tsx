"use client";

import { useState, useEffect } from "react";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { SpeechRecognitionComponent } from "../../components/speech-recognition";
import { WeatherData } from "@/components/weather-data";
import { Sidebar } from "@/components/sidebar";
import Image from "next/image";
import { getRandomCity } from "@/lib/random-city";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "../(marketing)/_components/logo";
import { RiErrorWarningFill } from "react-icons/ri";
import { toast } from "sonner";

const DashboardPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const [city, setCity] = useState("");
  const [displayedCity, setDisplayedCity] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasGuessed, setHasGuessed] = useState(false);

  useEffect(() => {
    const fetchRandomCity = async () => {
      setIsLoading(true);
      const randomCity = getRandomCity();
      setDisplayedCity(randomCity);
      setIsLoading(false);
    };
    fetchRandomCity();
  }, []);

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const isCorrectCity = newCity.toLowerCase() === displayedCity.toLowerCase();
    setIsCorrect(isCorrectCity);
    setHasGuessed(true);

    if (isCorrectCity) {
      toast.success("Congratulations! You said the correct city.");
    } else {
      toast.error("Cities do not match. Please try again.");
    }
  };

  const handleNewCity = () => {
    setCity("");
    setDisplayedCity(getRandomCity());
    setIsCorrect(false);
    setHasGuessed(false);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center animate-pulse">
        <Logo />
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen dark:bg-[#181A20]">
      <Sidebar />
      <div className="flex-1 justify-center items-center p-8 md:p-12 lg:p-16 mt-10 md:mt-4">
        <p className="text-2xl font-semibold text-center pb-6">
          Say the name of the city below to get the weather forecast
        </p>
        <div className="flex flex-col justify-center items-center mb-8">
          <div className="flex items-center gap-4">
            {isLoading ? (
              <p className="text-2xl font-semibold mb-4">Loading city...</p>
            ) : (
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg">
                  <p className="text-xl font-semibold">Say: {displayedCity}</p>
                </div>
                <Button onClick={handleNewCity} className="text-lg rounded-lg">
                  Try another city
                </Button>
              </motion.div>
            )}
          </div>
          <SpeechRecognitionComponent onCityChange={handleCityChange} />
        </div>
        {hasGuessed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isCorrect ? (
              <>
                <WeatherData city={city} />
              </>
            ) : (
              <div className="flex items-center justify-center mt-8">
                <RiErrorWarningFill className="text-red-500 w-16 h-16 mr-4" />
                <div className="bg-red-100 text-red-500 px-6 py-4 rounded-lg shadow-md">
                  <p className="text-xl font-semibold text-center">
                    Cities do not match. Please try again.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
