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
const getName = (d: TooltipData) => d?.name;
const getValue = (d: TooltipData) => d?.value;
const getPercentile = (d: TooltipData) => d?.percentile;

export type AreaProps = {
  data: { name: string; value: number; percentile: number }[];
  shapedData?: { name: string; value: number; percentile: number }[];
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
    shapedData,
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
    const [shapedCount, setShapedCount] = useState(null);

    if (width < 10) return null;

    const tickRef = useRef<any>(null);

    const [tickValueWidth, setTickValueWidth] = useState(30);

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
    // Bounds
    const innerWidth = width - 5 - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = useMemo(
      () =>
        scaleBand<string>({
          range: [margin.left, innerWidth + margin.left - 12],
          domain: data?.map((d) => d.name),
        }),
      [data, innerWidth, margin.left]
    );
    const xScaleShaped = useMemo(
      () =>
        scaleBand<string>({
          range: [margin.left, innerWidth + margin.left - 12],
          domain: shapedData?.map((d) => d.name),
        }),
      [shapedData, innerWidth, margin.left]
    );
    const yScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, data ? max(data, getValue) || 0 : 0],
          nice: true,
        }),
      [data, margin.top, innerHeight]
    );
    const yScaleShaped = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, shapedData ? max(shapedData, getValue) || 0 : 0],
          nice: true,
        }),
      [shapedData, margin.top, innerHeight]
    );
    const tickValues = yScale.ticks(5);

    // Tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };

        const index = Math.floor((x - margin.left) / xScale.bandwidth());

        // Ensure the index is within the valid range
        if (index >= 0 && index < data?.length) {
          const d = data[index] as TooltipData;
          const d2 = shapedData?.[index] as TooltipData;

          showTooltip({
            tooltipData: d2 ? ([d, d2] as any) : ([d] as any),
            tooltipLeft: xScale(d.name)! + 3,
            tooltipTop: yScale(getValue(d)),
          });
        }
      },
      [data, shapedData, showTooltip, yScale, xScale, margin.left]
    );

    useEffect(() => {
      if (tickRef.current) setTickValueWidth(tickRef.current.clientWidth);
    }, []);

    useEffect(() => {
      if (targetValue !== undefined && data.length > 0) {
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
          {data?.length > 0 &&
            tickValues.reverse().map((tick: number, index: number) => {
              return (
                <div key={index} className="text-right">
                  {tick}
                </div>
              );
            })}
        </div>
        <svg
          width={innerWidth - tickValueWidth - 32}
          height={height}
          className="rounded-lg border"
        >
          <rect
            x={0}
            y={0}
            width={innerWidth - tickValueWidth - 32}
            height={height}
            fill="white"
          />
          {shapedData && shapedData.length > 0 && (
            <AreaClosed<TooltipData>
              data={shapedData}
              x={(d) => xScaleShaped(getName(d)) ?? 0}
              y={(d) =>
                getValue(d) === 0
                  ? yScaleShaped.range()[0]
                  : yScaleShaped(getValue(d)) ?? 0
              }
              yScale={yScale}
              strokeWidth={2}
              fill={fill}
              fillOpacity={0.5}
              stroke={stroke}
              curve={curveMonotoneX}
            />
          )}
          <AreaClosed<TooltipData>
            data={data}
            x={(d) => xScale(getName(d)) ?? 0}
            y={(d) =>
              getValue(d) === 0 ? yScale.range()[0] : yScale(getValue(d)) ?? 0
            }
            yScale={yScale}
            strokeWidth={2}
            fill={shapedData?.length ? "#E2E8F0" : fill}
            fillOpacity={shapedData?.length ? 0.5 : 1}
            stroke={shapedData?.length ? "#64748B" : stroke}
            curve={curveMonotoneX}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth - tickValueWidth - 32}
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
                  percentile: {getPercentile(tooltipData[0])}
                </div>
                <div className="text-sm">
                  {shapedData ? "total " : ""}count: {getValue(tooltipData[0])}
                </div>
                {shapedData && (
                  <div className="text-sm">
                    attributed count: {getValue(tooltipData[1])}
                  </div>
                )}
              </div>
            </TooltipWithBounds>
          </div>
        )}
      </div>
    );
  }
);
