import React, { useMemo, useCallback, useEffect, useState } from "react";
import { AreaClosed, Line, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { scaleTime, scaleLinear, scaleBand } from "@visx/scale";
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { max, extent, bisector } from "@visx/vendor/d3-array";
import { localPoint } from "@visx/event";

type TooltipData = { name: string; value: number };

// accessors
const getName = (d: TooltipData) => d.name;
const getValue = (d: TooltipData) => d.value;
// const bisectDate = bisector<TooltipData, Date>((d) => new Date(d.name)).left;

export type AreaProps = {
  data: { name: string; value: number }[];
  width: number;
  height: number;
  targetValue?: number;
  fill?: string;
  stroke?: string;
  tooltipColor?: string;
  margin: { top: number; right: number; bottom: number; left: number };
};

export default withTooltip<AreaProps, TooltipData>(
  ({
    data,
    width,
    height,
    targetValue,
    margin,
    fill,
    stroke,
    tooltipColor,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;
    const [targetPosition, setTargetPosition] = useState<{
      x: number;
      y: number;
    } | null>(null);

    const tooltipStyles = {
      ...defaultStyles,
      background: "#6366f1",
      border: "1px solid white",
      color: tooltipColor ? tooltipColor : "white",
    };
    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // scales
    const xScale = useMemo(
      () =>
        scaleBand<string>({
          range: [margin.left, innerWidth + margin.left],
          domain: data.map((d) => d.name), // Reverse the order of the domain
        }),
      [data, innerWidth, margin.left]
    );
    const yScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, max(data, getValue) || 0],
          nice: true,
        }),
      [data, margin.top, innerHeight]
    );
    const tickValues = yScale.ticks(5);

    // tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };

        // Assuming xScale is now a scaleBand

        // Calculate the index based on the mouse position
        const index = Math.floor((x - margin.left) / xScale.bandwidth());

        // Ensure the index is within the valid range
        if (index >= 0 && index < data.length) {
          const d = data[index];

          showTooltip({
            tooltipData: d,
            tooltipLeft: xScale(d.name) + 3,
            tooltipTop: yScale(getValue(d)),
          });
        }
      },
      [data, showTooltip, yScale, xScale, margin.left, margin.top]
    );

    useEffect(() => {
      if (targetValue !== undefined) {
        const index = data.findIndex((d) => getValue(d) === targetValue);
        if (index !== -1) {
          const d = data[index];
          setTargetPosition({
            x: xScale(getName(d)) + margin.left + xScale.bandwidth() / 2,
            y: yScale(getValue(d)) + margin.top,
          });
        }
      }
    }, [data, targetValue, xScale, yScale, margin.left, margin.top]);

    return (
      <div className="flex">
        <div
          className={`flex flex-col justify-between h-[${height}] mr-2 text-[#aebac9]`}
        >
          {tickValues.reverse().map((tick: number, index: number) => {
            return (
              <div key={index} className="text-right">
                {tick}
              </div>
            );
          })}
        </div>
        <svg width={width} height={height} className="rounded-lg border">
          <rect x={0} y={0} width={width} height={height} fill="white" />
          <AreaClosed<TooltipData>
            data={data}
            x={(d) => xScale(getName(d)) ?? 0}
            y={(d) => yScale(getValue(d)) ?? 0}
            yScale={yScale}
            strokeWidth={2}
            fill={fill ? fill : "#cbd5e1"}
            stroke={stroke ? stroke : "#cbd5e1"}
            curve={curveMonotoneX}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={width}
            height={innerHeight}
            fill="transparent"
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {targetPosition && (
            <circle
              cx={targetPosition.x}
              cy={targetPosition.y - 5}
              r={4}
              fill={stroke}
              stroke="white"
              strokeWidth={2}
              pointerEvents="none"
            />
          )}
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={stroke ? stroke : "#000000"}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + margin.top - 4}
                r={4}
                fill={stroke}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + margin.top - 4}
                r={4}
                fill={stroke ? stroke : "#cbd5e1"}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12 + margin.top}
              left={tooltipLeft + 40}
              style={tooltipStyles}
            >
              {`${getValue(tooltipData)}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top}
              left={tooltipLeft + 17}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
              }}
            >
              {`${getName(tooltipData)}`}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
);
