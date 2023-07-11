import { colors } from "../../constants/colors";
import { CloseButton } from "../Button/CloseButton";
import { PlusButton } from "../Button/PlusButton";
import { Txt } from "../Txt";
import { Badge } from "./Badge";

export function ColumnTitle() {
  return (
    <div
      css={{
        display: "flex",
        width: "100%",
        height: "24px",
        gap: "8px",
        alignContent: "center",
      }}>
      <div
        className="leftColumnTitle"
        css={{
          display: "flex",

          width: "204px",
          justifyContent: "start",
          alignContent: "center",
          gap: "8px",
        }}>
        <Txt typography="displayBold16" color={`${colors.textBold}`}>
          해야할 일
        </Txt>
        <Badge />
      </div>
      <PlusButton />
      <CloseButton />
    </div>
  );
}
