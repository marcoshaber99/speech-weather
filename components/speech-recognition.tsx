"use client";
import "regenerator-runtime/runtime";

import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "./ui/button";
import { Mic, StopCircle } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="flex flex-col items-center space-y-6 mb-8 mt-6">
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-75"
          initial={{ scale: 0 }}
          animate={{ scale: isListening ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        <Button
          onClick={isListening ? stopListening : startListening}
          className="relative z-10 px-8 py-4 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isListening ? (
            <>
              <StopCircle className="w-6 h-6 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-6 h-6 mr-2" />
              Start Recording
            </>
          )}
        </Button>
      </div>
      {transcript && (
        <motion.p
          className="text-xl font-semibold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Recognized city: {transcript}
        </motion.p>
      )}
    </div>
  );
};
