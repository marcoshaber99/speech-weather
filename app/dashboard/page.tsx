"use client";

import { useState } from "react";
import { SpeechRecognitionComponent } from "../../components/speech-recognition";
import { WeatherData } from "@/components/weather-data";
import { Sidebar } from "@/components/sidebar";

const DashboardPage = () => {
  const [city, setCity] = useState("");

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 md:p-12 lg:p-16">
        <h1 className="text-4xl font-bold mb-8">Weather Dashboard</h1>
        <div className="mb-8">
          <SpeechRecognitionComponent onCityChange={handleCityChange} />
        </div>
        <WeatherData city={city} />
      </div>
    </div>
  );
};

export default DashboardPage;
