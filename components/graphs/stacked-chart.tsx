import {
  AnimatedAxis,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  AnimatedAreaSeries,
  buildChartTheme,
} from "@visx/xychart";
import * as allCurves from "@visx/curve";
import { useEffect, useMemo, useRef, useState } from "react";
import { DashboardTableWrapper } from "../dashboard-table";
import { scaleBand, scaleLinear } from "@visx/scale";

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

interface stackedChartProps {
  data: { name: string; data: { x: string; y: number }[] }[];
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
  const customTheme = buildChartTheme({
    colors: ["#818CF8", "#FBBF24", "#2DD4BF", "#F472B6", "#38BDF8"], // categorical colors, mapped to series via `dataKey`s
  });
  const [widthMultiplier, setWidthMultiplier] = useState(0);
  const [tickValueWidth, setTickValueWidth] = useState(30);

  const tickRef = useRef<any>(null);

  const [tooltipColor, setTooltipColor] = useState("black");
  const xMax = width;
  const yMax = height - 5 - 20;

  const xScale = scaleBand<string>({
    domain: data.map((d, i) => d.data[i].x),
    range: [0, xMax],
    padding: 0.3,
  });
  const yMin = 0;
  const yMaxi = Math.max(...data.flatMap((d) => d.data.map((d2) => d2.y)));

  const yScale = scaleLinear<number>({
    domain: [yMin, yMaxi],
    range: [height, 5],
  });

  const tickValues = yScale.ticks(5);

  useEffect(() => {
    console.log(yMax, yMaxi, yMin);
    // Function to update widthMultiplier based on window.innerWidth
    if (tickRef.current) setTickValueWidth(tickRef.current.clientWidth);
    const updateWidthMultiplier = () => {
      setWidthMultiplier(window.innerWidth * 0.82);
      console.log("first", window.innerWidth);
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
          ref={tickRef}
        >
          {tickValues.reverse().map((tick: number) => {
            return (
              <div key={tick} className="text-right">
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
            width={widthMultiplier}
            margin={{
              top: 5,
              right: 5,
              bottom: 0,
              left: 5,
            }}
            theme={customTheme}
          >
            {chartType === "area" && (
              <rect
                x={0}
                y={0}
                width={widthMultiplier}
                height={height}
                fill={"#94A3B8"}
              />
            )}

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
                        color: "#000000",
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
            <div className="mx-2 pl-8 text-[#aebac9]" key={d}>
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
