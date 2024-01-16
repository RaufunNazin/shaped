import { useEffect } from "react";

interface SVGPanningProps {
  svg: SVGElement | null;
  width: number;
  height: number;
}

const useSvgPanning = ({ svg, width, height }: SVGPanningProps) => {
  let isPointerDown = false;
  let pointerOrigin = { x: 0, y: 0 };
  let viewBox = { x: 0, y: 0, width: width, height: height };
  let newViewBox = { x: 0, y: 0 };

  const getPointFromEvent = (event: any) => {
    const point = { x: 0, y: 0 };
    if (event.targetTouches) {
      point.x = event.targetTouches[0].clientX;
      point.y = event.targetTouches[0].clientY;
    } else {
      point.x = event.clientX;
      point.y = event.clientY;
    }
    return point;
  };

  const onPointerDown = (event: any) => {
    isPointerDown = true;
    const pointerPosition = getPointFromEvent(event);
    pointerOrigin.x = pointerPosition.x;
    pointerOrigin.y = pointerPosition.y;
  };

  const onPointerMove = (event: any) => {
    if (!isPointerDown) {
      return;
    }
    event.preventDefault();
    const pointerPosition = getPointFromEvent(event);
    newViewBox.x = viewBox.x - (pointerPosition.x - pointerOrigin.x);
    newViewBox.y = viewBox.y - (pointerPosition.y - pointerOrigin.y);
    const viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
    svg!.setAttribute("viewBox", viewBoxString);
  };

  const onPointerUp = () => {
    isPointerDown = false;
    viewBox.x = newViewBox.x;
    viewBox.y = newViewBox.y;
  };

  useEffect(() => {
    if (svg) {
      if (window.PointerEvent) {
        svg.addEventListener("pointerdown", onPointerDown);
        svg.addEventListener("pointerup", onPointerUp);
        svg.addEventListener("pointerleave", onPointerUp);
        svg.addEventListener("pointermove", onPointerMove);
      } else {
        svg.addEventListener("mousedown", onPointerDown);
        svg.addEventListener("mouseup", onPointerUp);
        svg.addEventListener("mouseleave", onPointerUp);
        svg.addEventListener("mousemove", onPointerMove);

        svg.addEventListener("touchstart", onPointerDown);
        svg.addEventListener("touchend", onPointerUp);
        svg.addEventListener("touchmove", onPointerMove);
      }

      return () => {
        svg.removeEventListener("pointerdown", onPointerDown);
        svg.removeEventListener("pointerup", onPointerUp);
        svg.removeEventListener("pointerleave", onPointerUp);
        svg.removeEventListener("pointermove", onPointerMove);

        svg.removeEventListener("mousedown", onPointerDown);
        svg.removeEventListener("mouseup", onPointerUp);
        svg.removeEventListener("mouseleave", onPointerUp);
        svg.removeEventListener("mousemove", onPointerMove);

        svg.removeEventListener("touchstart", onPointerDown);
        svg.removeEventListener("touchend", onPointerUp);
        svg.removeEventListener("touchmove", onPointerMove);
      };
    }
  }, [svg]);

  return svg;
};

export default useSvgPanning;
