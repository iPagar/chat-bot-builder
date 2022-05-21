import { Box, Typography } from "@mui/material";
import GridLayout from "react-grid-layout";
import _ from "lodash";
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import Card from "./Card";
import useEditor from "../../feature/Editor/hooks/useEditor";

const Board = () => {
  const {
    editorState: { content },
  } = useEditor();

  const generateLayout = () => {
    return _.map(_.range(0, 1), function (item, i) {
      return {
        x: i * 2,
        y: i * 2,
        w: 1,
        h: 1,
        i: i.toString(),
        isBounded: true,
      };
    });
  };

  return (
    <Box
      sx={{
        background: "green",
        height: 5000,
        width: 600,
      }}
    >
      <Typography>Field</Typography>
      <GridLayout
        margin={[50, 50]}
        layout={generateLayout()}
        cols={1}
        style={{
          position: "relative",
          height: "100%",
          background: "navy",
        }}
        width={600}
        compactType="vertical"
        draggableHandle={".card-drag-handle"}
      >
        {content.map((card, i) => (
          <Card key={i} {...card} index={i} />
        ))}
      </GridLayout>
    </Box>
  );
};

export default Board;
