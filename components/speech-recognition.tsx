"use client";
import "regenerator-runtime/runtime";

import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "./ui/button";
import { Mic, StopCircle } from "lucide-react";

interface SpeechRecognitionComponentProps {
  onCityChange: (newCity: string) => void;
}

export const SpeechRecognitionComponent = ({
  onCityChange,
}: SpeechRecognitionComponentProps) => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    onCityChange(transcript);
    resetTranscript();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-xl font-semibold">Say the name of a city:</p>
      <div className="flex space-x-4">
        <Button
          onClick={startListening}
          disabled={isListening}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Mic className="h-6 w-6 mr-2" />
          Start Recording
        </Button>
        <Button
          onClick={stopListening}
          disabled={!isListening}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          <StopCircle className="h-6 w-6 mr-2" />
          Stop Recording
        </Button>
      </div>
      {transcript && <p className="text-lg">Recognized city: {transcript}</p>}
    </div>
  );
};
