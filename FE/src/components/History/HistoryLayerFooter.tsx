import { colors } from "../../constants/colors";
import { Txt } from "../Txt";

export function HistoryLayerFooter() {
  return (
    <div
      className="HistoryLayerFooter"
      css={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "330px",
        height: "48px",
        padding: "0 20px 0 0",
      }}>
      <Txt typography="displayBold14" color={`${colors.textDanger}`}>
        기록 전체 삭제
      </Txt>
    </div>
  );
}
