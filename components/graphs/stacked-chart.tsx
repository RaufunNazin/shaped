import {
  AnimatedAxis,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  AnimatedAreaSeries,
  buildChartTheme,
  AreaStack,
} from "@visx/xychart";
import * as allCurves from "@visx/curve";
import { useEffect, useMemo, useRef, useState } from "react";
import { DashboardTableWrapper } from "../dashboard-table";
import { scaleBand, scaleLinear, scalePoint } from "@visx/scale";

const accessors = {
  xAccessor: (d: any) => d.percentile,
  yAccessor: (d: any) => d.count,
};

interface stackedChartProps {
  data: { name: string; data: { itemId: string; count: number }[] }[];
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
    colors: ["#818CF8", "#FBBF24", "#2DD4BF", "#F472B6", "#38BDF8"],
    backgroundColor: "",
    tickLength: 0,
    gridColor: "",
    gridColorDark: "",
  });
  const [widthMultiplier, setWidthMultiplier] = useState(0);
  const [tickValueWidth, setTickValueWidth] = useState(30);

  const tickRef = useRef<any>(null);

  const [tooltipColor, setTooltipColor] = useState("black");
  const xMax = width;
  const yMax = height - 5 - 20;

  const xScale = scalePoint<string>({
    domain: data.map((d, i) => d.name),
    range: [0, xMax],
    padding: 0.3,
  });
  const yMin = 0;
  const yMaxi = Math.max(...data.flatMap((d) => d.data.map((d2) => d2.count)));

  const yScale = scaleLinear<number>({
    domain: [yMin, yMaxi],
    range: [height, 5],
  });

  const tickValues = yScale.ticks(5);

  useEffect(() => {
    console.log("data", data);
    // Function to update widthMultiplier based on window.innerWidth
    if (tickRef.current) setTickValueWidth(tickRef.current.clientWidth);
    const updateWidthMultiplier = () => {
      setWidthMultiplier(window.innerWidth * 0.85);
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
            height={280}
            xScale={{ type: "point" }}
            yScale={{ type: "linear" }}
            width={width - tickValueWidth}
            margin={{
              top: 5,
              right: 5,
              bottom: 5,
              left: 5,
            }}
            theme={customTheme}
          >
            {chartType === "area" && (
              <rect
                x={0}
                y={0}
                width={width - tickValueWidth}
                height={height}
                fill={"#94A3B8"}
              />
            )}

            {chartType === "area" && (
              <AreaStack curve={allCurves.curveCardinal} offset={"none"}>
                {data.map((item) => {
                  return (
                    <AnimatedAreaSeries
                      key={item.name}
                      dataKey={item.name}
                      data={item.data}
                      {...accessors}
                      curve={allCurves.curveCardinalClosed}
                    />
                  );
                })}
              </AreaStack>
            )}
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
            {chartType === "area" && (
              <rect
                x={0}
                y={0}
                width={width - tickValueWidth}
                height={height}
                fill={"#94A3B8"}
              />
            )}

            {chartType === "area" && (
              <AreaStack curve={allCurves.curveCardinal} offset={"none"}>
                {Object.keys(data[0])
                  .filter((key) => key !== "name")
                  .map((key) => {
                    return (
                      <AnimatedAreaSeries
                        key={key}
                        dataKey={key}
                        data={data}
                        xAccessor={(d) => d.name}
                        yAccessor={(d) => d[key]}
                        curve={allCurves.curveCardinal}
                      />
                    );
                  })}
              </AreaStack>
            )}
            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showDatumGlyph
              glyphStyle={{ fill: "#141515" }}
              renderTooltip={({ tooltipData }: any) => {
                const item = data.find(
                  (item) => item.name === tooltipData.nearestDatum.key
                );
                console.log("tool", tooltipData);
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
