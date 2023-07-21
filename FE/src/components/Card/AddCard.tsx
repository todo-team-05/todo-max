import { useState } from "react";
import { colors } from "../../constants/colors";
import { Button } from "../Button/Button";
import { shadow } from "../../constants/shadow";

export function AddCard({
  id,
  columnId,
  closeAddCard,
  addNewCard,
  refreshMainData,
}: {
  id: number;
  columnId: number;
  closeAddCard(): void;
  addNewCard(inputTitle: string, inputContent: string): void;
  refreshMainData(): void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const clickButton = () => {
    addNewCard(title, content);
    closeAddCard();
    postNewCard();
  };

  const postNewCard = () => {
    const url =
      "http://dev-todo-max-team5-be.ap-northeast-2.elasticbeanstalk.com/card";

    const data = {
      categoryId: columnId,
      title: title,
      contents: content,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          refreshMainData();
          console.log("POST 요청이 성공했습니다.");
        } else {
          console.log("POST 요청이 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("POST 요청 중 에러가 발생했습니다:", error);
      });
  };

  const isButtonDisabled = title.trim() === "" || content.trim() === "";

  return (
    <form
      css={{
        backgroundColor: colors.surfaceDefault,
        boxShadow: shadow.normal,
        ...addCardWrapper,
      }}>
      <div css={addCardContents}>
        <div css={addCardInputs}>
          <div>
            <input
              css={addCardInputTitle}
              placeholder="제목을 입력해주세요"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <input
              css={addCardInputContent}
              placeholder="내용을 입력해주세요"
              type="text"
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </div>
      <div css={addCardButtons}>
        <Button
          text="취소"
          color={colors.textDefault}
          backgroundColor={colors.surfaceAlt}
          onClick={closeAddCard}
        />
        <Button
          text="등록"
          color={colors.textWhiteDefault}
          backgroundColor={colors.surfaceBrand}
          onClick={clickButton}
          disabled={isButtonDisabled}
        />
      </div>
    </form>
  );
}

const addCardWrapper = {
  display: "flex",
  flexDirection: "column" as const,
  width: "268px",
  padding: "16px",
  gap: "16px",
  borderRadius: "8px",
};

const addCardContents = {
  display: "flex",
  gap: "4px",
};

const addCardInputs = {
  display: "flex",
  flexDirection: "column" as const,
  width: "240px",
  gap: "8px",
};

const addCardInputTitle = {
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
};

const addCardInputContent = {
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
  "whiteSpace": "pre-wrap" as const,
};

const addCardButtons = {
  display: "flex",
  gap: "8px",
};
