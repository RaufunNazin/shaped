import React, { useState } from "react";
import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { BarData } from "@/types";

// import { metricTooltip } from "@/config/metrics";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
interface SingleDataPointGraph {
  chartTitle?: string;
  data: BarData[];
}

interface CustomBarChartProps extends SingleDataPointGraph {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  minY?: number;
}

const CustomBarChart = ({
  data,
  chartTitle,
  width,
  height,
  margin,
  minY = 1,
}: CustomBarChartProps) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom - 20;

  const xScale = scaleBand<string>({
    domain: data.map((d) => d.alias),
    range: [0, xMax],
    padding: 0.3,
  });
  const yMin = 0;
  const yMaxi = Math.max(...data.map((d) => d.value));

  const yScale = scaleLinear<number>({
    domain: [yMin, yMaxi],
    range: [height - margin.bottom, margin.top],
  });

  const tickValues = yScale.ticks(5).filter((v) => v !== 0);

  return (
    <>
      <div className="h-70 flex items-center justify-center ">
        <svg width={width} height={height + 20}>
          <rect
            x={margin.left}
            y={margin.top}
            width={xMax}
            height={yMax}
            fill="none"
            stroke="#ECECEC"
          />
          {data.map((d) => (
            <Bar
              key={d.alias}
              x={margin.left + xScale(d.alias)!}
              y={margin.top + yScale(d.value)}
              height={yMax - yScale(d.value)}
              width={xScale.bandwidth()}
              fill={d.color}
            />
          ))}
          {xScale.domain().map((d) => (
            <g key={d}>
              <text
                x={margin.left + 5 + xScale(d)! + xScale.bandwidth() / 2}
                y={height - margin.bottom}
                textAnchor="end"
                dominantBaseline="middle"
                transform={`rotate(270 ${
                  margin.left + xScale(d)! + xScale.bandwidth() / 2
                },${height - margin.bottom})`}
                fontSize={12}
                opacity="0.8"
              >
                {d}
              </text>
            </g>
          ))}

          <g>
            {tickValues.map((tick, index) => (
              <text
                key={index}
                x={margin.left - 10}
                y={yScale(tick) + margin.top}
                textAnchor="end"
                color="#4F4F4F"
                opacity="0.8"
                dominantBaseline="middle"
                fontSize={12}
              >
                {chartTitle == "Coverage" ? `${tick * 100}%` : `${tick}`}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </>
  );
};

interface TitledBarChartProps extends SingleDataPointGraph {}
const TitledBarChart = ({ chartTitle, data }: TitledBarChartProps) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {chartTitle!.toLowerCase() ? (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="ml-8 text-xl font-bold hover:cursor-pointer">
                {chartTitle}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{chartTitle!.toLowerCase() ?? ""}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <p className="ml-8 text-xl font-bold">{chartTitle}</p>
      )}
      <CustomBarChart
        data={data}
        width={240}
        height={320}
        chartTitle={chartTitle}
        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
      />
    </div>
  );
};

export { CustomBarChart, TitledBarChart };
