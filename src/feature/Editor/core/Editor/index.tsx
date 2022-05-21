import { Board } from "../../../../components";
import { BlockType } from "../../blocks/types";
import { EditorState, EditorContext } from "../../hooks/useEditor";
import { useImmer } from "use-immer";

type EditorProps = {
  blocks: BlockType[];
  value: Pick<EditorState, "id" | "content">;
};

const Editor = ({ value, blocks }: EditorProps) => {
  const [state, updateState] = useImmer({ blocks, ...value });

  return (
    <EditorContext.Provider value={{ ...state, updateState }}>
      <Board />
    </EditorContext.Provider>
  );
};

export default Editor;
