import React from "react";
import AreaChart from "./graphs/area-chart";

interface AreaProps {
  title: string;
  data: { name: string; value: number }[];
  subtitle?: string;
  percentiles: number[];
  item: string;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const InteractionAreachart = ({
  title,
  data,
  subtitle,
  percentiles,
  item,
  width,
  height,
  margin = { top: -1, right: -1, bottom: -1, left: -1 },
}: AreaProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="my-2 text-black bg-white font-bold text-xl">{title}</p>
          <p className="text-gray-500 text-sm">{subtitle ?? ""}</p>
        </div>
        <div className="flex rounded-lg border">
          <div className="pl-3 pr-7 py-1 border-r">
            <div className="text-gray-500">1st Percentile</div>
            <div className="font-bold text-xl">{percentiles[0]}</div>
          </div>
          <div className="pl-3 pr-7 py-1 border-r">
            <div className="text-gray-500">25th Percentile</div>
            <div className="font-bold text-xl">{percentiles[1]}</div>
          </div>
          <div className="pl-3 pr-7 py-1 border-r">
            <div className="text-gray-500">50th Percentile</div>
            <div className="font-bold text-xl">{percentiles[2]}</div>
          </div>
          <div className="pl-3 pr-7 py-1 border-r">
            <div className="text-gray-500">75th Percentile</div>
            <div className="font-bold text-xl">{percentiles[3]}</div>
          </div>
          <div className="pl-3 pr-7 py-1">
            <div className="text-gray-500">99th Percentile</div>
            <div className="font-bold text-xl">{percentiles[4]}</div>
          </div>
        </div>
      </div>
      <AreaChart
        data={data}
        height={height}
        width={width}
        margin={{ top: -1, right: -1, bottom: -1, left: -1 }}
        fill="#e0e7ff"
        stroke="#6366f1"
      />
      <p className="text-[#aebac9] text-sm text-center mt-3">{item ?? ""}</p>
    </div>
  );
};

export default InteractionAreachart;
