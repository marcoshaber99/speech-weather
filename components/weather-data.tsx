"use client";

import { useState, useEffect } from "react";
import { getWeatherData } from "../lib/openWeatherMap";
import { Spinner } from "./spinner";
import Image from "next/image";
import { createApi } from "unsplash-js";
import { toast } from "sonner";

import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
});

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  forecast: any[];
}

const getWeatherIcon = (iconCode: string) => {
  switch (iconCode.slice(0, 2)) {
    case "01":
      return <WiDaySunny size={60} />;
    case "02":
      return <WiDayCloudy size={60} />;
    case "03":
      return <WiCloud size={60} />;
    case "04":
      return <WiCloudy size={60} />;
    case "09":
      return <WiShowers size={60} />;
    case "10":
      return <WiRain size={60} />;
    case "11":
      return <WiThunderstorm size={60} />;
    case "13":
      return <WiSnow size={60} />;
    case "50":
      return <WiFog size={60} />;
    default:
      return <WiDaySunny size={60} />;
  }
};
export const WeatherData = ({ city }: { city: string }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imagesLoading, setImagesLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError("");
      setErrorMessage("");

      try {
        const data = await getWeatherData(city);
        if (data.cod === "404") {
          setErrorMessage("Invalid city. Please try again.");
          toast.error("Invalid city. Please try again.");
        } else {
          setWeatherData(data);
        }
      } catch (error) {
        setError("Failed to fetch weather data. Please try again.");
        toast.error("Failed to fetch weather data. Please try again.");
      }

      setLoading(false);
    };

    const fetchImage = async () => {
      setImagesLoading(true);
      setImageUrl("");

      try {
        const response = await unsplash.search.getPhotos({
          query: `${city}`,
          page: 1,
          perPage: 1,
          orientation: "landscape",
        });

        if (
          response.type === "success" &&
          response.response.results.length > 0
        ) {
          setImageUrl(response.response.results[0].urls.regular);
        }
      } catch (error) {
        console.error("Failed to fetch image from Unsplash:", error);
      }

      setImagesLoading(false);
    };

    if (city) {
      fetchWeatherData();
      fetchImage();
    } else {
      setWeatherData(null);
      setImageUrl("");
    }

    return () => {
      setWeatherData(null);
    };
  }, [city]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
            Invalid City
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            The city you entered is not valid. Please enter a valid city name
            and try again.
          </p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div
        className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Info:</strong>
        <span className="block sm:inline">
          Please say a valid city name to get the weather information.
        </span>
      </div>
    );
  }

  const { name, main, weather, wind, sys, forecast } = weatherData;

  const formatGraphData = (forecast: any[]) => {
    const uniqueDates = Array.from(
      new Set(
        forecast.map((item: any) =>
          new Date(item.dt * 1000).toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
          })
        )
      )
    ).slice(0, 7);

    return uniqueDates.map((date: string) => {
      const forecastItem = forecast.find(
        (item: any) =>
          new Date(item.dt * 1000).toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
          }) === date
      );

      return {
        date,
        temperature: Math.round(forecastItem.main.temp),
      };
    });
  };
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          {name}, {sys.country}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          {getWeatherIcon(weather[0].icon)}
          <div className="ml-4">
            <p className="text-5xl font-bold">{Math.round(main.temp)}°C</p>
            <p className="text-xl">{weather[0].description}</p>
          </div>
        </div>
        <div className="md:ml-8">
          {imagesLoading ? (
            <div className="w-full md:w-80 h-48 bg-gray-200 animate-pulse rounded-lg" />
          ) : (
            imageUrl && (
              <Image
                src={imageUrl}
                alt={`${name} city`}
                width={800}
                height={600}
                className="w-full md:w-80 h-48 object-cover rounded-lg"
              />
            )
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="text-lg font-semibold">Humidity</p>
          <p>{main.humidity}%</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Wind Speed</p>
          <p>{wind.speed} m/s</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Feels Like</p>
          <p>{Math.round(main.feels_like)}°C</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Min Temperature</p>
          <p>{Math.round(main.temp_min)}°C</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Max Temperature</p>
          <p>{Math.round(main.temp_max)}°C</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Pressure</p>
          <p>{main.pressure} hPa</p>
        </div>
      </div>

      <hr className="mt-8 border-t border-gray-300 dark:border-gray-600" />

      <div className="mt-8 dark:text-blue-200">
        <h3 className="text-xl font-semibold mb-4">{name} Forecast</h3>
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formatGraphData(forecast)}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="2 2" />
              <Tooltip formatter={(value) => `${value}°C`} />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
