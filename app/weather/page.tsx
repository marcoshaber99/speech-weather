"use client";

import { Sidebar } from "@/components/sidebar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import { getWeatherIcon } from "@/components/weather-data";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { RiTempColdLine, RiTempHotLine } from "react-icons/ri";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

const WeatherPage: React.FC = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const savedCities = useQuery(api.weatherData.getAllWeatherDataByUser);

  useEffect(() => {
    if (isAuthenticated && savedCities) {
      setWeatherData(savedCities);
      setIsLoading(false);
    }
  }, [savedCities, isAuthenticated]);

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect("/");
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 md:p-12 lg:p-16 bg-[#f5f5f5] dark:bg-[#181A20]">
        <h1 className="text-4xl font-bold mb-8">Your Weather</h1>
        {weatherData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weatherData.map((data) => (
              <motion.div
                key={data.city}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FiMapPin className="text-2xl text-blue-500 mr-2" />
                    <h2 className="text-2xl font-bold">{data.city}</h2>
                  </div>
                  <div className="text-5xl">
                    {getWeatherIcon(data.data.weather[0].icon)}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-6xl font-bold text-blue-500">
                      {Math.round(data.data.main.temp)}°C
                    </p>
                    <p className="text-xl capitalize">
                      {data.data.weather[0].description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <WiHumidity className="text-2xl text-blue-500 mr-2" />
                    <div>
                      <p className="text-lg font-semibold">Humidity</p>
                      <p>{data.data.main.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <WiStrongWind className="text-2xl text-blue-500 mr-2" />
                    <div>
                      <p className="text-lg font-semibold">Wind Speed</p>
                      <p>{data.data.wind.speed} m/s</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <RiTempColdLine className="text-2xl text-blue-500 mr-2" />
                    <div>
                      <p className="text-lg font-semibold">Feels Like</p>
                      <p>{Math.round(data.data.main.feels_like)}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <WiBarometer className="text-2xl text-blue-500 mr-2" />
                    <div>
                      <p className="text-lg font-semibold">Pressure</p>
                      <p>{data.data.main.pressure} hPa</p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-md text-black dark:text-gray-400">
                  Last updated: {format(new Date(), "PPpp")}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-center">No weather data available.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
