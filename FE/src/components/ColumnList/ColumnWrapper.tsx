import { useContext, useState } from "react";
import { Card, Column } from "../../pages/MainPage";
import { DefaultCard } from "../Card/DefaultCard";
import { ColumnTitle } from "./ColumnTitle";
import { AddCard } from "../Card/AddCard";
import { HistoryContext } from "../../contexts/HistoryContext";

export function ColumnWrapper({
  id,
  column,
  removeColumn,
}: {
  id: number;
  column: Column;
  removeColumn(columnId: number): void;
}) {
  const { setHistoryData } = useContext(HistoryContext)!;
  const [isAddCard, setIsAddCard] = useState<boolean>(false);
  const [cardsList, setCardsList] = useState<Card[]>(column.cards);
  const columnTitle = column.name;

  const showAddCard = () => {
    setIsAddCard(true);
  };

  const closeAddCard = () => {
    setIsAddCard(false);
  };

  const addNewCard = (inputTitle: string, inputContent: string) => {
    const newCard = {
      id: Date.now(),
      title: inputTitle,
      contents: inputContent,
    };

    const newHistory = {
      title: inputTitle,
      at: columnTitle,
      action: "카드등록",
    };

    setHistoryData((prevHistoryData) => [newHistory, ...prevHistoryData]);
    setCardsList((prevCardsList) => [newCard, ...prevCardsList]);
    closeAddCard();
  };

  const removeCard = (key: number, cardTitle: string) => {
    const filter = cardsList.filter((list) => list.id !== key);
    const newHistory = {
      title: cardTitle,
      at: columnTitle,
      action: "카드삭제",
    };

    setHistoryData((prevHistoryData) => [newHistory, ...prevHistoryData]);
    setCardsList(filter);
  };

  const updateEditCard = (
    inputTitle: string,
    inputContent: string,
    cardId: number
  ) => {
    setCardsList((prevCardsList) => {
      return prevCardsList.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            title: inputTitle,
            contents: inputContent,
          };
        }
        return card;
      });
    });
  };

  const handleRemoveColumn = () => {
    removeColumn(id);
  };

  return (
    <div css={columnWrapper}>
      <ColumnTitle
        columnTitle={columnTitle}
        cardsCount={cardsList.length}
        showAddCard={showAddCard}
        handleRemoveColumn={handleRemoveColumn}
      />
      {isAddCard && (
        <AddCard closeAddCard={closeAddCard} addNewCard={addNewCard} />
      )}
      {cardsList.map((card) => (
        <DefaultCard
          key={card.id}
          id={card.id}
          cardTitle={card.title}
          cardContent={card.contents}
          removeCard={removeCard}
          updateEditCard={updateEditCard}
        />
      ))}
    </div>
  );
}

const columnWrapper = {
  display: "flex",
  flexDirection: "column" as const,
  width: "300px",
  gap: "8px",
};
