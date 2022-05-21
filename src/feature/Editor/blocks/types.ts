import { ChangeEvent } from "react";

export type BlockComponentProps<T> = {
  data: string;
  onChange: (e: ChangeEvent<T>) => void;
};

export type BlockType<T extends HTMLElement = HTMLInputElement> = {
  name: string;
  Component: ({ onChange, data }: BlockComponentProps<T>) => React.ReactElement;
};
