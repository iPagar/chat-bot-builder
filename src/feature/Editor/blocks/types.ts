import { ChangeEvent, RefObject } from "react";

export type BlockComponentProps<T> = {
  data: string;
  onChange: (e: ChangeEvent<T>) => void;
  id: string;
};

export type BlockType<T extends HTMLElement = HTMLInputElement> =
  | BlockStandartType<T>
  | BlockEdgeType<T>;

export type BlockStandartType<T extends HTMLElement = HTMLInputElement> = {
  type: "standart";
  name: string;
  Component: ({
    onChange,
    data,
    id,
  }: BlockComponentProps<T>) => React.ReactElement;
};

export type BlockEdgeType<T extends HTMLElement = HTMLInputElement> = {
  type: "edge";
  name: string;
  Component: ({
    onChange,
    canvas,
    data,
    id,
  }: BlockComponentProps<T> & {
    canvas: RefObject<SVGSVGElement>;
  }) => React.ReactElement;
};
