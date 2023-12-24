import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
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

type TooltipData = { name: string; value: number; percentile: number };

// Accessors
const getName = (d: TooltipData) => d.name;
const getValue = (d: TooltipData) => d.value;
const getPercentile = (d: TooltipData) => d.percentile;
const getNameShaped = (d: TooltipData) => d.name;
const getValueShaped = (d: TooltipData) => d.value;
const getPercentileShaped = (d: TooltipData) => d.percentile;

export type AreaProps = {
  data: any;
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
    data = [
      [
        {
          name: "yimTNi1C7UoR2c8TNorv",
          value: 2808,
          percentile: 100,
        },
        {
          name: "657d09dd682db25481042d87",
          value: 613,
          percentile: 99,
        },
        {
          name: "XPvOLQKHM8T5c7BEr1B2",
          value: 6,
          percentile: 97,
        },
        {
          name: "YlDiVJWdDkw2AwcTU6eb",
          value: 4,
          percentile: 95,
        },
        {
          name: "31ELOk3QArhRem7fisqU",
          value: 3,
          percentile: 93,
        },
        {
          name: "80OeZYgEwnLqESVSQNNZ",
          value: 3,
          percentile: 91,
        },
        {
          name: "WAIUne87paQquynFBzZ5",
          value: 3,
          percentile: 89,
        },
        {
          name: "7VWuaTkNzTpIPgzX0OJ3",
          value: 2,
          percentile: 87,
        },
        {
          name: "y6HJJmiqth3xFyUqYNC3",
          value: 2,
          percentile: 85,
        },
        {
          name: "2YbOMGJHmJTdqXh9g4bs",
          value: 2,
          percentile: 83,
        },
        {
          name: "657936fa885fd5bad3a7408b",
          value: 2,
          percentile: 81,
        },
        {
          name: "65835e8a98e0dcc3551e3f59",
          value: 2,
          percentile: 79,
        },
        {
          name: "657b800362d47791b21ac5e6",
          value: 1,
          percentile: 77,
        },
        {
          name: "NP4vbJO0I6irmkAKRzao",
          value: 1,
          percentile: 75,
        },
        {
          name: "FKHb5DYi9YXpkHkVUyfa",
          value: 1,
          percentile: 73,
        },
        {
          name: "ih2mxb2MMyqGpaDoAuZa",
          value: 1,
          percentile: 71,
        },
        {
          name: "N8rcLCXA9mH7TCNZz5Wr",
          value: 1,
          percentile: 69,
        },
        {
          name: "tE7lvzaWKJhhEVHRAW2V",
          value: 1,
          percentile: 67,
        },
        {
          name: "xyBeyVaBCOpWBeRABkQt",
          value: 1,
          percentile: 65,
        },
        {
          name: "657b75605b7844c699a26a68",
          value: 1,
          percentile: 63,
        },
        {
          name: "kCcQPKP4UOUJ0RbwrTuD",
          value: 1,
          percentile: 61,
        },
        {
          name: "6581ad2eaefd5a9cb36cb822",
          value: 1,
          percentile: 59,
        },
        {
          name: "yaDRPaUTGzblMmqZhPEr",
          value: 1,
          percentile: 57,
        },
        {
          name: "657a1ae0c9713fa269bca9e3",
          value: 0,
          percentile: 55,
        },
        {
          name: "nW0ZK7L7DDQQW9WSYkH8",
          value: 0,
          percentile: 53,
        },
        {
          name: "6582ef43367475d93fddf670",
          value: 0,
          percentile: 51,
        },
        {
          name: "4u540sQtSl8WXIlBJK71",
          value: 0,
          percentile: 49,
        },
        {
          name: "N4VTWQAlYcfWkDOq2Saa",
          value: 0,
          percentile: 47,
        },
        {
          name: "VXpjTIZ8GDw2x9CkNLrg",
          value: 0,
          percentile: 45,
        },
        {
          name: "6580b62f04550d1309ccc9d5",
          value: 0,
          percentile: 43,
        },
        {
          name: "roKhjWoMbC2RPs9x4veK",
          value: 0,
          percentile: 41,
        },
        {
          name: "1GeJJQh6czFVJD2GKVJd",
          value: 0,
          percentile: 39,
        },
        {
          name: "q2B1VQyHDNMLfm8qtzeG",
          value: 0,
          percentile: 37,
        },
        {
          name: "fKi1vGEB7qGBw70q3rXG",
          value: 0,
          percentile: 35,
        },
        {
          name: "P8Es7VOT9zzuB3eaSBp2",
          value: 0,
          percentile: 33,
        },
        {
          name: "aZf5VtLEDeyxrT9eSqG0",
          value: 0,
          percentile: 31,
        },
        {
          name: "PEehMEgRPgTHPwED5AUQ",
          value: 0,
          percentile: 29,
        },
        {
          name: "0MOjHxkLp0y8wCR9HZZH",
          value: 0,
          percentile: 27,
        },
        {
          name: "657d18b5ccb2a497c02248a0",
          value: 0,
          percentile: 25,
        },
        {
          name: "5fQjH0tfdELLP5yrBwPy",
          value: 0,
          percentile: 23,
        },
        {
          name: "658383007e1eac2fa138a2c5",
          value: 0,
          percentile: 21,
        },
        {
          name: "657a1e73a94442b88cd822fb",
          value: 0,
          percentile: 19,
        },
        {
          name: "6580fae07e53b26f04c49cdf",
          value: 0,
          percentile: 17,
        },
        {
          name: "9wMYQAjJefkzoMXjVn9o",
          value: 0,
          percentile: 15,
        },
        {
          name: "UN1HStEVVb4zoHEFMlbb",
          value: 0,
          percentile: 13,
        },
        {
          name: "7DPKorL23mSCqvZqQth7",
          value: 0,
          percentile: 11,
        },
        {
          name: "SF2EAeZvRWmuoJ96vKbl",
          value: 0,
          percentile: 9,
        },
        {
          name: "sRCN1dNuqmTvGF1Si40I",
          value: 0,
          percentile: 7,
        },
        {
          name: "9ZAv8mMze3LEJjZo9FyW",
          value: 0,
          percentile: 5,
        },
        {
          name: "TypyNz0s6TnwmdhPfICh",
          value: 0,
          percentile: 3,
        },
        {
          name: "6AeDJBITx4TbtrnowX20",
          value: 0,
          percentile: 1,
        },
      ],
      [
        { name: "newName1", value: 1, percentile: 78 },
        { name: "newName2", value: 2, percentile: 90 },
        { name: "newName3", value: 3, percentile: 65 },
        { name: "newName4", value: 4, percentile: 12 },
        { name: "newName5", value: 5, percentile: 34 },
        { name: "newName6", value: 6, percentile: 56 },
        { name: "newName7", value: 7, percentile: 78 },
        { name: "newName8", value: 8, percentile: 90 },
        { name: "newName9", value: 9, percentile: 65 },
        { name: "newName10", value: 10, percentile: 12 },
        { name: "newName11", value: 11, percentile: 34 },
        { name: "newName12", value: 12, percentile: 56 },
        { name: "newName13", value: 13, percentile: 78 },
        { name: "newName14", value: 14, percentile: 90 },
        { name: "newName15", value: 15, percentile: 65 },
        { name: "newName16", value: 16, percentile: 12 },
        { name: "newName17", value: 17, percentile: 34 },
        { name: "newName18", value: 18, percentile: 56 },
        { name: "newName19", value: 19, percentile: 78 },
        { name: "newName20", value: 20, percentile: 90 },
        { name: "newName21", value: 21, percentile: 65 },
        { name: "newName22", value: 22, percentile: 12 },
        { name: "newName23", value: 23, percentile: 34 },
        { name: "newName24", value: 24, percentile: 56 },
        { name: "newName25", value: 25, percentile: 78 },
        { name: "newName26", value: 26, percentile: 90 },
        { name: "newName27", value: 27, percentile: 65 },
        { name: "newName28", value: 28, percentile: 12 },
        { name: "newName29", value: 29, percentile: 34 },
        { name: "newName30", value: 30, percentile: 56 },
        { name: "newName31", value: 31, percentile: 78 },
        { name: "newName32", value: 32, percentile: 90 },
        { name: "newName33", value: 33, percentile: 65 },
        { name: "newName34", value: 34, percentile: 12 },
        { name: "newName35", value: 35, percentile: 34 },
        { name: "newName36", value: 36, percentile: 56 },
        { name: "newName37", value: 37, percentile: 78 },
        { name: "newName38", value: 38, percentile: 90 },
        { name: "newName39", value: 39, percentile: 65 },
        { name: "newName40", value: 40, percentile: 12 },
      ],
    ],
    width,
    height,
    targetValue,
    margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
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

    const tickRef = useRef<any>(null);

    const [tickValueWidth, setTickValueWidth] = useState(30);

    const tooltipStyles = {
      ...defaultStyles,
      background: "#6366f1",
      border: "1px solid white",
      color: tooltipColor ? tooltipColor : "white",
    };
    // Bounds
    const innerWidth = width - 5 - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = useMemo(
      () =>
        scaleBand<string>({
          range: [margin.left, innerWidth + margin.left - 70],
          domain: data[0].map((d: any) => d.name),
        }),
      [data, innerWidth, margin.left]
    );
    const xScaleShaped = useMemo(
      () =>
        scaleBand<string>({
          range: [margin.left, innerWidth + margin.left - 70],
          domain: data[1].map((d: any) => d.name),
        }),
      [data, innerWidth, margin.left]
    );
    const yScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, max(data[0], getValue) || 0],
          nice: true,
        }),
      [data, margin.top, innerHeight]
    );
    const yScaleShaped = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, max(data[1], getValue) || 0],
          nice: true,
        }),
      [data, margin.top, innerHeight]
    );
    const tickValues = yScale.ticks(5);
    const tickValuesShaped = yScaleShaped.ticks(5);

    // Tooltip handler
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
        if (index >= 0 && index < data[0].length) {
          const d = data[0][index];

          showTooltip({
            tooltipData: d,
            tooltipLeft: xScale(d.name)! + 3,
            tooltipTop: yScale(getValue(d)),
          });
        }
      },
      [data, showTooltip, yScale, xScale, margin.left]
    );

    useEffect(() => {
      if (tickRef.current) setTickValueWidth(tickRef.current.clientWidth);
    }, []);

    useEffect(() => {
      if (targetValue !== undefined && data[0].length > 0) {
        let closestIndex = 0;
        let closestDifference = Math.abs(getValue(data[0]) - targetValue);

        for (let i = 1; i < data.length; i++) {
          const difference = Math.abs(getValue(data[i]) - targetValue);

          if (difference < closestDifference) {
            closestIndex = i;
            closestDifference = difference;
          }
        }

        const closestData = data[closestIndex];

        setTargetPosition({
          x: xScale(getName(closestData))! + 3,
          y: yScale(getValue(closestData)) - 2,
        });
      }
    }, [data, targetValue, xScale, yScale, margin.left, margin.top]);

    return (
      <div className="flex">
        <div
          className={`flex flex-col justify-between h-[${height}px] mr-2 text-[#aebac9]`}
          ref={tickRef}
        >
          {data.length > 0 &&
            tickValues.reverse().map((tick: number, index: number) => {
              return (
                <div key={index} className="text-right">
                  {tick}
                </div>
              );
            })}
        </div>
        <svg
          width={innerWidth - tickValueWidth}
          height={height}
          className="rounded-lg border"
        >
          <rect
            x={0}
            y={0}
            width={innerWidth - tickValueWidth}
            height={height}
            fill="white"
          />
          <AreaClosed<TooltipData>
            data={data[0]}
            x={(d) => xScale(getName(d)) ?? 0}
            y={(d) => yScale(getValue(d)) ?? 0}
            yScale={yScale}
            strokeWidth={2}
            fill={fill ? fill : "#cbd5e1"}
            fillOpacity={0.5}
            stroke={stroke ? stroke : "#cbd5e1"}
            curve={curveMonotoneX}
          />
          {data.length > 1 && (
            <AreaClosed<TooltipData>
              data={data[1]}
              x={(d) => xScaleShaped(getName(d)) ?? 0}
              y={(d) => yScaleShaped(getValue(d)) ?? 0}
              yScale={yScale}
              strokeWidth={2}
              fill={"ff0000"}
              fillOpacity={0.5}
              stroke={stroke ? stroke : "#cbd5e1"}
              curve={curveMonotoneX}
            />
          )}

          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth - tickValueWidth}
            height={height}
            fill="transparent"
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {targetPosition && (
            <g>
              <circle
                cx={targetPosition.x - 1}
                cy={targetPosition.y + 1}
                r={4}
                fill="#6366F1"
                pointerEvents="none"
              />
              <Line
                from={{ x: targetPosition.x - 1, y: 0 }}
                to={{ x: targetPosition.x - 1, y: innerHeight + margin.top }}
                stroke={"#6366f1"}
                strokeWidth={1}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
            </g>
          )}
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={"#6366f1"}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft - 1}
                cy={tooltipTop + margin.top - 1}
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
              top={tooltipTop - 12 + margin.top}
              left={
                tooltipLeft + 150 > width - 30
                  ? Math.max(0, width - 150) // Move to the left if going out on the right
                  : tooltipLeft + 40
              }
              style={tooltipStyles}
            >
              <div className="max-w-[150px] overflow-auto whitespace-normal break-all">
                <div className="text-sm">
                  percentile: {getPercentile(tooltipData)}
                </div>
                <div className="text-sm">
                  percentile: {getPercentileShaped(tooltipData)}
                </div>
                <div className="text-sm">value: {getValue(tooltipData)}</div>
                <div className="text-sm">value: {getValueShaped(tooltipData)}</div>
              </div>
            </TooltipWithBounds>
          </div>
        )}
      </div>
    );
  }
);
