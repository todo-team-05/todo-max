import { useContext, useRef, useState } from "react";
import { Card, Column } from "../../pages/MainPage";
import { DefaultCard } from "../Card/DefaultCard";
import { ColumnTitle } from "./ColumnTitle";
import { AddCard } from "../Card/AddCard";
import { HistoryContext } from "../../contexts/HistoryContext";
import { CardContext } from "../../contexts/CardContext";
import { CloneCard } from "../Card/CloneCard";

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

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ드래그ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  const cardContextValue = useContext(CardContext);
  const {
    dragCardDataRef,
    dragPosition,
    currentDraggedOverCardRef,
    isColumnDraggedOverRef,
    setIsOverHalf,
    isCardDraggedOverRef,
  } = cardContextValue!;
  const columnRef = useRef<HTMLDivElement>(null);

  const columnRect = columnRef.current?.getBoundingClientRect();

  const isDraggingColumn = dragCardDataRef.current.columnId === column.id;

  // if (columnRect) {
  //   sharedColumnRect.current = {
  //     ...sharedColumnRect.current,
  //     [column.id]: columnRect,
  //   };
  // }

  // console.log(draggingColumnRef.current, column.id);
  if (columnRect) {
    const isInside =
      dragPosition.cardMiddleX >= columnRect!.left &&
      dragPosition.cardMiddleX <= columnRect!.right &&
      dragPosition.cardMiddleY >= columnRect!.top &&
      dragPosition.cardMiddleY <= columnRect!.bottom;

    // if (isInside && currentDragOverColumnRef.current === column.id) {
    //   setIsOverHalf(false);
    //   console.log("자기 칼럼");
    // }

    if (isInside && currentDraggedOverCardRef.current.columnId !== column.id) {
      isCardDraggedOverRef.current = false;
      isColumnDraggedOverRef.current = true;

      currentDraggedOverCardRef.current.columnId = column.id;
      setIsOverHalf(true);
      // console.log("칼럼", column.id, "로", "들어왓어");

      // }
    }
  }

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
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
    <div ref={columnRef} css={{ ...columnWrapper, position: "relative" }}>
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
          columnId={column.id}
          key={card.id}
          id={card.id}
          cardTitle={card.title}
          cardContent={card.contents}
          removeCard={removeCard}
          updateEditCard={updateEditCard}
        />
      ))}
      {isColumnDraggedOverRef.current &&
      currentDraggedOverCardRef.current.columnId === column.id &&
      dragCardDataRef.current.columnId !== column.id &&
      !isCardDraggedOverRef.current ? (
        <CloneCard
          cloneType="to"
          cloneCardPosition={{ x: 0, y: 0 }}
          newCardTitle={dragCardDataRef.current.cardTitle!}
          newCardContent={dragCardDataRef.current.cardContent!}
          getUserDevice={dragCardDataRef.current.userAdvice}
        />
      ) : null}
    </div>
  );
}

const columnWrapper = {
  display: "flex",
  flexDirection: "column" as const,
  width: "300px",
  gap: "8px",
};
