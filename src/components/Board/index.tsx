import { Box, Typography } from "@mui/material";
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import Card from "./Card";
import useEditor from "../../feature/Editor/hooks/useEditor";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { CSSProperties, useEffect, useRef } from "react";
import * as d3 from "d3";

const grid = 8;

const getItemStyle = (
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): CSSProperties => {
  return {
    margin: `0 0 ${grid}px 0`,
    ...draggableStyle,
  };
};

const getListStyle = (_isDraggingOver: boolean): CSSProperties => ({
  padding: grid,
  width: "80%",
});

const Board = () => {
  const {
    editorState: { content, updateState },
  } = useEditor();
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "green",
        height: 5000,
        width: 600,
      }}
    >
      <Typography>Field</Typography>
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return;
          }

          const { source, destination } = result;

          updateState((draft) => {
            const [sourceItem] = draft.content.splice(source.index, 1);
            draft.content.splice(destination.index, 0, sourceItem);
          });
        }}
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {content.map((item, index) => (
                <Draggable
                  disableInteractiveElementBlocking
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Card
                      id={item.id}
                      canvas={svgRef}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      style={getItemStyle(provided.draggableProps.style)}
                      key={index}
                      index={Number(index)}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      ></svg>
    </Box>
  );
};

export default Board;
