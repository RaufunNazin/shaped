import React, { useState } from "react";
import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { BarData } from "@/types";

import { metricTooltip } from "@/config/metrics";
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
          />
          {data.map((d) => (
            <Bar
              key={d.alias}
              x={margin.left + 10 + xScale(d.alias)!}
              y={
                (d.value / data[0].value) * 100 > 5
                  ? margin.top + yScale(d.value)
                  : (d.value / data[0].value) * 100 == 0
                  ? yMax - margin.top
                  : (d.value / data[0].value) * 100 <= 1
                  ? yMax - margin.top + 5
                  : (d.value / data[0].value) * 100 <= 2
                  ? yMax - margin.top + 4
                  : (d.value / data[0].value) * 100 <= 3
                  ? yMax - margin.top + 3
                  : (d.value / data[0].value) * 100 <= 4
                  ? yMax - margin.top + 2
                  : (d.value / data[0].value) * 100 <= 5
                  ? yMax - margin.top + 1
                  : yMax - margin.top
              }
              height={
                (d.value / data[0].value) * 100 > 5
                  ? yMax - yScale(d.value)
                  : (d.value / data[0].value) * 100 == 0
                  ? 0
                  : (d.value / data[0].value) * 100 <= 1
                  ? 1
                  : (d.value / data[0].value) * 100 <= 2
                  ? 2
                  : (d.value / data[0].value) * 100 <= 3
                  ? 3
                  : (d.value / data[0].value) * 100 <= 4
                  ? 4
                  : (d.value / data[0].value) * 100 <= 5
                  ? 5
                  : 0
              }
              width={xScale.bandwidth()}
              fill={d.color}
            />
          ))}
          {xScale.domain().map((d) => (
            <g key={d}>
              <text
                x={margin.left + 22 + xScale(d)! + xScale.bandwidth() / 2}
                y={height - margin.bottom}
                textAnchor="end"
                dominantBaseline="middle"
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
                x={margin.left + 20}
                y={yScale(tick) + margin.top}
                textAnchor="end"
                color="#4F4F4F"
                opacity="0.8"
                dominantBaseline="middle"
                fontSize={12}
              >
                {tick < 1000
                  ? tick
                  : tick < 1000000
                  ? `${tick / 1000}K`
                  : `${tick / 1000000}M`}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </>
  );
};

interface TitledBarChartProps extends SingleDataPointGraph {}
const TitledBarChart = ({
  data,
  chartTitle,
  width,
  height,
  margin,
  minY = 1,
}: CustomBarChartProps) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="ml-8 text-xl font-bold">{chartTitle}</p>
      <CustomBarChart
        data={data}
        width={width}
        height={height}
        chartTitle={chartTitle}
        margin={margin}
      />
    </div>
  );
};

export { CustomBarChart, TitledBarChart };
