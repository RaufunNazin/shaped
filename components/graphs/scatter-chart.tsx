import React, { useMemo, useState, useCallback, useRef } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import genRandomNormalPoints, {
  PointsRange,
} from "@visx/mock-data/lib/generators/genRandomNormalPoints";
import { withTooltip, Tooltip } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";

const points: PointsRange[] = genRandomNormalPoints(3000);

const x = (d: PointsRange) => d[0];
const y = (d: PointsRange) => d[1];

export type DotsProps = {
  width: number;
  height: number;
};

const Dots: React.FC<DotsProps & WithTooltipProvidedProps<PointsRange>> = ({
  width,
  height,
  hideTooltip,
  showTooltip,
  tooltipOpen,
  tooltipData,
  tooltipLeft,
  tooltipTop,
}: DotsProps & WithTooltipProvidedProps<PointsRange>) => {
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };

  const svgWidth = width - margin.left - margin.right;
  const svgHeight = height - margin.top - margin.bottom;

  if (svgWidth < 10 || svgHeight < 10) return null;

  const svgRef = useRef<SVGSVGElement>(null);
  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [1, 2.5],
        range: [0, svgWidth],
        clamp: true,
      }),
    [svgWidth]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0.5, 2],
        range: [svgHeight, 0],
        clamp: true,
      }),
    [svgHeight]
  );

  // event handlers
  const handleMouseMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!svgRef.current) return;

      const point = localPoint(svgRef.current, event);
      if (!point) return;

      const closest = points.reduce((prev, curr) => {
        const distancePrev = Math.hypot(
          xScale(x(prev)) - point.x,
          yScale(y(prev)) - point.y
        );
        const distanceCurr = Math.hypot(
          xScale(x(curr)) - point.x,
          yScale(y(curr)) - point.y
        );
        return distanceCurr < distancePrev ? curr : prev;
      });

      showTooltip({
        tooltipLeft: xScale(x(closest)),
        tooltipTop: yScale(y(closest)),
        tooltipData: closest,
      });
    },
    [xScale, yScale, showTooltip]
  );
  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  return (
    <div>
      <svg width={width} height={height} ref={svgRef}>
        <rect
          width={width}
          height={height}
          rx={14}
          fill="#fff"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseLeave}
        />
        <Group pointerEvents="none">
          {points.map((point, i) => (
            <Circle
              key={`point-${point[0]}-${i}`}
              className="dot"
              cx={xScale(x(point))}
              cy={yScale(y(point))}
              r={i % 3 === 0 ? 2 : 3}
              fill={tooltipData === point ? "black" : "#f6c431"}
            />
          ))}
        </Group>
      </svg>
      {tooltipOpen &&
        tooltipData &&
        tooltipLeft != null &&
        tooltipTop != null && (
          <Tooltip left={tooltipLeft + 10} top={tooltipTop + 10}>
            <div>
              <strong>x:</strong> {x(tooltipData)}
            </div>
            <div>
              <strong>y:</strong> {y(tooltipData)}
            </div>
          </Tooltip>
        )}
    </div>
  );
};

export default withTooltip(Dots);
