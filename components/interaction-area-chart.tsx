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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="my-2 bg-white text-xl font-bold text-black">{title}</p>
          <p className="text-sm text-gray-500">{subtitle ?? ""}</p>
        </div>
        <div className="flex rounded-lg border">
          <div className="border-r py-1 pl-3 pr-7">
            <div className="text-gray-500">1st Percentile</div>
            <div className="text-xl font-bold">{percentiles[0]}</div>
          </div>
          <div className="border-r py-1 pl-3 pr-7">
            <div className="text-gray-500">25th Percentile</div>
            <div className="text-xl font-bold">{percentiles[1]}</div>
          </div>
          <div className="border-r py-1 pl-3 pr-7">
            <div className="text-gray-500">50th Percentile</div>
            <div className="text-xl font-bold">{percentiles[2]}</div>
          </div>
          <div className="border-r py-1 pl-3 pr-7">
            <div className="text-gray-500">75th Percentile</div>
            <div className="text-xl font-bold">{percentiles[3]}</div>
          </div>
          <div className="py-1 pl-3 pr-7">
            <div className="text-gray-500">99th Percentile</div>
            <div className="text-xl font-bold">{percentiles[4]}</div>
          </div>
        </div>
      </div>
      <AreaChart
        data={data}
        width={width}
        height={height}
        margin={{ top: 5, right: 5, bottom: 0, left: -1 }}
        fill="#e0e7ff"
        stroke="#6366f1"
      />
      <p className="mt-3 text-center text-sm text-[#aebac9]">{item ?? ""}</p>
    </div>
  );
};

export default InteractionAreachart;
