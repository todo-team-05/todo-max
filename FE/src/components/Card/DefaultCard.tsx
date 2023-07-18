import { colors } from "../../constants/colors";
import { IconButton } from "../Button/IconButton";
import { Txt } from "../Txt";
import { getUserDevice } from "../../utils/getUserDevice";
import { shadow } from "../../constants/shadow";
import { useContext, useState } from "react";
import { Button } from "../Button/Button";
import { Alert } from "../Alert/Alert";
import { Dim } from "../Dim/Dim";
import { HistoryContext } from "../../contexts/HistoryContext";

export function DefaultCard({
  id,
  cardTitle,
  cardContent,
  removeCard,
  updateEditCard,
}: {
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

  const showDeleteCardModal = () => {
    setCardState("delete");
  };

  const closeDeleteCardModal = () => {
    setCardState("default");
  };

  const handleOnClickRemoveCard = () => {
    removeCard(id, cardTitle);
  };

  const editCard = () => {
    setNewCardTitle(cardTitle);
    setNewCardContent(cardContent);
    setCardState("edit");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      action: "카드변경",
    };

    setHistoryData((prevHistoryData) => [newHistory, ...prevHistoryData]);
    updateEditCard(newCardTitle, newCardContent, id);
    setCardState("default");
  };

  const isButtonDisabled =
    newCardTitle.trim() === "" || newCardContent.trim() === "";

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "268px",
        padding: "16px",
        gap: "16px",
        backgroundColor: colors.surfaceDefault,
        borderRadius: "8px",
        boxShadow: shadow.normal,
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
        {cardState === "edit" && (
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
                <input
                  css={{
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
                  }}
                  placeholder="제목을 입력해주세요"
                  type="text"
                  value={newCardTitle}
                  onChange={handleTitleChange}
                />
              </div>
              <div>
                <input
                  css={{
                    "width": "100%",
                    "border": "none",
                    "fontSize": "14px",
                    "fontWeight": 500,
                    "color": colors.textDefault,
                    "::placeholder": {
                      color: colors.textDefault,
                    },
                    ":focus": {
                      outline: 0,
                    },
                    "whiteSpace": "pre-wrap",
                  }}
                  placeholder="내용을 입력해주세요"
                  type="text"
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
      {cardState === "delete" && <Dim />}
      {cardState === "delete" && (
        <Alert
          type="removeCard"
          onClickLeftButton={closeDeleteCardModal}
          onClickRightButton={handleOnClickRemoveCard}
        />
      )}
    </div>
  );
}
