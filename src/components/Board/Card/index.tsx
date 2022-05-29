import { Box, Button, Card as DefaultCard, InputBase } from "@mui/material";
import {
  createElement,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  RefObject,
  useEffect,
  useState,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import useEditor from "../../../feature/Editor/hooks/useEditor";
import useCard from "../../../feature/Editor/hooks/useCard";
import Block from "./Block";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { animated, useSpring } from "@react-spring/web";
import classnames from "classnames";
import * as d3 from "d3";

type CardProps = {
  index: number;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  canvas: RefObject<SVGSVGElement>;
  id: string;
};

const Card = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement> & CardProps, HTMLDivElement>
>(({ style, className, index, id, dragHandleProps, canvas, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoveredStyles = useSpring({
    scale: isHovered ? 1.05 : 1,
  });
  const {
    editorState: { blocks, content },
  } = useEditor();
  const {
    card: { title, fields },
    setTitle,
    addField,
    editField,
    removeField,
    connectField,
  } = useCard(index);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const edges = fields
      .map((item, i) => ({
        item,
        i,
      }))
      .filter((field) => field.item.type === "edge");

    edges.forEach((edge) => {
      const source = window.document.querySelector(
        `#${"field" + edge.i.toString() + "-" + id}`
      );
      if (edge.item.type === "edge" && edge.item.target) {
        const target = window.document.querySelector("#" + edge.item.target);

        if (source && target) {
          const x0 =
            source.getBoundingClientRect().top +
            window.scrollY +
            source.getBoundingClientRect().height / 2;
          const y0 = source.getBoundingClientRect().right;
          const y1 =
            target.getBoundingClientRect().right -
            target.getBoundingClientRect().width / 2;
          const x1 =
            target.getBoundingClientRect().top +
            window.scrollY +
            target.getBoundingClientRect().height / 2;
          const k = y1 / y0;

          const path = d3.path();
          path.moveTo(y0, x0);
          path.bezierCurveTo(y1 - k, x0, y0, x1, y1 - k, x1);
          path.lineTo(y1, x1);

          const node = d3.select(canvas.current);

          const fieldSelect = node.select(
            "#field" + edge.i.toString() + "-" + id
          );
          if (fieldSelect.size() === 1) {
            fieldSelect
              .attr("id", "field" + edge.i.toString() + "-" + id)
              .attr("d", path.toString())
              .attr("class", styles.line);
          } else {
            node
              .append("path")
              .attr("id", "field" + edge.i.toString() + "-" + id)
              .attr("d", path.toString())
              .attr("class", styles.line);
          }
        }
      }
    });
  }, [canvas, fields, id, content]);

  return (
    <div
      ref={ref}
      style={{ ...style }}
      className={classnames(className, `card`)}
      {...props}
      id={"card" + id}
    >
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

              switch (block.type) {
                case "edge":
                  return (
                    <Block
                      key={i}
                      onRemove={() => removeField(i)}
                      id={"field" + i.toString() + "-" + id}
                    >
                      {createElement(block.Component, {
                        id: index.toString(),
                        onChange: (e) => {
                          editField(i, e.currentTarget.value);
                        },
                        data,
                        canvas,
                        onEdgeDropped: (x, y) => {
                          const cardId = window.document
                            .elementsFromPoint(x, y)
                            .find((el) => el.className.includes("card"))?.id;
                          if (cardId) {
                            connectField(i, cardId);
                          }
                        },
                      })}
                    </Block>
                  );
                case "standart":
                  return (
                    <Block
                      key={i}
                      onRemove={() => removeField(i)}
                      id={"field" + i.toString() + "-" + id}
                    >
                      {createElement(block.Component, {
                        id: index.toString(),
                        onChange: (e) => {
                          editField(i, e.currentTarget.value);
                        },
                        data,
                      })}
                    </Block>
                  );
                default:
                  throw new Error(`block type not found`);
              }
            })}
          </Box>
          {blocks.map((block, i) => {
            switch (block.type) {
              case "standart":
                return (
                  <Button
                    key={i}
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const { type, name } = block;
                      addField({
                        type,
                        name,
                        data: "",
                      });
                    }}
                  >
                    {block.addLabel}
                  </Button>
                );
              case "edge":
                return (
                  <Button
                    key={i}
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const { type, name } = block;
                      addField({
                        type,
                        name,
                        data: "",
                        target: "",
                      });
                    }}
                  >
                    {block.addLabel}
                  </Button>
                );
              default:
                throw new Error(`block type not found`);
            }
          })}
        </DefaultCard>
      </animated.div>
    </div>
  );
});

export default Card;
