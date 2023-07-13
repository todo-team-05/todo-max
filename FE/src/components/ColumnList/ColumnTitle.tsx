import { colors } from "../../constants/colors";
import { CloseButton } from "../Button/CloseButton";
import { PlusButton } from "../Button/PlusButton";
import { Txt } from "../Txt";
import { Badge } from "./Badge";

export function ColumnTitle({
  columnTitle,
  cardsCount,
}: {
  columnTitle: string;
  cardsCount: number;
}) {
  return (
    <div css={ColumnTitleContainer}>
      <div css={ColumnTitleTextArea}>
        <Txt typography="displayBold16" color={`${colors.textBold}`}>
          {columnTitle}
        </Txt>
        <Badge cardsCount={cardsCount} />
      </div>
      <PlusButton />
      <CloseButton />
    </div>
  );
}

const ColumnTitleContainer = {
  display: "flex",
  width: "100%",
  height: "24px",
  gap: "8px",
  alignContent: "center",
};

const ColumnTitleTextArea = {
  display: "flex",
  width: "204px",
  justifyContent: "start",
  alignContent: "center",
  gap: "8px",
};
