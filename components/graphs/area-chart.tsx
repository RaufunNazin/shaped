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

const data = [
  { date: "2012-04-11T07:00:00.000Z", close: 1 },
  { date: "2012-04-12T07:00:00.000Z", close: 3 },
  { date: "2012-04-13T07:00:00.000Z", close: 5 },
  { date: "2012-04-14T07:00:00.000Z", close: 8 },
  { date: "2012-04-15T07:00:00.000Z", close: 10 },
  { date: "2012-04-16T07:00:00.000Z", close: 12 },
  { date: "2012-04-17T07:00:00.000Z", close: 13 },
  { date: "2012-04-18T07:00:00.000Z", close: 14 },
  { date: "2012-04-19T07:00:00.000Z", close: 16 },
  { date: "2012-04-20T07:00:00.000Z", close: 18 },
  { date: "2012-04-21T07:00:00.000Z", close: 22 },
  { date: "2012-04-22T07:00:00.000Z", close: 25 },
  { date: "2012-04-23T07:00:00.000Z", close: 27 },
  { date: "2012-04-24T07:00:00.000Z", close: 31 },
  { date: "2012-04-25T07:00:00.000Z", close: 35 },
  { date: "2012-04-26T07:00:00.000Z", close: 38 },
  { date: "2012-04-27T07:00:00.000Z", close: 43 },
  { date: "2012-04-28T07:00:00.000Z", close: 45 },
  { date: "2012-04-29T07:00:00.000Z", close: 50 },
  { date: "2012-04-30T07:00:00.000Z", close: 80 },
];
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
  title: string;
  subtitle?: string;
  percentiles: number[];
  item: string;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default withTooltip<AreaProps, TooltipData>(
  ({
    title,
    subtitle,
    percentiles,
    item,
    width,
    height,
    margin = { top: -1, right: -1, bottom: -1, left: -1 },
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
      [innerWidth, margin.left]
    );
    const yScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, max(data, getDataValue) || 0],
          nice: true,
        }),
      [margin.top, innerHeight]
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
      [showTooltip, yScale, xScale]
    );

    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="my-2 text-black bg-white font-bold text-xl">
              {title}
            </p>
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
        <p className="text-[#aebac9] text-sm text-center mt-3">{item ?? ""}</p>
      </div>
    );
  }
);
