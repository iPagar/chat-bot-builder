import { Box, Button, Card as DefaultCard, InputBase } from "@mui/material";
import {
  createElement,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import classNames from "classnames";
import useEditor from "../../../feature/Editor/hooks/useEditor";
import messageBlock from "../../../feature/Editor/blocks/message";
import useCard from "../../../feature/Editor/hooks/useCard";

type CardProps = {
  index: number;
};

const Card = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement> & CardProps, HTMLDivElement>
>(({ style, className, index, ...props }, ref) => {
  const {
    editorState: { blocks },
  } = useEditor();
  const {
    card: { title, fields },
    setTitle,
    addField,
    editField,
  } = useCard(index);

  return (
    <div ref={ref} style={{ ...style }} className={className} {...props}>
      <DefaultCard
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: 1,
            background: "blue",
          }}
        >
          <Box
            ml={1}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              mr={1}
              className={classNames("card-drag-handle", styles.draggableHandle)}
            >
              <DragIndicatorIcon />
            </Box>
            <InputBase
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
              value={title}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {fields.map(({ name, data }, i) => {
            const block = blocks.filter((block) => block.name === name)[0];
            if (!block) {
              throw new Error(`${name}: block not found`);
            }

            return createElement(block.Component, {
              key: i,
              onChange: (e) => {
                editField(i, e.currentTarget.value);
              },
              data,
            });
          })}
        </Box>
        <Button
          startIcon={<AddIcon />}
          onClick={() => {
            const { name } = messageBlock;
            addField({
              name,
              data: "",
            });
          }}
        >
          Добавить сообщение
        </Button>
        <Button startIcon={<AddIcon />}>Добавить кнопку</Button>
      </DefaultCard>
    </div>
  );
});

export default Card;
