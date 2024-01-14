"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Zoom } from "@visx/zoom";
import { localPoint } from "@visx/event";
import { RectClipPath } from "@visx/clip-path";
import moment, { Moment } from "moment";
import { scaleLinear } from "@visx/scale";

interface EmbeddingChartProps {
  data: { name: string | number; data: [number, number][] }[];
  dataType: string;
  colors: string[];
}

interface ColorMapping {
  [name: string]: string;
}

const ScatterChart = ({ data, dataType, colors }: EmbeddingChartProps) => {
  const width = 960;
  const height = 600;
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState(["", ""]);
  const colorMapping: ColorMapping = {};
  const padding = 20;

  const initialTransform = {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0,
  };

  const handlePointHover = (point: any, value: any) => {
    setHoveredPoint({ point: point, value: value });
  };

  const [min, max] = useMemo(() => {
    const values = data.map((e: any) => e.name);
    if (dataType == "Numerical") {
      return [
        Math.min(...(values as number[])),
        Math.max(...(values as number[])),
      ];
    } else if (dataType == "Timestamp") {
      const dates = values.map((dateString: any) => moment(dateString));
      return [moment.min(dates), moment.max(dates)];
    } else return [undefined, undefined];
  }, [data, dataType]);

  const getColor = (value: number | string): string => {
    let normalizedValue;
    if (dataType === "Timestamp") {
      normalizedValue =
        ((moment(value).diff(min) as number) - 0) /
        ((max as Moment).diff(min as Moment) - 0);
    } else {
      normalizedValue =
        ((value as number) - (min as number)) /
        ((max as number) - (min as number));
    }

    const redChannel = Math.round(255 - normalizedValue * 255);
    return `rgba(${redChannel}, 0, 0, 0.8)`;
  };

  const getColorByCategory = (name: string | number): string => {
    if (!(name in colorMapping)) {
      colorMapping[name] =
        colors[Object.keys(colorMapping).length % colors.length];
    }
    return colorMapping[name];
  };

  const categoriesColor = (name: string | number): string => {
    if (!(name in colorMapping)) {
      colorMapping[name] =
        colors[Object.keys(colorMapping).length % colors.length];
    }
    return colorMapping[name];
  };

  const [horizontalLines, verticalLines] = useMemo(() => {
    const horizontalLines: {
      x1: number;
      x2: number;
      y1: number;
      y2: number;
    }[] = [];
    const verticalLines: { x1: number; x2: number; y1: number; y2: number }[] =
      [];
    const squareSize = 60;
    for (let i = 0; i < height / squareSize; i++) {
      horizontalLines.push({
        x1: 0,
        y1: i * squareSize,
        x2: width,
        y2: i * squareSize,
      });
    }
    for (let i = 0; i < width / squareSize; i++) {
      verticalLines.push({
        x1: i * squareSize,
        y1: 0,
        x2: i * squareSize,
        y2: height,
      });
    }
    return [horizontalLines, verticalLines];
  }, [width, height]);

  const [minX, minY, maxX, maxY] = useMemo(() => {
    const minX = Math.min(
      ...data.flatMap((d: any) => d.data.map((d1: [number, number]) => d1[0]))
    );
    const minY = Math.min(
      ...data.flatMap((d: any) => d.data.map((d1: [number, number]) => d1[1]))
    );
    const maxX = Math.max(
      ...data.flatMap((d: any) => d.data.map((d1: [number, number]) => d1[0]))
    );
    const maxY = Math.max(
      ...data.flatMap((d: any) => d.data.map((d1: [number, number]) => d1[1]))
    );

    return [minX, minY, maxX, maxY];
  }, [data]);

  const xScale = useMemo(
    () =>
      scaleLinear({
        range: [padding, width - padding],
        domain: [minX, maxX],
        nice: true,
      }),
    [width, minX, maxX]
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [padding, height - padding],
        domain: [maxY, minY],
        nice: true,
      }),
    [height, minY, maxY]
  );

  useEffect(() => {
    if (selectedCategory[0] === "") setFilteredData(data);
    else setFilteredData([data.find((d) => d.name === selectedCategory[0])]);
  }, [data, selectedCategory]);

  return (
    <div className="flex flex-row gap-x-4">
      <Zoom<SVGSVGElement>
        width={width}
        height={height}
        scaleXMin={1 / 4}
        scaleXMax={4}
        scaleYMin={1 / 4}
        scaleYMax={4}
        initialTransformMatrix={initialTransform}
      >
        {(zoom) => (
          <div className="relative">
            <svg
              width={width}
              height={height}
              style={{
                touchAction: "none",
                border: "1px solid lightgray",
                borderRadius: "4px",
              }}
              ref={zoom.containerRef}
            >
              <RectClipPath id="zoom-clip" width={width} height={height} />
              <rect width={width} height={height} rx={14} fill="none" />

              <rect
                width={width}
                height={height}
                rx={14}
                fill="transparent"
                onMouseLeave={() => {
                  if (zoom.isDragging) zoom.dragEnd();
                }}
                onTouchStart={zoom.dragStart}
                onTouchMove={zoom.dragMove}
                onTouchEnd={zoom.dragEnd}
                onMouseDown={zoom.dragStart}
                onMouseMove={zoom.dragMove}
                onMouseUp={zoom.dragEnd}
                onDoubleClick={(event) => {
                  const point = localPoint(event) || { x: 0, y: 0 };
                  zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                }}
              />
              {horizontalLines.map((point, i) => {
                return (
                  <line
                    key={i}
                    {...point}
                    strokeWidth={1}
                    stroke="#000000"
                    strokeOpacity={0.1}
                  />
                );
              })}
              {verticalLines.map((point, i) => {
                return (
                  <line
                    key={i}
                    {...point}
                    strokeWidth={1}
                    stroke="#000000"
                    strokeOpacity={0.1}
                  />
                );
              })}
              <g transform={zoom.toString()}>
                {filteredData.map((point: any, i: number) => (
                  <g key={i}>
                    {point.data.map(
                      (dataPoint: [number, number], dataIndex: number) => {
                        return (
                          <circle
                            key={dataIndex}
                            cx={xScale(dataPoint[0])}
                            cy={yScale(dataPoint[1])}
                            r={3}
                            fill={
                              selectedCategory[1] !== ""
                                ? selectedCategory[1]
                                : ["Numerical", "Timestamp"].includes(dataType)
                                ? getColor(point.name)
                                : getColorByCategory(point.name)
                            }
                            fillOpacity={0.6}
                            strokeWidth={1}
                            stroke={
                              selectedCategory[1] !== ""
                                ? selectedCategory[1]
                                : ["Numerical", "Timestamp"].includes(dataType)
                                ? getColor(point.name)
                                : getColorByCategory(point.name)
                            }
                            onMouseEnter={() => {
                              handlePointHover(
                                point.data[dataIndex],
                                point.name
                              );
                            }}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                        );
                      }
                    )}
                  </g>
                ))}
              </g>
              {hoveredPoint && (
                <foreignObject x={20} y={20} width="340" height="60">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: "10px",
                      background: "white",
                      border: "1px solid lightgray",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      Attribute value:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {hoveredPoint.value}
                      </span>
                    </div>
                    <div>
                      Embedding:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {hoveredPoint.point[0]}, {hoveredPoint.point[1]}
                      </span>
                    </div>
                  </div>
                </foreignObject>
              )}
            </svg>
            <div className="absolute right-3 top-3 flex flex-col items-center">
              <div className="flex flex-col items-center rounded-md border border-gray-200 shadow-md">
                <button
                  type="button"
                  className="px-2 py-1"
                  onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
                >
                  +
                </button>
                <hr className="w-full bg-gray-200" />
                <button
                  type="button"
                  className="px-2 py-1"
                  onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                >
                  -
                </button>
              </div>

              <button
                type="button"
                className="mt-3 rounded-md border border-gray-200 px-1 py-2 text-sm shadow-md"
                onClick={zoom.reset}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </Zoom>
      <div className="flex flex-col gap-y-2">
        {!["Numerical", "Timestamp"].includes(dataType) &&
          data.length <= 20 && (
            <div className="text-left text-[15px] font-bold">Legend</div>
          )}
        {!["Numerical", "Timestamp"].includes(dataType) &&
          data.length <= 20 &&
          data.map((category: any) => (
            <div key={category.name} className="text-left">
              <button
                onClick={() => {
                  if (selectedCategory[0] !== "") setSelectedCategory(["", ""]);
                  else
                    setSelectedCategory([
                      category.name,
                      categoriesColor(category.name),
                    ]);
                }}
              >
                <div className="flex items-center">
                  <div
                    className="mr-2 h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: categoriesColor(category.name),
                      opacity: 0.8,
                    }}
                  ></div>
                  <div className="text-sm">{category.name}</div>
                </div>
              </button>
            </div>
          ))}
      </div>{" "}
    </div>
  );
};

export default ScatterChart;
