import { createContext, useContext } from "react";
import { BlockType } from "../blocks/types";
import { Updater } from "use-immer";

export type EditorState = {
  id: string;
  blocks: BlockType[];
  content: CardType[];
};

export type CardType = {
  id: string;
  title: string;
  fields: CardFieldType[];
};

export type CardFieldType = {
  data: string;
} & Pick<BlockType, "name">;

export const EditorContext = createContext<
  (EditorState & { updateState: Updater<EditorState> }) | null
>(null);

function useEditor() {
  const editorState = useContext(EditorContext);

  if (!editorState) {
    throw new Error("EditorContext is not defined");
  }

  return { editorState };
}

export default useEditor;
