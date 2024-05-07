import { Poppins } from "next/font/google";
import { CloudSnow } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <CloudSnow height="48" width="48" className="dark:hidden" />
      <CloudSnow height="48" width="48" className="hidden dark:block" />
      <p className={"text-xl md:text-2xl font-semibold " + font.className}>
        WeatherVoice
      </p>
    </div>
  );
};
