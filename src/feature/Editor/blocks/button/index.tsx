import { Box, Input } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { BlockType } from "../types";
import * as d3 from "d3";
import { useMouse } from "react-use";
import styles from "./styles.module.scss";

const buttonBlock: BlockType<HTMLInputElement> = {
  type: "edge",
  name: "button",
  addLabel: "Добавить кнопку",
  Component: ({ data, id, canvas, onEdgeDropped, ...props }) => {
    const pointRef = useRef<HTMLDivElement>(null);
    const [isPressing, setIsPressing] = useState(false);
    const { docX, docY } = useMouse(canvas);

    const onMouseDown = () => {
      if (isPressing) {
        setIsPressing(false);
        window.document.body.style.pointerEvents = "auto";
        window.document.body.style.userSelect = "auto";
        window.document.body.style.webkitUserSelect = "auto";
        onEdgeDropped(docX, docY);
      }
    };

    useEffect(() => {
      window.addEventListener("mouseup", onMouseDown);

      return () => window.removeEventListener("mouseup", onMouseDown);
    });

    useEffect(() => {
      const node = d3.select(canvas.current);
      const pathId = "path" + id;

      if (isPressing && pointRef.current && canvas.current) {
        const x0 =
          pointRef.current.getBoundingClientRect().top + window.scrollY;
        const y0 = pointRef.current.getBoundingClientRect().right;
        const y1 = docX;
        const x1 = docY;
        const k = y1 / y0;

        const path = d3.path();
        path.moveTo(y0, x0);
        path.bezierCurveTo(y1 - k, x0, y0, x1, y1 - k, x1);
        path.lineTo(y1, x1);

        node.select("#" + pathId).remove();
        node
          .append("path")
          .attr("id", pathId)
          .attr("d", path.toString())
          .attr("class", styles.line);
      }
      if (!isPressing) {
        node.select("#" + pathId).remove();
      }
    }, [canvas, docX, docY, id, isPressing]);

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
      </Box>
    );
  },
};

export default buttonBlock;
