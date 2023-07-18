import { colors } from "../../constants/colors";
import { Txt } from "../Txt";

type Props = {
  showRemoveAllHistoryModal(): void;
};

export function HistoryLayerFooter({ showRemoveAllHistoryModal }: Props) {
  return (
    <div className="HistoryLayerFooter" css={historyFooterWrapper}>
      <div css={{ cursor: "pointer" }} onClick={showRemoveAllHistoryModal}>
        <Txt typography="displayBold14" color={colors.textDanger}>
          기록 전체 삭제
        </Txt>
      </div>
    </div>
  );
}

const historyFooterWrapper = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "330px",
  height: "48px",
  padding: "0 20px 0 0",
};
