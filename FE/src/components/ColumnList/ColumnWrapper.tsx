import { useContext, useEffect, useRef, useState } from "react";
import { Card, Column } from "../../pages/MainPage";
import { DefaultCard } from "../Card/DefaultCard";
import { ColumnTitle } from "./ColumnTitle";
import { AddCard } from "../Card/AddCard";
import { HistoryContext } from "../../contexts/HistoryContext";
import { CardContext } from "../../contexts/CardContext";
import { CloneCard } from "../Card/CloneCard";
import { colors } from "../../constants/colors";

export function ColumnWrapper({
  id,
  column,
  removeColumn,
  refreshMainData,
}: {
  id: number;
  column: Column;
  removeColumn(columnId: number): void;
  refreshMainData(): void;
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
    columnsRectsRef,
    isDroppedRef,
    droppedCardRef,
  } = cardContextValue!;
  const columnRef = useRef<HTMLDivElement>(null);

  const [columnRect, setColumnRect] = useState<DOMRect | undefined>();

  // const columnRect = columnRef.current?.getBoundingClientRect();

  useEffect(() => {
    function updateRect() {
      setColumnRect(columnRef.current?.getBoundingClientRect());
    }

    updateRect();

    // Listen for resize events to recalculate the rect
    window.addEventListener("resize", updateRect);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", updateRect);
    };
  }, [columnRef]);

  useEffect(() => {
    if (columnRect) {
      columnsRectsRef.current = {
        ...columnsRectsRef.current,
        [column.id]: columnRect,
      };
    }
  }, [columnRect]);

  // const isDraggingColumn = dragCardDataRef.current.columnId === column.id;

  useEffect(() => {
    if (
      droppedCardRef.current.categoryId === column.id &&
      isDroppedRef.current
    ) {
      setCardsList((prevCardsList) => {
        const afterCardId = prevCardsList.findIndex(
          (card) => card.id === droppedCardRef.current.afterCardId
        );
        console.log(afterCardId);
        const newCard = {
          id: droppedCardRef.current.cardId,
          title: dragCardDataRef.current.cardTitle,
          contents: dragCardDataRef.current.cardContent,
        };

        const newCardList = [...prevCardsList];
        newCardList.splice(afterCardId, 0, newCard);
        console.log(newCardList);

        return newCardList;
      });
    }
    if (
      dragCardDataRef.current.columnId === column.id &&
      isDroppedRef.current
    ) {
      console.log("드래그한 곳이야", column.id);

      setCardsList((prevCardsList) => {
        const newCardList = prevCardsList.filter(
          (card) => card.id !== droppedCardRef.current.cardId
        );
        return newCardList;
      });
    }

    dragCardDataRef.current.cardId = 0;
    setIsOverHalf(false);
  }, [droppedCardRef.current]);

  useEffect(() => {
    if (columnRect) {
      const isInside =
        dragPosition.cardMiddleX >= columnRect!.left &&
        dragPosition.cardMiddleX <= columnRect!.right &&
        dragPosition.cardMiddleY >= columnRect!.top &&
        dragPosition.cardMiddleY <= columnRect!.bottom;

      if (
        isInside &&
        currentDraggedOverCardRef.current.columnId !== column.id
      ) {
        isCardDraggedOverRef.current = false;
        isColumnDraggedOverRef.current = true;

        currentDraggedOverCardRef.current = {
          cardId: 0,
          columnId: column.id,
          position: "",
        };
        isDroppedRef.current = true;
        setIsOverHalf(true);
        console.log("칼럼", column.id, "로", "들어왓어");
      }
      if (
        isInside &&
        currentDraggedOverCardRef.current.columnId ===
          dragCardDataRef.current.columnId
      ) {
        isCardDraggedOverRef.current = false;
        isColumnDraggedOverRef.current = true;

        currentDraggedOverCardRef.current = {
          cardId: 0,
          columnId: column.id,
          position: "",
        };

        console.log("자기야");
        setIsOverHalf(false);
        isDroppedRef.current = false;
      }
      // const dragCard = dragCardDataRef.current.cardId;
      // const dragOverColumn = currentDraggedOverCardRef.current.columnId;

      // const putObj = {
      //   cardId: dragCard,
      //   categoryId: dragOverColumn,
      //   beforeCardId: column.cards.length,
      //   afterCardId: 0,
      // };
      // console.log("칼럼길이", column.cards.length);
      // console.log(putObj);

      // const url = `http://dev-todo-max-team5-be.ap-northeast-2.elasticbeanstalk.com/card/move`; // 카드를 수정할 엔드포인트
      // // console.log(putObj);
      // fetch(url, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(putObj),
      // })
      //   .then((response) => {
      //     if (response.status === 200) {
      //       console.log("카드가 성공적으로 수정되었습니다.");
      //     } else if (response.status === 400) {
      //       console.log("카드를 찾을 수 없습니다.");
      //     } else {
      //       console.log("카드 수정에 실패했습니다.");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("PUT 요청 중 에러가 발생했습니다:", error);
      //   });
    }
  }, [
    columnRect,
    column.id,
    dragPosition,
    currentDraggedOverCardRef.current.columnId,
  ]);

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
      action: "생성",
      createdAt: new Date().toString(),
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
      action: "삭제",
      createdAt: new Date().toString(),
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
        <AddCard
          id={id}
          columnId={column.id}
          closeAddCard={closeAddCard}
          addNewCard={addNewCard}
          refreshMainData={refreshMainData}
        />
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
  "display": "flex",
  "flexDirection": "column" as const,
  "width": "310px",
  "height": "700px",
  // "overflow": "scroll",
  // "overflowX": "hidden" as const,
  "gap": "8px",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: colors.borderDefault,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: colors.gray400,
  },
};
