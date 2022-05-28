import { Box, Button, Card as DefaultCard, InputBase } from "@mui/material";
import {
  createElement,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  useState,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import useEditor from "../../../feature/Editor/hooks/useEditor";
import messageBlock from "../../../feature/Editor/blocks/message";
import useCard from "../../../feature/Editor/hooks/useCard";
import Block from "./Block";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import buttonBlock from "../../../feature/Editor/blocks/button";
import { animated, useSpring } from "@react-spring/web";

type CardProps = {
  index: number;
  dragHandleProps?: DraggableProvidedDragHandleProps;
};

const Card = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement> & CardProps, HTMLDivElement>
>(({ style, className, index, dragHandleProps, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoveredStyles = useSpring({
    scale: isHovered ? 1.05 : 1,
  });
  const {
    editorState: { blocks },
  } = useEditor();
  const {
    card: { title, fields },
    setTitle,
    addField,
    editField,
    removeField,
  } = useCard(index);

  return (
    <div ref={ref} style={{ ...style }} className={className} {...props}>
      <animated.div style={hoveredStyles}>
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
                {...dragHandleProps}
                className={styles.draggableHandle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
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

              return (
                <Block key={i} onRemove={() => removeField(i)}>
                  {createElement(block.Component, {
                    onChange: (e) => {
                      editField(i, e.currentTarget.value);
                    },
                    data,
                  })}
                </Block>
              );
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
          <Button
            startIcon={<AddIcon />}
            onClick={() => {
              const { name } = buttonBlock;
              addField({
                name,
                data: "",
              });
            }}
          >
            Добавить кнопку
          </Button>
        </DefaultCard>
      </animated.div>
    </div>
  );
});

export default Card;
