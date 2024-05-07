"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { FiMapPin, FiTrash2 } from "react-icons/fi";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { RiTempColdLine } from "react-icons/ri";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Spinner } from "@/components/spinner";
import { getWeatherIcon } from "@/components/weather-data";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

const WeatherPage: React.FC = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const savedCities = useQuery(api.weatherData.getAllWeatherDataByUser);
  const deleteWeatherDataByCity = useMutation(
    api.weatherData.deleteWeatherDataByCity
  );
  const deleteAllWeatherData = useMutation(
    api.weatherData.deleteWeatherDataByUser
  );

  useEffect(() => {
    if (isAuthenticated && savedCities) {
      setWeatherData(savedCities);
      setIsLoading(false);
    }
  }, [savedCities, isAuthenticated]);

  const handleDeleteWeatherDataByCity = async (city: string) => {
    const promise = deleteWeatherDataByCity({ city });
    toast.promise(promise, {
      loading: "Deleting weather data...",
      success: "Weather data deleted for" + city,
      error: "Failed to delete weather data for" + city,
      position: "bottom-center",
    });
    setWeatherData(weatherData.filter((data) => data.city !== city));
  };

  const handleDeleteAllWeatherData = async () => {
    const promise = deleteAllWeatherData();
    toast.promise(promise, {
      loading: "Deleting all weather data...",
      success: "All weather data deleted!",
      error: "Failed to delete all weather data.",
      position: "bottom-center",
    });
    setWeatherData([]);
  };

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
        <div className="flex flex-col mb-8 md:flex-row gap-16">
          <h1 className="text-4xl font-bold">Your Weather</h1>
          {weatherData.length > 0 && (
            <Button onClick={handleDeleteAllWeatherData} className="w-24">
              Delete All
            </Button>
          )}
        </div>
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
                <div className="flex items-center justify-between mt-6">
                  <p className="text-md text-black dark:text-gray-400">
                    Last updated: {format(new Date(), "dd/MM/yyyy HH:mm")}
                  </p>
                  <Button
                    className="bg-gray-200 hover:bg-red-700/10  dark:bg-red-100/10 dark:hover:bg-gray-800 text-red-600 focus:outline-none"
                    onClick={() => handleDeleteWeatherDataByCity(data.city)}
                  >
                    <TrashIcon className="h-6 w-6" />
                  </Button>
                </div>
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
