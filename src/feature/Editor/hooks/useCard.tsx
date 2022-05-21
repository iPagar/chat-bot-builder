import { useState } from "react";
import { CardType } from "../../../components/Board/Card";

const useCard = () => {
  const [card, setCard] = useState<CardType>({
    title: "Заголовок",
    messages: [],
    buttons: [],
  });

  return [card, setCard];
};

export default useCard;
