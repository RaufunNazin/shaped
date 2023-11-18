import {
  AnimatedAxis,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  AnimatedAreaSeries,
} from "@visx/xychart";
import * as allCurves from "@visx/curve";
import { useEffect, useMemo, useState } from "react";
import { DashboardTableWrapper } from "../dashboard-table";
import { scaleBand, scaleLinear } from "@visx/scale";

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

interface stackedChartProps {
  data: { name: string; data: { x: string; y: number }[]; color: string }[];
  chartType: "line" | "area";
  height: number;
  width: number;
}

const StackedChart = ({
  data,
  chartType,
  height,
  width,
}: stackedChartProps) => {
  const [widthMultiplier, setWidthMultiplier] = useState(0);

  const [tooltipColor, setTooltipColor] = useState("black");
  const xMax = width - widthMultiplier - widthMultiplier;
  const yMax = height - 5 - 20;

  const xScale = scaleBand<string>({
    domain: data.map((d, i) => d.data[i].x),
    range: [0, xMax],
    padding: 0.3,
  });
  const yMin = 0;
  const yMaxi = Math.max(...data.map((d, i) => d.data[i].y));

  const yScale = scaleLinear<number>({
    domain: [yMin, yMaxi],
    range: [height, 5],
  });

  const tickValues = yScale.ticks(5);

  useEffect(() => {
    // Function to update widthMultiplier based on window.innerWidth
    const updateWidthMultiplier = () => {
      setWidthMultiplier(-window.innerWidth * 0.04948);
    };

    // Initial setup
    if (typeof window !== "undefined") {
      updateWidthMultiplier();

      // Add event listener for window resize
      window.addEventListener("resize", updateWidthMultiplier);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", updateWidthMultiplier);
      };
    }
  }, []);
  return (
    <div>
      <div className=" flex">
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
        <div className="rounded-lg border border-solid border-gray-200">
          <XYChart
            height={height}
            xScale={{ type: "band" }}
            yScale={{ type: "linear" }}
            width={width - 70}
            margin={{
              top: 5,
              right: widthMultiplier,
              bottom: 0,
              left: widthMultiplier,
            }}
          >
            {chartType === "area" &&
              data.map((item) => {
                return (
                  <AnimatedAreaSeries
                    key={item.name}
                    dataKey={item.name}
                    data={item.data}
                    {...accessors}
                    curve={allCurves.curveCardinal}
                  />
                );
              })}
            {chartType === "line" &&
              data.map((item) => {
                return (
                  <AnimatedLineSeries
                    key={item.name}
                    dataKey={item.name}
                    data={item.data}
                    {...accessors}
                    curve={allCurves.curveCardinal}
                    colorAccessor={(color) => {
                      return item.color ? item.color : "black";
                    }}
                  />
                );
              })}
            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showDatumGlyph
              glyphStyle={{ fill: "#141515" }}
              renderTooltip={({ tooltipData }: any) => {
                const item = data.find(
                  (item) => item.name === tooltipData.nearestDatum.key
                );

                if (!item) {
                  return null;
                }
                return (
                  <div>
                    <div
                      style={{
                        color: item.color,
                      }}
                    >
                      {tooltipData.nearestDatum.key}
                    </div>
                    {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                    {", "}
                    {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                  </div>
                );
              }}
            />
          </XYChart>
        </div>
      </div>
      <div className="flex justify-between">
        {xScale.domain().map((d) => {
          return (
            <div className="text-[#aebac9] pl-8 mx-2" key={d}>
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface StackedChartWrapperProps extends stackedChartProps {}
const StackedChartWrapper = ({
  data,
  chartType,
  height,
  width,
}: StackedChartWrapperProps) => {
  return (
    <StackedChart
      data={data}
      chartType={chartType}
      height={height}
      width={width}
    />
  );
};

export { StackedChart, StackedChartWrapper };
