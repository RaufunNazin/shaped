import React, { useMemo, useCallback, useEffect } from "react";
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

type TooltipData = { name: string; value: number };

// accessors
const getName = (d: TooltipData) => d.name;
const getValue = (d: TooltipData) => d.value;
// const bisectDate = bisector<TooltipData, Date>((d) => new Date(d.name)).left;

export type AreaProps = {
  data: { name: string; value: number }[];
  width: number;
  height: number;
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
          domain: data.map((d) => d.name).reverse(), // Reverse the order of the domain
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
    // const handleTooltip = useCallback(
    //   (
    //     event:
    //       | React.TouchEvent<SVGRectElement>
    //       | React.MouseEvent<SVGRectElement>
    //   ) => {
    //     const { x } = localPoint(event) || { x: 0 };
    //     // Assuming xScale is now a scaleBand
    //     const x0 = xScale.invert(x);
    //     // Use Math.floor to get the index for the band
    //     const index = Math.floor(xScale(x0.toString()));
    //     const d0 = data[index - 1];
    //     const d1 = data[index];
    //     let d = d0;
    //     if (d1 && getName(d1)) {
    //       d =
    //         x0.valueOf() - getName(d0).valueOf() >
    //         getName(d1).valueOf() - x0.valueOf()
    //           ? d1
    //           : d0;
    //     }
    //     showTooltip({
    //       tooltipData: d,
    //       tooltipLeft: xScale(d.name) + xScale.bandwidth() / 2,
    //       tooltipTop: yScale(getValue(d)),
    //     });
    //   },
    //   [data, showTooltip, yScale, xScale]
    // );

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
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            // onTouchStart={handleTooltip}
            // onTouchMove={handleTooltip}
            // onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
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
                fill={fill ? fill : "#cbd5e1"}
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
              {`${getValue(tooltipData)}`}
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
              {"name"}
            </Tooltip> */}
          </div>
        )}
      </div>
    );
  }
);
