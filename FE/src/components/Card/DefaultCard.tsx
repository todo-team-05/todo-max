import { colors } from "../../constants/colors";
import { IconButton } from "../Button/IconButton";
import { Txt } from "../Txt";
import { getUserDevice } from "../../utils/getUserDevice";
import { shadow } from "../../constants/shadow";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { Alert } from "../Alert/Alert";
import { Dim } from "../Dim/Dim";
import { HistoryContext } from "../../contexts/HistoryContext";
import { CardContext } from "../../contexts/CardContext";
import { CloneCard } from "./CloneCard";
import { autoGrow } from "../../utils/autoGrow";

export function DefaultCard({
  columnId,
  id,
  cardTitle,
  cardContent,
  removeCard,
  updateEditCard,
}: {
  columnId: number;
  id: number;
  cardTitle: string;
  cardContent: string;
  removeCard(key: number, cardTitle: string): void;
  updateEditCard(
    inputTitle: string,
    inputContent: string,
    cardId: number
  ): void;
}) {
  const { setHistoryData } = useContext(HistoryContext)!;
  const [cardState, setCardState] = useState<"default" | "edit" | "delete">(
    "default"
  );
  const [newCardTitle, setNewCardTitle] = useState<string>(cardTitle);
  const [newCardContent, setNewCardContent] = useState<string>(cardContent);

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ드래그ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ드래그 상태ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  const cardContextValue = useContext(CardContext)!;
  const {
    dragCardDataRef,
    dragPosition,
    setDragPosition,
    isOverHalf,
    setIsOverHalf,
    isCardDraggedOverRef,
    isColumnDraggedOverRef,
    currentDraggedOverCardRef,
    columnsRectsRef,
    isDroppedRef,
    droppedCardRef,
  } = cardContextValue!;

  const cardRef = useRef<HTMLDivElement>(null);
  const isDragStartRef = useRef<boolean>(false);

  const editCardTitleRef = useRef<HTMLTextAreaElement>(null);
  const editCardContentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (cardState === "edit") {
      // 여기에서 editCardTitleRef.current와 editCardContentRef.current는
      // 이미 DOM에 마운트된 상태이므로 null이 아닙니다.
      // 이제 원하는 동작을 수행할 수 있습니다.
      console.log(editCardTitleRef.current);
      console.log(editCardContentRef.current);
      autoGrow("card", editCardTitleRef.current!);
      autoGrow("card", editCardContentRef.current!);
    }
  }, [cardState]);
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ드래그 상태ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  const cardRect = cardRef.current?.getBoundingClientRect();

  const isDraggingCard = dragCardDataRef.current.cardId === id;

  useEffect(() => {
    if (cardRect) {
      const isInside =
        dragPosition.cardMiddleX >= cardRect!.left &&
        dragPosition.cardMiddleX <= cardRect!.right &&
        dragPosition.cardMiddleY >= cardRect!.top &&
        dragPosition.cardMiddleY <= cardRect!.bottom;

      const isAbove =
        dragPosition.cardTop + cardRect.height / 2 <
        cardRect.y + cardRect.height / 2;
      const position = isAbove ? "above" : "below";

      // if (isInside && currentDragOverCardRef.current.cardId === id) {
      //   console.log("같은카드");
      //   setIsOverHalf(false);
      // }
      if (
        isInside &&
        !isDraggingCard &&
        currentDraggedOverCardRef.current.position !== position
      ) {
        isCardDraggedOverRef.current = true;
        isColumnDraggedOverRef.current = false;

        currentDraggedOverCardRef.current = {
          cardId: id,
          columnId: columnId,
          position: position,
        };

        isDroppedRef.current = true;
        setIsOverHalf(true);

        console.log(id, "로", position, "으로", "들어왓어");
      }
      // } else if (
      //   !isInside &&
      //   !isCardDraggedOverRef.current &&
      //   currentDraggedOverCardRef.current.cardId !== id
      // ) {
      //   // console.log("안들어와잇음");
      if (
        isInside &&
        currentDraggedOverCardRef.current.cardId ===
          dragCardDataRef.current.cardId
      ) {
        currentDraggedOverCardRef.current = {
          cardId: id,
          columnId: columnId,
          position: position,
        };
        // console.log("스스로");
        isDroppedRef.current = false;
        setIsOverHalf(false);
      }
    }
  }, [dragPosition]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardState === "edit" || cardState === "delete") return;
    e.preventDefault();

    const dragCardRect = cardRef.current?.getBoundingClientRect();

    if (dragCardRect) {
      // console.log(columnsRectsRef.current);
      isDragStartRef.current = true;

      dragCardDataRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        cloneCardX: dragCardRect.x,
        cloneCardY: dragCardRect.y,
        absoluteX: dragCardRect.x - columnsRectsRef.current[columnId].x,
        absoluteY: dragCardRect.y - columnsRectsRef.current[columnId].y,
        cardId: id,
        columnId: columnId,
        cardTitle: cardTitle,
        cardContent: cardContent,
        userAdvice: getUserDevice(),
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();

    if (isDragStartRef.current) {
      const moveX = e.clientX - dragCardDataRef.current.startX;
      const moveY = e.clientY - dragCardDataRef.current.startY;
      const dragCardRect = cardRef.current?.getBoundingClientRect()!;

      setDragPosition({
        x: moveX,
        y: moveY,
        cardMiddleX: dragCardRect.x + dragCardRect.width / 2,
        cardMiddleY: dragCardRect.y + dragCardRect.height / 2,
        cardTop: dragCardRect.y,
      });
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();

    if (isDragStartRef.current && dragCardDataRef.current.cardId === id) {
      const isAbove = currentDraggedOverCardRef.current.position === "above";
      const isCard = currentDraggedOverCardRef.current.cardId !== 0;
      currentDraggedOverCardRef.current.cardId;
      console.log(
        dragCardDataRef.current.cardId,
        "번 카드가",
        isCard ? currentDraggedOverCardRef.current.cardId + "번 카드" : "칼럼",
        "번 카드",
        isAbove ? "위에" : "아래에",
        "들어왓어"
      );
      const dragCard = dragCardDataRef.current.cardId;
      const dragOverColumn = currentDraggedOverCardRef.current.columnId;

      if (currentDraggedOverCardRef.current.cardId) {
        const dragOverCard = currentDraggedOverCardRef.current.cardId;

        const putObj = {
          cardId: dragCard,
          categoryId: dragOverColumn,
          beforeCardId: isCard
            ? isAbove
              ? dragOverCard - 1
              : dragOverCard
            : 0,
          afterCardId: isCard ? (isAbove ? dragOverCard : dragOverCard + 1) : 0,
        };

        droppedCardRef.current = {
          ...putObj,
        };
        //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
        // console.log(JSON.stringify(putObj));

        const url = `http://dev-todo-max-team5-be.ap-northeast-2.elasticbeanstalk.com/card/move`; // 카드를 수정할 엔드포인트

        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(putObj),
        })
          .then((response) => {
            if (response.status === 200) {
              console.log("카드가 성공적으로 수정되었습니다.");
            } else if (response.status === 400) {
              console.log("카드를 찾을 수 없습니다.");
            } else {
              console.log("카드 수정에 실패했습니다.");
            }
          })
          .catch((error) => {
            console.error("PUT 요청 중 에러가 발생했습니다:", error);
          });
      }
      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      isColumnDraggedOverRef.current = false;
      isCardDraggedOverRef.current = false;
      dragCardDataRef.current.cardId = 0;

      currentDraggedOverCardRef.current = {
        cardId: 0,
        columnId: 0,
        position: "",
      };

      setIsOverHalf(false);
      setDragPosition({
        x: 0,
        y: 0,
        cardMiddleX: 0,
        cardMiddleY: 0,
        cardTop: 0,
      });
    }
    isDragStartRef.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ드래그ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  const showDeleteCardModal = () => {
    setCardState("delete");
  };

  const closeDeleteCardModal = () => {
    setCardState("default");
  };

  const handleOnClickRemoveCard = () => {
    removeCard(id, cardTitle);
    handleDeleteCard();
  };

  const handleDeleteCard = () => {
    const url = `http://dev-todo-max-team5-be.ap-northeast-2.elasticbeanstalk.com/card/${id}`; // 카드를 삭제할 엔드포인트

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("카드가 성공적으로 삭제되었습니다.");
        } else if (response.status === 404) {
          console.log("카드를 찾을 수 없습니다.");
        } else {
          console.log("카드 삭제에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("DELETE 요청 중 에러가 발생했습니다:", error);
      });
  };

  const handleModifyCard = () => {
    const url = `http://dev-todo-max-team5-be.ap-northeast-2.elasticbeanstalk.com/card/modify`; // 카드를 수정할 엔드포인트

    const data = {
      id: id,
      title: newCardTitle,
      contents: newCardContent,
    };
    console.log(data);
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("카드가 성공적으로 수정되었습니다.");
        } else if (response.status === 400) {
          console.log("카드를 찾을 수 없습니다.");
        } else {
          console.log("카드 수정에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("PUT 요청 중 에러가 발생했습니다:", error);
      });
  };

  const editCard = () => {
    setNewCardTitle(cardTitle);
    setNewCardContent(cardContent);
    setCardState("edit");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    autoGrow("card", e.target);
    setNewCardTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    autoGrow("card", e.target);
    setNewCardContent(e.target.value);
  };

  const cancelEditCard = () => {
    setNewCardTitle(cardTitle);
    setNewCardContent(cardContent);
    setCardState("default");
  };

  const saveEditCard = () => {
    const newHistory = {
      title: newCardTitle,
      at: "",
      action: "수정",
      createdAt: new Date().toString(),
    };

    setHistoryData((prevHistoryData) => [newHistory, ...prevHistoryData]);
    updateEditCard(newCardTitle, newCardContent, id);
    setCardState("default");
    handleModifyCard();
  };

  const isButtonDisabled =
    newCardTitle.trim() === "" || newCardContent.trim() === "";

  return (
    <>
      {currentDraggedOverCardRef.current.cardId === id &&
      currentDraggedOverCardRef.current.position === "above" &&
      isCardDraggedOverRef.current ? (
        <CloneCard
          cloneType="to"
          cloneCardPosition={{
            x: 0,
            y: 0,
          }}
          newCardTitle={dragCardDataRef.current.cardTitle!}
          newCardContent={dragCardDataRef.current.cardContent!}
          getUserDevice={getUserDevice()}
        />
      ) : null}
      <div
        onMouseDown={handleMouseDown}
        ref={cardRef}
        css={{
          position: isDraggingCard
            ? isOverHalf
              ? "absolute"
              : "relative"
            : "relative",
          left: isDraggingCard
            ? isOverHalf
              ? dragPosition.x + dragCardDataRef.current.absoluteX
              : dragPosition.x
            : 0,
          top: isDraggingCard
            ? isOverHalf
              ? dragPosition.y + dragCardDataRef.current.absoluteY
              : dragPosition.y
            : 0,
          display: "flex",
          flexDirection: "column",
          // flexGrow: 1,
          width: "268px",
          padding: "16px",
          gap: "16px",
          backgroundColor: colors.surfaceDefault,
          borderRadius: "8px",
          boxShadow: shadow.normal,
          opacity: isDragStartRef.current ? 0.5 : 1,
          zIndex: isDragStartRef.current ? 10 : 0,
        }}>
        <div
          css={{
            display: "flex",
            gap: "4px",
          }}>
          {cardState !== "edit" && (
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                width: "240px",
                gap: "16px",
              }}>
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}>
                <div>
                  <Txt typography="displayBold14" color={colors.textStrong}>
                    {newCardTitle}
                  </Txt>
                </div>
                <div>
                  <Txt typography="displayMedium14" color={colors.textDefault}>
                    {newCardContent}
                  </Txt>
                </div>
              </div>
              <div>
                <Txt typography="displayMedium12" color={colors.textWeak}>
                  {`author by ${getUserDevice()}`}
                </Txt>
              </div>
            </div>
          )}
          {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 에딧 */}
          {cardState === "edit" && (
            <div>
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}>
                <div>
                  <textarea
                    ref={editCardTitleRef}
                    css={{
                      "padding": "0px",
                      "overflowY": "hidden",
                      "whiteSpace": "pre-wrap",
                      "width": "100%",
                      "border": "none",
                      "fontSize": "14px",
                      "fontWeight": 700,
                      "color": colors.textStrong,
                      "::placeholder": {
                        color: colors.textStrong,
                      },
                      ":focus": {
                        outline: 0,
                      },
                      "resize": "none",
                    }}
                    placeholder="제목을 입력해주세요"
                    maxLength={50}
                    value={newCardTitle}
                    onChange={handleTitleChange}
                  />
                </div>
                <div>
                  <textarea
                    ref={editCardContentRef}
                    css={{
                      "padding": "0px",
                      "overflowY": "hidden",
                      "width": "100%",

                      "border": "none",
                      "fontSize": "14px",
                      "fontWeight": 500,
                      "whiteSpace": "pre-wrap",
                      "color": colors.textDefault,
                      "::placeholder": {
                        color: colors.textDefault,
                      },
                      ":focus": {
                        outline: 0,
                      },
                      "resize": "none", // prevent manual resize
                    }}
                    placeholder="내용을 입력해주세요"
                    maxLength={500} // Limit to 500 characters
                    value={newCardContent}
                    onChange={handleContentChange}
                  />
                </div>
              </div>
              <div
                css={{
                  display: "flex",
                  width: "272px",
                  gap: "8px",
                }}>
                <Button
                  text="취소"
                  color={`${colors.textDefault}`}
                  backgroundColor={`${colors.surfaceAlt}`}
                  onClick={cancelEditCard}
                />
                <Button
                  text="저장"
                  color={`${colors.textWhiteDefault}`}
                  backgroundColor={`${colors.surfaceBrand}`}
                  disabled={isButtonDisabled}
                  onClick={saveEditCard}
                />
              </div>
            </div>
          )}
          {cardState !== "edit" && (
            <div>
              <IconButton
                type="close"
                color={colors.textWeak}
                onClick={showDeleteCardModal}
              />
              <IconButton
                type="edit"
                color={colors.textWeak}
                onClick={editCard}
              />
            </div>
          )}
        </div>
      </div>
      {currentDraggedOverCardRef.current.cardId === id &&
      currentDraggedOverCardRef.current.position === "below" &&
      isCardDraggedOverRef.current ? (
        <CloneCard
          cloneType="to"
          cloneCardPosition={{
            x: 0,
            y: 0,
          }}
          newCardTitle={dragCardDataRef.current.cardTitle!}
          newCardContent={dragCardDataRef.current.cardContent!}
          getUserDevice={getUserDevice()}
        />
      ) : null}
      {isDragStartRef.current ? (
        isOverHalf ? null : (
          <CloneCard
            cloneType="from"
            cloneCardPosition={{
              x: dragCardDataRef.current.cloneCardX,
              y: dragCardDataRef.current.cloneCardY,
            }}
            newCardTitle={newCardTitle}
            newCardContent={newCardContent}
            getUserDevice={getUserDevice()}
            isOverHalf={isOverHalf}
          />
        )
      ) : null}
      {cardState === "delete" && (
        <Alert
          type="removeCard"
          onClickLeftButton={closeDeleteCardModal}
          onClickRightButton={handleOnClickRemoveCard}
        />
      )}
      {cardState === "delete" && <Dim />}
    </>
  );
}
