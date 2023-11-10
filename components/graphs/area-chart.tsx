import React, { useMemo, useCallback, useEffect } from "react";
import { AreaClosed, Line, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { scaleTime, scaleLinear } from "@visx/scale";
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { max, extent, bisector } from "@visx/vendor/d3-array";

type TooltipData = { date: string; close: number };

const tooltipStyles = {
  ...defaultStyles,
  background: "#6366f1",
  border: "1px solid white",
  color: "white",
};

// accessors
const getDate = (d: TooltipData) => new Date(d.date);
const getDataValue = (d: TooltipData) => d.close;
const bisectDate = bisector<TooltipData, Date>((d) => new Date(d.date)).left;

export type AreaProps = {
  data: { date: string; close: number }[];
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
};

export default withTooltip<AreaProps, TooltipData>(
  ({
    data,
    width,
    height,
    margin,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // scales
    const xScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(data, getDate)?.reverse() as [Date, Date], // Reverse the order of the domain
        }),
      [data, innerWidth, margin.left]
    );
    const yScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, max(data, getDataValue) || 0],
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
        const x0 = xScale.invert(x);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: yScale(getDataValue(d)),
        });
      },
      [data, showTooltip, yScale, xScale]
    );

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
            x={(d) => xScale(getDate(d)) ?? 0}
            y={(d) => yScale(getDataValue(d)) ?? 0}
            yScale={yScale}
            strokeWidth={2}
            stroke="#6366f1"
            fill="#e0e7ff"
            curve={curveMonotoneX}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={"#6366f1"}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="white"
                fillOpacity={0.1}
                stroke="white"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={"#6366f1"}
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
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              {`${getDataValue(tooltipData)}`}
            </TooltipWithBounds>
            {/* <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
              }}
            >
              {"date"}
            </Tooltip> */}
          </div>
        )}
      </div>
    );
  }
);
