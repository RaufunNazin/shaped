import React, { useMemo, useState, useCallback, useRef } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { withTooltip, Tooltip } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";

const x = (d: any) => d[0];
const y = (d: any) => d[1];

export type DotsProps = {
  width: number;
  height: number;
  embeddings: { name: string | number; data: [number, number][] }[];
  dataType: string;
};

const Dots: React.FC<DotsProps & WithTooltipProvidedProps<any>> = ({
  width,
  height,
  embeddings,
  dataType,
  hideTooltip,
  showTooltip,
  tooltipOpen,
  tooltipData,
  tooltipLeft,
  tooltipTop,
}: DotsProps & WithTooltipProvidedProps<any>) => {
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };

  const svgWidth = width - margin.left - margin.right;
  const svgHeight = height - margin.top - margin.bottom;

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

      const closest = embeddings?.data?.reduce((prev, curr) => {
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
    [embeddings.data, showTooltip, xScale, yScale]
  );
  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  console.log(tooltipData);

  if (svgWidth < 10 || svgHeight < 10) return null;

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
          {/* {
          ["Numerical", "Timestamp"].includes(dataType)
            ? (embeddings.map((e) => ({
                ...e,
                data: e.data.map((d) => ({
                  x: d[0],
                  y: d[1],
                  fillColor: getColor(e.name),
                })),
              })) as any)
            : embeddings
        } */}
          {embeddings?.data?.map((point, i) => (
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
              <strong>x:</strong>
            </div>
            <div>
              <strong>y:</strong>
            </div>
          </Tooltip>
        )}
    </div>
  );
};

export default withTooltip(Dots);
