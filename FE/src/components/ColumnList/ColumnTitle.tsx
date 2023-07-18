import { useContext, useEffect, useRef, useState } from "react";
import { colors } from "../../constants/colors";
import { IconButton } from "../Button/IconButton";
import { Txt } from "../Txt";
import { Badge } from "./Badge";
import { Dim } from "../Dim/Dim";
import { Alert } from "../Alert/Alert";
import { HistoryContext } from "../../contexts/HistoryContext";

type Props = {
  columnTitle: string;
  cardsCount: number;
  showAddCard(): void;
  handleRemoveColumn(): void;
};

export function ColumnTitle({
  columnTitle,
  cardsCount,
  showAddCard,
  handleRemoveColumn,
}: Props) {
  const { setHistoryData } = useContext(HistoryContext)!;
  const [titleState, setTitleState] = useState<"default" | "edit" | "delete">(
    "default"
  );
  const [newTitle, setNewTitle] = useState<string>(columnTitle);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const confirmRemoveColumn = () => {
    const newHistory = {
      title: columnTitle,
      action: "칼럼삭제",
    };
    handleRemoveColumn();
    setHistoryData((prevHistoryData) => [newHistory, ...prevHistoryData]);
  };

  const showDeleteColumnModal = () => {
    setTitleState("delete");
  };

  const closeDeleteColumnModal = () => {
    setTitleState("default");
  };

  function editColumnTitle(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (event.detail === 2) {
      setTitleState("edit");
    }
  }

  const handleFocusOut = () => {
    setTitleState("default");
    const newColumnTitle = inputRef.current?.value;
    const newHistory = {
      title: columnTitle,
      to: newColumnTitle,
      action: "칼럼변경",
    };
    setHistoryData((prevHistoryData) => [newHistory, ...prevHistoryData]);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  useEffect(() => {
    if (titleState === "edit") {
      inputRef.current?.addEventListener("focusout", handleFocusOut);
    }

    return () => {
      inputRef.current?.removeEventListener("focusout", handleFocusOut);
    };
  }, [titleState === "edit"]);

  return (
    <div css={ColumnTitleContainer}>
      {titleState !== "edit" && (
        <div css={ColumnTitleTextArea} onClick={editColumnTitle}>
          <Txt typography="displayBold16" color={colors.textBold}>
            {newTitle}
          </Txt>
          <Badge cardsCount={cardsCount} />
        </div>
      )}
      {titleState === "edit" && (
        <div css={ColumnTitleTextArea}>
          <input
            ref={inputRef}
            css={inputColumnTitle}
            placeholder="제목을 입력해주세요"
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            required
          />
        </div>
      )}
      <IconButton type="plus" color={colors.textWeak} onClick={showAddCard} />
      <IconButton
        type="close"
        color={colors.textWeak}
        onClick={showDeleteColumnModal}
      />
      {titleState === "delete" && <Dim />}
      {titleState === "delete" && (
        <Alert
          type="removeColumn"
          onClickLeftButton={closeDeleteColumnModal}
          onClickRightButton={confirmRemoveColumn}
        />
      )}
    </div>
  );
}

const ColumnTitleContainer = {
  padding: "0px 16px",
  display: "flex",
  width: "100%",
  height: "24px",
  gap: "8px",
  alignContent: "center",
  boxSizing: "border-box" as const,
};

const ColumnTitleTextArea = {
  display: "flex",
  width: "204px",
  justifyContent: "start",
  alignContent: "center",
  gap: "8px",
};

const inputColumnTitle = {
  "padding": "0px 8px",
  "width": "188px",
  "border": `1px solid ${colors.borderDefault}`,
  "borderRadius": "6px",
  "fontSize": "14px",
  "fontWeight": 500,
  "backgroundColor": colors.surfaceDefault,
  "color": colors.textStrong,
  "caretColor": colors.textBrand,
  "::placeholder": {
    color: colors.textStrong,
  },
  ":focus": {
    outline: 0,
  },
};
