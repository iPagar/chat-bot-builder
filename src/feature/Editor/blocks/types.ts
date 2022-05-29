import { ChangeEvent, RefObject } from "react";

export type BlockComponentProps<T> = {
  data: string;
  onChange: (e: ChangeEvent<T>) => void;
  id: string;
};

export type BlockEdgeComponentProps<T> = BlockComponentProps<T> & {
  canvas: RefObject<SVGSVGElement>;
  onEdgeDropped: (x: number, y: number) => void;
};

export type BlockType<T extends HTMLElement = HTMLInputElement> =
  | BlockStandartType<T>
  | BlockEdgeType<T>;

export type BlockCommon = {
  name: string;
  addLabel: string;
};

export type BlockStandartType<T extends HTMLElement = HTMLInputElement> =
  BlockCommon & {
    type: "standart";
    Component: ({
      onChange,
      data,
      id,
    }: BlockComponentProps<T>) => React.ReactElement;
  };

export type BlockEdgeType<T extends HTMLElement = HTMLInputElement> =
  BlockCommon & {
    type: "edge";
    Component: ({
      onChange,
      canvas,
      data,
      id,
      onEdgeDropped,
    }: BlockEdgeComponentProps<T>) => React.ReactElement;
  };
