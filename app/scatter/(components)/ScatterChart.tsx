"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import moment, { Moment } from "moment";
import { scaleLinear } from "@visx/scale";
import useSvgPanning from "@/hooks/use-svg-panning";
import { FaUserCircle } from "react-icons/fa";
import { X } from "lucide-react";

interface EmbeddingChartProps {
  data: { name: string | number; data: [number, number][] }[];
  dataType: string;
  colors: string[];
}

const ScatterChart = ({ data, dataType, colors }: EmbeddingChartProps) => {
  const width = 960;
  const height = 600;
  const padding = 20;
  const widthZoomOffsetValue = 50;
  const heightZoomOffsetValue = (height / width) * widthZoomOffsetValue;
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState(["", ""]);
  const [mouseOverSvg, setMouseOverSvg] = useState(true);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [widthRange, setWidthRange] = useState([padding, width - padding]);
  const [heightRange, setHeightRange] = useState([padding, height - padding]);
  const [xPercent, setXPercent] = useState(0.5);
  const [yPercent, setYPercent] = useState(0.5);
  const [categoryColors, setCategoryColors]: any = useState({});
  const [categoryProperty, setCategoryProperty]: [
    [string, number, number],
    Dispatch<SetStateAction<[string, number, number]>>
  ] = useState(["", 0, 0]);
  const svgRef = useRef<any>(null);

  const paletteColors = [
    "#64748B",
    "#F43F5E",
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#84CC16",
    "#22C55E",
    "#E2E8F0",
    "#FECDD3",
    "#FECACA",
    "#FED7AA",
    "#FDE68A",
    "#D9F99D",
    "#BBF7D0",
    "#14B8A6",
    "#06B6D4",
    "#3B82F6",
    "#6366F1",
    "#A855F7",
    "#A855F7",
    "#EC4899",
    "#99F6E4",
    "#A5F3FC",
    "#BFDBFE",
    "#C7D2FE",
    "#E9D5FF",
    "#F5D0FE",
    "#F9A8D4",
  ];

  useEffect(() => {
    const currentColors: Record<string, string> = {};
    for (let i = 0; i < data.length; i++) {
      currentColors[data[i].name] = colors[i % colors.length];
    }
    setCategoryColors(currentColors);
  }, [data]);

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
    for (let i = 0; i < height / squareSize + 1; i++) {
      horizontalLines.push({
        x1: 0,
        y1: i * squareSize,
        x2: width,
        y2: i * squareSize,
      });
    }
    for (let i = 0; i < width / squareSize + 1; i++) {
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
        range: widthRange,
        domain: [minX, maxX],
        nice: false,
      }),
    [widthRange, minX, maxX]
  );
  const yScale = useMemo(() => {
    return scaleLinear({
      range: heightRange,
      domain: [maxY, minY],
      nice: false,
    });
  }, [minY, maxY, heightRange]);

  useEffect(() => {
    if (selectedCategory[0] === "") setFilteredData(data);
    else setFilteredData([data.find((d) => d.name === selectedCategory[0])]);
  }, [data, selectedCategory]);

  const handleZoomIn = () => {
    setWidthRange((prev) => [
      prev[0] - widthZoomOffsetValue * 0.5,
      prev[1] + widthZoomOffsetValue * 0.5,
    ]);
    setHeightRange((prev) => [
      prev[0] - heightZoomOffsetValue * 0.5,
      prev[1] + heightZoomOffsetValue * 0.5,
    ]);
  };

  const handleZoomOut = () => {
    if (
      height -
        padding +
        heightZoomOffsetValue * (1 - yPercent) -
        padding +
        heightZoomOffsetValue * yPercent >
      200
    ) {
      setWidthRange((prev) => [
        prev[0] + widthZoomOffsetValue * 0.5,
        prev[1] - widthZoomOffsetValue * 0.5,
      ]);
      setHeightRange((prev) => [
        prev[0] + heightZoomOffsetValue * 0.5,
        prev[1] - heightZoomOffsetValue * 0.5,
      ]);
    }
  };

  const handleZoomReset = () => {
    const svg = svgRef?.current;
    setWidthRange([padding, width - padding]);
    setHeightRange([padding, height - padding]);
    const viewBoxString = `0 0 ${width} ${height}`;
    svg!.setAttribute("viewBox", viewBoxString);
  };

  useEffect(() => {
    const handleZoom = (event: any) => {
      if (event.deltaY < 0 && mouseOverSvg) {
        setWidthRange((prev) => [
          prev[0] - widthZoomOffsetValue * xPercent,
          prev[1] + widthZoomOffsetValue * (1 - xPercent),
        ]);
        setHeightRange((prev) => [
          prev[0] - heightZoomOffsetValue * yPercent,
          prev[1] + heightZoomOffsetValue * (1 - yPercent),
        ]);
      } else if (
        event.deltaY > 0 &&
        height -
          padding +
          heightZoomOffsetValue * (1 - yPercent) -
          padding +
          heightZoomOffsetValue * yPercent >
          200 &&
        mouseOverSvg
      ) {
        setWidthRange((prev) => [
          prev[0] + widthZoomOffsetValue * xPercent,
          prev[1] - widthZoomOffsetValue * (1 - xPercent),
        ]);
        setHeightRange((prev) => [
          prev[0] + heightZoomOffsetValue * yPercent,
          prev[1] - heightZoomOffsetValue * (1 - yPercent),
        ]);
      }
    };

    const getPercentage = (event: any) => {
      const svg = svgRef?.current;
      const { x, y } = svg.getBoundingClientRect();
      setXPercent((event.x - x) / width);
      setYPercent((event.y - y) / height);
    };

    window.addEventListener("wheel", handleZoom);
    window.addEventListener("mousemove", getPercentage);

    return () => {
      window.removeEventListener("wheel", handleZoom);
      window.removeEventListener("mousemove", getPercentage);
    };
  }, [
    widthZoomOffsetValue,
    heightZoomOffsetValue,
    mouseOverSvg,
    heightRange,
    widthRange,
    xPercent,
    yPercent,
  ]);

  useEffect(() => {
    const handleMouse = (event: any) => {
      const svg = svgRef?.current;
      const { x, y } = svg.getBoundingClientRect();

      setMouseOverSvg(
        x < event.x &&
          event.x - x < width &&
          y < event.y &&
          event.y - y < height
      );
    };

    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [mouseOverSvg]);

  const preventScroll = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (mouseOverSvg) {
      window.addEventListener("wheel", preventScroll, {
        passive: false,
      });
    } else {
      window.removeEventListener("wheel", preventScroll);
    }
  }, [mouseOverSvg]);

  useSvgPanning({ svg: svgRef.current, width: width, height: height });

  return (
    <div className="flex flex-row gap-x-4">
      <div className="relative">
        <svg width={width} height={height} fill="none">
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
        </svg>
        <svg
          width={width}
          height={height}
          style={{
            touchAction: "none",
            border: "1px solid lightgray",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          fill="none"
          ref={svgRef}
        >
          <rect width={width} height={height} rx={14} fill="none" />

          <g>
            {filteredData.map(
              (
                point: { name: string; data: [number, number][] },
                i: number
              ) => (
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
                              : categoryColors[point.name]
                          }
                          fillOpacity={0.6}
                          strokeWidth={1}
                          stroke={
                            selectedCategory[1] !== ""
                              ? selectedCategory[1]
                              : ["Numerical", "Timestamp"].includes(dataType)
                              ? getColor(point.name)
                              : categoryColors[point.name]
                          }
                          onMouseEnter={() => {
                            handlePointHover(point.data[dataIndex], point.name);
                          }}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                      );
                    }
                  )}
                </g>
              )
            )}
          </g>
          {hoveredPoint && (
            <foreignObject
              x={
                xScale(hoveredPoint.point[0]) + 350 > width - padding
                  ? Math.max(0, width - 350)
                  : xScale(hoveredPoint.point[0]) + 10
              }
              y={
                yScale(hoveredPoint.point[1]) - 70 < 0
                  ? 10
                  : yScale(hoveredPoint.point[1]) - 70
              }
              width="340"
              height="60"
            >
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
          <div className="flex flex-col items-center rounded-md border bg-white border-gray-200 shadow-md">
            <button type="button" className="px-2 py-1" onClick={handleZoomIn}>
              +
            </button>
            <hr className="w-full bg-gray-200" />
            <button type="button" className="px-2 py-1" onClick={handleZoomOut}>
              -
            </button>
            <hr className="w-full bg-gray-200" />
            <button
              type="button"
              className="px-2 py-1"
              onClick={handleZoomReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        {!["Numerical", "Timestamp"].includes(dataType) &&
          data.length <= 20 && (
            <div className="text-left text-[15px] font-bold">Legend</div>
          )}
        {!["Numerical", "Timestamp"].includes(dataType) &&
          data.length <= 20 && (
            <div>
              <div className="flex items-center mb-1.5">
                <FaUserCircle className="h-3 w-3 mr-2 text-slate-700" />
                <div className="text-sm">user</div>
              </div>
              <div className="flex items-center mb-1.5">
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: "white",
                    border: "3px solid #334155",
                  }}
                ></div>
                <div className="text-sm">items interacted with</div>
              </div>
              {data.map((category: any) => (
                <div key={category.name} className="text-left">
                  <div>
                    <div className="flex items-center mb-1.5">
                      <button
                        className="mr-2 h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: categoryColors[category.name],
                          opacity: 0.8,
                        }}
                        onClick={(e) => {
                          setShowColorPalette(true);
                          setCategoryProperty([
                            category.name,
                            e.clientX,
                            e.clientY,
                          ]);
                        }}
                      ></button>
                      <button
                        className="text-sm"
                        onClick={() => {
                          if (selectedCategory[0] !== "")
                            setSelectedCategory(["", ""]);
                          else
                            setSelectedCategory([
                              category.name,
                              categoryColors[category.name],
                            ]);
                        }}
                      >
                        {category.name}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
      {showColorPalette && (
        <div
          className=" bg-white shadow-lg rounded-md grid grid-cols-7 gap-1 p-4"
          style={{
            position: "fixed",
            top: categoryProperty[2] + 20,
            left: categoryProperty[1] + 20,
          }}
        >
          <button className="absolute top-0 right-0">
            <X
              className="text-gray-300 h-5 w-5"
              onClick={() => {
                setShowColorPalette(false);
                setCategoryProperty(["", 0, 0]);
              }}
            />
          </button>
          {paletteColors.map((color, i) => {
            return (
              <button
                key={i}
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: color,
                  opacity: 1,
                  height: 24,
                  width: 24,
                }}
                onClick={() => {
                  categoryColors[categoryProperty[0]] = color;
                  setShowColorPalette(false);
                  setCategoryProperty(["", 0, 0]);
                }}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScatterChart;
