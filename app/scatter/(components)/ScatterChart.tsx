"use client";
import React, { useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface Category {
  name: string;
  points: Point[];
  color: string;
}

interface ScatterChartProps {
  data: Category[];
  width: number;
  height: number;
  selectedCategory?: string;
}

const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  width,
  height,
  selectedCategory,
}) => {
  const padding = 30;

  const pointsToDisplay = selectedCategory
    ? data.find((category) => category.name === selectedCategory)?.points || []
    : data.reduce(
        (points, category) => [...points, ...category.points],
        [] as Point[]
      );

  const maxX = Math.max(...pointsToDisplay.map((point) => point.x));
  const maxY = Math.max(...pointsToDisplay.map((point) => point.y));

  const scaleX = (value: number) => (value / maxX) * (width - 60);
  const scaleY = (value: number) => height - (value / maxY) * (height - 40);

  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);

  const handlePointHover = (point: Point) => {
    setHoveredPoint(point);
  };

  return (
    <svg width={width} height={height}>
      <rect
        width={width}
        height={height}
        fill="none"
        stroke="gray"
        strokeWidth="2"
      />
      {/* <line x1={padding } y1={padding - 60} x2={padding} y2={height - padding } stroke="gray" />
    <line x1={padding} y1={height - padding} x2={width - padding +10} y2={height - padding} stroke="gray" />  */}
      {pointsToDisplay.map((point, index) => (
        <g key={index}>
          <circle
            cx={scaleX(point.x) + 2}
            // cy={height - scaleY(point.y) + 5}
            cy={scaleY(point.y) - 5}
            r={2}
            fill={
              data.find((category) => category.points.includes(point))?.color ||
              "black"
            }
            onMouseEnter={() => handlePointHover(point)}
            onMouseLeave={() => setHoveredPoint(null)}
          />
        </g>
      ))}
      {hoveredPoint && (
        <g>
          <rect
            x={scaleX(hoveredPoint.x) + 5}
            // y={height - scaleY(hoveredPoint.y) - 30}
            y={scaleY(hoveredPoint.y) - 35}
            width={60}
            height={30}
            fill="black"
            stroke="black"
          />
          <text
            x={scaleX(hoveredPoint.x) + 40}
            // y={height - scaleY(hoveredPoint.y) - 20}
            y={scaleY(hoveredPoint.y) - 25}
            fill="white"
            fontSize="10"
          >
            <tspan
              x={scaleX(hoveredPoint.x) + 10}
            >{`x: ${hoveredPoint.x.toFixed(2)}`}</tspan>
            {/* <tspan x={scaleX(hoveredPoint.x) + 10}>{`x: ${(
              hoveredPoint.x + 18
            ).toFixed(2)}`}</tspan> */}
            <tspan
              x={scaleX(hoveredPoint.x) + 10}
              dy="12"
            >{`y: ${hoveredPoint.y.toFixed(2)}`}</tspan>
          </text>
        </g>
      )}
    </svg>
  );
};

export default ScatterChart;
