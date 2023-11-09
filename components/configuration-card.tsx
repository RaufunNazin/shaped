import React, { Dispatch, SetStateAction } from "react";
import { Switch } from "./ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Icons } from "./icons";

interface ConfigurationCardProps {
  algorithm: string;
  diversity: number;
  exploration: number;
  setDiversity: Dispatch<SetStateAction<number>>;
  setExploration: Dispatch<SetStateAction<number>>;
  onAlgorithmChange: Dispatch<SetStateAction<string>>;
  onDiversityChange: (value: string) => void;
  onExplorationChange: (value: string) => void;
}

const ConfigurationCard = ({
  algorithm,
  diversity,
  exploration,
  setDiversity,
  setExploration,
  onAlgorithmChange,
  onDiversityChange,
  onExplorationChange,
}: ConfigurationCardProps) => {
  const Info = Icons["infoSolid"];
  return (
    <div className="p-5">
      <p className="font-bold mb-3">Configuration</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* <div className="border rounded-2xl p-6 flex flex-col gap-y-4 h-[170px]">
        <div className="text-xl font-bold">Algorithm</div>
        <div className="flex gap-x-2 items-center">
          <button
            className={`${
              algorithm === "Personalized"
                ? "bg-[#6366f1] text-white"
                : "bg-[#f1f5f9] text-gray-500"
            } font-medium px-4 py-2 rounded-md`}
            onClick={() => onAlgorithmChange("Personalized")}
          >
            Personalized
          </button>
          <button
            className={`${
              algorithm === "Popular"
                ? "bg-[#6366f1] text-white"
                : "bg-[#f1f5f9] text-gray-500"
            } font-medium px-4 py-2 rounded-md`}
            onClick={() => onAlgorithmChange("Popular")}
          >
            Popular
          </button>
        </div>
      </div> */}
        <div className="border rounded-2xl p-6 flex flex-col gap-y-4 h-[170px]">
          <div className="text-xl font-bold">Ordering</div>
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <div className="text-sm text-gray-500 font-medium">
                  Diversity
                </div>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="hover:cursor-pointer">
                        <Info className="ml-4 h-4 w-4 text-gray-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Diversity</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center">
                <input
                  type="number"
                  className={`${
                    diversity === 0
                      ? "bg-gray-100 text-gray-500"
                      : "bg-blue-100 text-blue-600"
                  } w-[35px] ring-0 outline-0 text-center text-sm`}
                  value={diversity ? diversity : undefined}
                  onChange={(e) => onDiversityChange(e.target.value)}
                  onBlur={(e) => {
                    if (
                      e.target.value === "" ||
                      e.target.value === null ||
                      e.target.value === undefined ||
                      Number.isNaN(e.target.value)
                    ) {
                      setDiversity(0);
                      e.target.value = "0";
                    }
                  }}
                  min={0}
                  max={100}
                />
                <div
                  className={`${
                    diversity === 0
                      ? "bg-gray-100 text-gray-500"
                      : "bg-blue-100 text-blue-600"
                  } text-sm pr-2`}
                >
                  %
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <div className="text-sm text-gray-500 font-medium">
                  Exploration
                </div>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="hover:cursor-pointer">
                        <Info className="ml-4 h-4 w-4 text-gray-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Exploration</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  className={`${
                    exploration === 0
                      ? "bg-gray-100 text-gray-500"
                      : "bg-blue-100 text-blue-600"
                  } w-[35px] ring-0 outline-0 text-center text-sm`}
                  value={exploration ? exploration : undefined}
                  onChange={(e) => onExplorationChange(e.target.value)}
                  onBlur={(e) => {
                    if (
                      e.target.value === "" ||
                      e.target.value === null ||
                      e.target.value === undefined ||
                      Number.isNaN(e.target.value)
                    ) {
                      setExploration(0);
                      e.target.value = "0";
                    }
                  }}
                  min={0}
                  max={100}
                />
                <div
                  className={`${
                    exploration === 0
                      ? "bg-gray-100 text-gray-500"
                      : "bg-blue-100 text-blue-600"
                  } text-sm pr-2`}
                >
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationCard;
