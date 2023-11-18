import React from "react";
import AreaChart from "./graphs/area-chart";
import { StackedChart, StackedChartWrapper } from "./graphs/stacked-chart";

interface AreaProps {
  title: string;
  data: { name: string; data: { x: string; y: number }[]; color: string }[];
  chartType: "line" | "area";
  subtitle?: string;
  percentiles: number[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const InteractionLineChart = ({
  title,
  data,
  chartType,
  subtitle,
  percentiles,
  width,
  height,
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
      <StackedChartWrapper
        data={data}
        chartType={chartType}
        height={height}
        width={width}
      />
    </div>
  );
};

export default InteractionLineChart;
