import { Input } from "@mui/material";
import { BlockType } from "../types";

const messageBlock: BlockType<HTMLInputElement> = {
  type: "standart",
  name: "message",
  Component: ({ data, ...props }) => (
    <Input
      placeholder="Введите сообщение..."
      {...props}
      value={data}
      fullWidth
    />
  ),
};

export default messageBlock;
