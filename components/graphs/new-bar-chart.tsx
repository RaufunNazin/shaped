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
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
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

let tooltipTimeout: number;

const CustomBarChart = ({
  data,
  chartTitle,
  width,
  height,
  margin,
  minY = 1,
}: CustomBarChartProps) => {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<BarData>();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });
  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    maxWidth: 200,
    backgroundColor: "#E2E8F0",
    color: "black",
  };
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
    range: [height - margin.bottom - 20, margin.top],
  });

  const tickValues = yScale.ticks(5).filter((v) => v !== 0);

  return (
    <>
      <div className="h-70 flex items-center justify-center">
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
                (d.value / yMaxi) * 100 > 10
                  ? margin.top + yScale(d.value)
                  : (d.value / yMaxi) * 100 == 0
                  ? yMax - margin.top
                  : yMax - margin.top + 10 - Math.ceil((d.value / yMaxi) * 100)
              }
              height={
                (d.value / yMaxi) * 100 > 10
                  ? yMax - yScale(d.value)
                  : (d.value / yMaxi) * 100 == 0
                  ? 0
                  : Math.ceil((d.value / yMaxi) * 100)
              }
              width={xScale.bandwidth()}
              fill={"#CBD5E1"}
              onMouseLeave={() => {
                hideTooltip();
              }}
              onMouseMove={(event) => {
                if (tooltipTimeout) clearTimeout(tooltipTimeout);
                const left = event.clientX + 10;
                const top = event.clientY;
                showTooltip({
                  tooltipData: d,
                  tooltipTop: top,
                  tooltipLeft: left,
                });
              }}
            />
          ))}
          {xScale.domain().map((d) => (
            <g key={d}>
              <text
                x={margin.left + 10 + xScale(d)! + xScale.bandwidth() / 2}
                y={height - margin.bottom}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={12}
                opacity="0.8"
              >
                <tspan
                  x={margin.left + 10 + xScale(d)! + xScale.bandwidth() / 2}
                  dy="-0.5em"
                  className="overflow-hidden whitespace-normal break-all"
                >
                  {d.toString().slice(0, 12)}
                </tspan>
                <tspan
                  x={margin.left + 10 + xScale(d)! + xScale.bandwidth() / 2}
                  dy="1em"
                  className="overflow-hidden whitespace-normal break-all"
                >
                  {d.toString().length > 18
                    ? d.toString().slice(12, 18).concat("...")
                    : d.toString().length > 12
                    ? d.toString().slice(12, 18)
                    : ""}
                </tspan>
              </text>
            </g>
          ))}

          <g>
            {tickValues.map((tick, index) => (
              <text
                key={index}
                x={margin.left + 35}
                y={yScale(tick) + 10}
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

          {tooltipOpen && tooltipData && (
            <TooltipInPortal
              top={tooltipTop}
              left={tooltipLeft}
              style={tooltipStyles}
            >
              {tooltipData.alias.length > 18 && (
                <div>
                  <div className="overflow-hidden whitespace-normal break-all">
                    Name: {tooltipData.alias}
                  </div>
                  <br />
                </div>
              )}
              <div>Value: {tooltipData.value}</div>
            </TooltipInPortal>
          )}
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
