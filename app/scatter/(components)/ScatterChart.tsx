"use client";
import React, { useState } from "react";
import { interpolateRainbow } from "d3-scale-chromatic";
import { Zoom } from "@visx/zoom";
import { localPoint } from "@visx/event";
import { RectClipPath } from "@visx/clip-path";
import genPhyllotaxis, {
  GenPhyllotaxisFunction,
  PhyllotaxisPoint,
} from "@visx/mock-data/lib/generators/genPhyllotaxis";
import { scaleLinear } from "@visx/scale";

const bg = "#0a0a0a";
interface Point {
  x: number;
  y: number;
}

const initialTransform = {
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0,
};

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
  const [showMiniMap, setShowMiniMap] = useState<boolean>(true);

  const handlePointHover = (point: Point) => {
    setHoveredPoint(point);
  };

  const findClosestPoint = (mousePoint: any, points: any) => {
    let closestPoint = null;
    let minDistance = Number.MAX_VALUE;

    points.forEach((point: any) => {
      const distance = Math.sqrt(
        Math.pow(mousePoint.x - scaleX(point.x), 2) +
          Math.pow(mousePoint.y - scaleY(point.y), 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    });

    return closestPoint;
  };

  return (
    <Zoom<SVGSVGElement>
      width={width}
      height={height}
      scaleXMin={1 / 2}
      scaleXMax={4}
      scaleYMin={1 / 2}
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
            }}
            ref={zoom.containerRef}
          >
            <RectClipPath id="zoom-clip" width={width} height={height} />
            <rect width={width} height={height} rx={14} fill="none" />
            <g transform={zoom.toString()}>
              {pointsToDisplay.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={scaleX(point.x) + 2}
                    cy={scaleY(point.y) - 5}
                    r={2}
                    fill={
                      data.find((category) => category.points.includes(point))
                        ?.color || "black"
                    }
                    onMouseEnter={() => handlePointHover(point)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                </g>
              ))}
            </g>
            <rect
              width={width}
              height={height}
              rx={14}
              fill="transparent"
              onMouseEnter={(event) => {
                const point = localPoint(event);
                if (point) {
                  const closestPoint = findClosestPoint(point, pointsToDisplay);
                  setHoveredPoint(closestPoint);
                }
              }}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
                setHoveredPoint(null);
              }}
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={(event) => {
                const point = localPoint(event);
                if (point) {
                  // Find the closest point
                  const closestPoint = findClosestPoint(point, pointsToDisplay);
                  setHoveredPoint(closestPoint);
                }
                zoom.dragMove;
              }}
              onMouseUp={zoom.dragEnd}
              onDoubleClick={(event) => {
                const point = localPoint(event) || { x: 0, y: 0 };
                zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
              }}
            />
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
                  y={scaleY(hoveredPoint.y) - 25}
                  fill="white"
                  fontSize="10"
                >
                  <tspan
                    x={scaleX(hoveredPoint.x) + 10}
                  >{`x: ${hoveredPoint.x.toFixed(2)}`}</tspan>
                  <tspan
                    x={scaleX(hoveredPoint.x) + 10}
                    dy="12"
                  >{`y: ${hoveredPoint.y.toFixed(2)}`}</tspan>
                </text>
              </g>
            )}
            {showMiniMap && (
              <g
                clipPath="url(#zoom-clip)"
                transform={`
                    scale(0.25)
                    translate(${width * 4 - width - 60}, ${
                  height * 4 - height - 60
                })
                  `}
              >
                <rect width={width} height={height} fill="#1a1a1a" />
                {pointsToDisplay.map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={scaleX(point.x) + 2}
                      cy={scaleY(point.y) - 5}
                      r={2}
                      fill={
                        data.find((category) => category.points.includes(point))
                          ?.color || "black"
                      }
                    />
                  </g>
                ))}
                <rect
                  width={width}
                  height={height}
                  fill="white"
                  fillOpacity={0.2}
                  stroke="white"
                  strokeWidth={4}
                  transform={zoom.toStringInvert()}
                />
              </g>
            )}
          </svg>
        </div>
      )}
    </Zoom>
  );
};

export default ScatterChart;
