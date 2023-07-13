import { useState } from "react";
import { Card, Column } from "../../pages/MainPage";
import { DefaultCard } from "../Card/Card";
import { ColumnTitle } from "./ColumnTitle";
import { AddCard } from "../Card/AddCard";

export function ColumnWrapper({ column }: { column: Column }) {
  const [isAddCard, setIsAddCard] = useState<boolean>(false);
  const [cardsList, setCardsList] = useState<Card[]>(column.cards); // column.cards
  const columnTitle = column.name;
  const cardsCount = column.cards.length;

  // const cardsCount = 10; // 두자리 수 모킹 값
  const showAddCard = () => {
    setIsAddCard(true);
  };

  const closeAddCard = () => {
    setIsAddCard(false);
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "268px",
        gap: "8px",
        padding: "0 16px",
      }}>
      <ColumnTitle
        columnTitle={columnTitle}
        cardsCount={cardsCount}
        showAddCard={showAddCard}
      />
      {isAddCard && <AddCard closeAddCard={closeAddCard} />}
      {cardsList.map((card) => (
        <DefaultCard
          key={card.id}
          cardTitle={card.title}
          cardContent={card.contents}
        />
      ))}
    </div>
  );
}
