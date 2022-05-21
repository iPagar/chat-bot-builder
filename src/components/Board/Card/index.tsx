import { Box, Button, Card as DefaultCard } from "@mui/material";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import classNames from "classnames";

export type CardType = {
  title: string;
  messages: CardMessageType[];
  buttons: CardButtonType[];
};

export type CardMessageType = {
  text: string;
};

export type CardButtonType = {
  text: string;
};

const Card = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement & CardType>
>(({ style, className, title, ...props }, ref) => {
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
            <span contentEditable suppressContentEditableWarning>
              {title}
            </span>
          </Box>
        </Box>
        <Button startIcon={<AddIcon />}>Добавить сообщение</Button>
        <Button startIcon={<AddIcon />}>Добавить кнопку</Button>
      </DefaultCard>
    </div>
  );
});

export default Card;
