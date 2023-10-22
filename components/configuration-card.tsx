import React, { Dispatch, SetStateAction, useState } from "react";
import { Switch } from "./ui/switch";
import { DoubleSwitch } from "./ui/double-switch";

interface ConfigurationCardProps {
  algorithm: boolean;
  diversity: number;
  exploration: number;
  pagination: boolean;
  setDiversity: Dispatch<SetStateAction<number>>;
  setExploration: Dispatch<SetStateAction<number>>;
  onAlgorithmChange: Dispatch<SetStateAction<boolean>>;
  onDiversityChange: (value: string) => void;
  onExplorationChange: (value: string) => void;
  onPaginationChange: Dispatch<SetStateAction<boolean>>;
}

const ConfigurationCard = ({
  algorithm,
  diversity,
  exploration,
  pagination,
  setDiversity,
  setExploration,
  onAlgorithmChange,
  onDiversityChange,
  onExplorationChange,
  onPaginationChange,
}: ConfigurationCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-5">
      <div className="border rounded-2xl p-6 flex flex-col gap-y-4 h-[170px]">
        <div className="text-xl font-bold">Algorithm</div>
        <div className="flex gap-x-4 items-center">
          <div
            className={`text-sm font-medium ${
              !algorithm ? "text-blue-600" : "text-gray-500"
            }`}
          >
            Toplist
          </div>
          <DoubleSwitch
            checked={algorithm}
            onCheckedChange={(e) => onAlgorithmChange(e)}
          />
          <div
            className={`text-sm font-medium ${
              algorithm ? "text-blue-600" : "text-gray-500"
            }`}
          >
            Personalized
          </div>
        </div>
      </div>
      <div className="border rounded-2xl p-6 flex flex-col gap-y-4 h-[170px]">
        <div className="text-xl font-bold">Ordering</div>
        <div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 font-medium">Diversity</div>
            <div className="flex items-center">
              <input
                type="number"
                className="bg-purple-100 w-[35px] ring-0 outline-0 text-center text-purple-600 text-sm"
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
              <div className="bg-purple-100 text-purple-600 text-sm pr-2">
                %
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 font-medium">Exploration</div>
            <div className="flex items-center">
              <input
                type="number"
                className="bg-purple-100 w-[35px] ring-0 outline-0 text-center text-purple-600 text-sm"
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
              <div className="bg-purple-100 text-purple-600 text-sm pr-2">
                %
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-2xl p-6 flex flex-col gap-y-4 h-[170px]">
        <div className="text-xl font-bold">Other</div>
        <div className="flex gap-x-4 items-center">
          <div className="text-sm text-gray-500 font-medium">Pagination</div>
          <Switch
            checked={pagination}
            onCheckedChange={(e) => onPaginationChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigurationCard;
