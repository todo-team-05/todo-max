import { colors } from "../../constants/colors";
import { IconButton } from "../Button/IconButton";
import { Txt } from "../Txt";
import { getUserDevice } from "../../utils/getUserDevice";
import { shadow } from "../../constants/shadow";
import { useState } from "react";
import { Button } from "../Button/Button";

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newCardTitle, setNewCardTitle] = useState<string>(cardTitle);
  const [newCardContent, setNewCardContent] = useState<string>(cardContent);

  const handleRemoveCard = () => {
    removeCard(id, cardTitle);
  };

  const editCard = () => {
    setNewCardTitle(cardTitle);
    setNewCardContent(cardContent);
    setIsEditing(true);
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
    setIsEditing(false);
  };

  const saveEditCard = () => {
    updateEditCard(newCardTitle, newCardContent, id);
    setIsEditing(false);
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
        {!isEditing && (
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
        {isEditing && (
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
                width="132px"
                height="32px"
                color={`${colors.textDefault}`}
                backgroundColor={`${colors.surfaceAlt}`}
                onClick={cancelEditCard}
              />
              <Button
                text="저장"
                width="132px"
                height="32px"
                color={`${colors.textWhiteDefault}`}
                backgroundColor={`${colors.surfaceBrand}`}
                disabled={isButtonDisabled}
                onClick={saveEditCard}
              />
            </div>
          </div>
        )}
        {!isEditing && (
          <div>
            <IconButton
              type="close"
              width="24px"
              height="24px"
              color={colors.textWeak}
              onClick={handleRemoveCard}
            />
            <IconButton
              type="edit"
              width="24px"
              height="24px"
              color={colors.textWeak}
              onClick={editCard}
            />
          </div>
        )}
      </div>
    </div>
  );
}
