import { Box, Input } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { BlockType } from "../types";
import * as d3 from "d3";
import { useMouse } from "react-use";
import styles from "./styles.module.scss";

const buttonBlock: BlockType<HTMLInputElement> = {
  name: "button",
  Component: ({ data, ...props }) => {
    const pointRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const [isPressing, setIsPressing] = useState(false);
    const { docX, docY } = useMouse(svgRef);

    const onMouseDown = () => {
      setIsPressing(false);
      window.document.body.style.pointerEvents = "auto";
      window.document.body.style.userSelect = "auto";
      window.document.body.style.webkitUserSelect = "auto";
    };

    useEffect(() => {
      window.addEventListener("mouseup", onMouseDown);

      return () => window.removeEventListener("mouseup", onMouseDown);
    });

    useEffect(() => {
      const node = d3.select(svgRef.current);
      if (isPressing && pointRef.current) {
        var x0 = pointRef.current.offsetLeft;
        var y0 = pointRef.current.offsetTop;
        var y1 = docX;
        var x1 = docY;
        var k = 10;

        var path = d3.path();
        path.moveTo(y0, x0);
        path.bezierCurveTo(y1 - k, x0, y0, x1, y1 - k, x1);
        path.lineTo(y1, x1);

        node.select("path").remove();
        node
          .append("path")
          .attr("d", path.toString())
          .attr("class", styles.line);
      } else {
        node.select("path").remove();
      }
    }, [docX, docY, isPressing]);

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Введите текст..."
          {...props}
          value={data}
          fullWidth
        />
        <div
          ref={pointRef}
          style={{
            width: 8,
            height: 8,
            background: isPressing ? "red" : "green",
          }}
          onMouseDown={() => {
            setIsPressing(true);
            window.document.body.style.pointerEvents = "none";
            window.document.body.style.userSelect = "none";
            window.document.body.style.webkitUserSelect = "none";
          }}
          onMouseUp={() => {
            setIsPressing(false);
          }}
        ></div>
        <svg
          ref={svgRef}
          style={{
            left: 0,
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: 0.3,
            background: "red",
            pointerEvents: "none",
          }}
        ></svg>
      </Box>
    );
  },
};

export default buttonBlock;
