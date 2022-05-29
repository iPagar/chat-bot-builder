import useEditor, { CardFieldEdgeType, CardFieldType } from "./useEditor";

const useCard = (index: number) => {
  const {
    editorState,
    editorState: { updateState },
  } = useEditor();

  const setTitle = (title: string) => {
    updateState((draft) => {
      draft.content[index].title = title;
    });
  };

  const card = editorState.content[index];

  const connectField = (fieldIndex: number, cardId: string) => {
    updateState((draft) => {
      (draft.content[index].fields[fieldIndex] as CardFieldEdgeType).target =
        cardId;
    });
  };

  const addField = (cardFieldType: CardFieldType) => {
    updateState((draft) => {
      draft.content[index].fields.push(cardFieldType);
    });
  };

  const editField = (fieldIndex: number, data: CardFieldType["data"]) => {
    updateState((draft) => {
      draft.content[index].fields[fieldIndex].data = data;
    });
  };

  const removeField = (fieldIndex: number) => {
    updateState((draft) => {
      draft.content[index].fields.splice(fieldIndex, 1);
    });
  };

  return {
    setTitle,
    card,
    addField,
    editField,
    removeField,
    connectField,
  };
};

export default useCard;
