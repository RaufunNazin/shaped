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

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

const StackedChart = ({ chartType = "line" }: any) => {
  const [tooltipColor, setTooltipColor] = useState("black");
  const [data, setData] = useState([
    {
      name: "line1",
      data: [
        { x: "2020-01-01", y: 0 },
        { x: "2020-01-02", y: 100 },
        { x: "2020-01-03", y: 130 },
        { x: "2020-01-04", y: 140 },
        { x: "2020-01-05", y: 130 },
        { x: "2020-01-06", y: 160 },
        { x: "2020-01-07", y: 179 },
        { x: "2020-01-08", y: 190 },
        { x: "2020-01-09", y: 195 },
        { x: "2020-01-10", y: 200 },
      ],
      color: "#818CF8",
    },
    {
      name: "line2",
      data: [
        { x: "2020-01-01", y: 10 },
        { x: "2020-01-02", y: 60 },
        { x: "2020-01-03", y: 30 },
        { x: "2020-01-04", y: 70 },
        { x: "2020-01-05", y: 20 },
        { x: "2020-01-06", y: 80 },
        { x: "2020-01-07", y: 40 },
        { x: "2020-01-08", y: 10 },
        { x: "2020-01-09", y: 70 },
        { x: "2020-01-10", y: 30 },
      ],
      color: "#FBBF24",
    },
    {
      name: "line3",
      data: [
        { x: "2020-01-01", y: 50 },
        { x: "2020-01-02", y: 20 },
        { x: "2020-01-03", y: 60 },
        { x: "2020-01-04", y: 30 },
        { x: "2020-01-05", y: 80 },
        { x: "2020-01-06", y: 10 },
        { x: "2020-01-07", y: 40 },
        { x: "2020-01-08", y: 20 },
        { x: "2020-01-09", y: 90 },
        { x: "2020-01-10", y: 10 },
      ],
      color: "#2DD4BF",
    },
    {
      name: "line4",
      data: [
        { x: "2020-01-01", y: 30 },
        { x: "2020-01-02", y: 50 },
        { x: "2020-01-03", y: 10 },
        { x: "2020-01-04", y: 40 },
        { x: "2020-01-05", y: 70 },
        { x: "2020-01-06", y: 20 },
        { x: "2020-01-07", y: 60 },
        { x: "2020-01-08", y: 30 },
        { x: "2020-01-09", y: 80 },
        { x: "2020-01-10", y: 40 },
      ],
      color: "#F472B6",
    },
    {
      name: "line5",
      data: [
        { x: "2020-01-01", y: 20 },
        { x: "2020-01-02", y: 70 },
        { x: "2020-01-03", y: 40 },
        { x: "2020-01-04", y: 80 },
        { x: "2020-01-05", y: 30 },
        { x: "2020-01-06", y: 60 },
        { x: "2020-01-07", y: 10 },
        { x: "2020-01-08", y: 50 },
        { x: "2020-01-09", y: 30 },
        { x: "2020-01-10", y: 70 },
      ],
      color: "#38BDF8",
    },
  ]);
  useEffect(() => {}, []);
  return (
    <div>
      <DashboardTableWrapper>
        <div className="">
          <XYChart
            height={300}
            xScale={{ type: "band" }}
            yScale={{ type: "linear" }}
            margin={{ top: 5, right: 0, bottom: 0, left: 0 }}
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
              showVerticalCrosshair
              showSeriesGlyphs
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
      </DashboardTableWrapper>
    </div>
  );
};

export default StackedChart;
