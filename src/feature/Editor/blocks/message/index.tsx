import { Input } from "@mui/material";
import { BlockType } from "../types";

const messageBlock: BlockType<HTMLInputElement> = {
  name: "message",
  Component: (props) => <Input placeholder="Введите сообщение..." {...props} />,
};

export default messageBlock;
