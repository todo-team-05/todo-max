import { colors } from "../../constants/colors";
import { Txt } from "../Txt";
import { HistoryItem } from "./HistoryItem";
import { HistoryLayerFooter } from "./HistoryLayerFooter";
import { NoHistory } from "./NoHistory";
import { IconButton } from "../Button/IconButton";
import { HistoryItemData } from "../Header/Header";
import { shadow } from "../../constants/shadow";

export function HistoryLayer({
  onAnimationEnd,
  animation,
  historyData,
  onClickCloseButton,
  showRemoveAllHistoryModal,
}: {
  onAnimationEnd: () => void;
  animation: { animation: string };
  historyData: HistoryItemData[];
  onClickCloseButton: () => void;
  showRemoveAllHistoryModal(): void;
}) {
  const hasHistory = historyData && historyData.length > 0;
  console.log(historyData);
  return (
    <div
      onAnimationEnd={onAnimationEnd}
      css={{
        ...animation,
        ...historyLayerWrapper,
      }}>
      <div className="HistoryLayerHeader" css={historyHeader}>
        <div css={historyHeaderTitle}>
          <Txt typography="displayBold16" color={colors.textStrong}>
            사용자 활동 기록
          </Txt>
        </div>
        <div onClick={onClickCloseButton} css={historyHeaderCloseButton}>
          <IconButton type="close" color={colors.textWeak} />
          <div css={historyHeaderClose}>
            <Txt typography="displayBold14" color={colors.textDefault}>
              닫기
            </Txt>
          </div>
        </div>
      </div>
      <div className="historyItemWrapper" css={historyItemWrapper}>
        {historyData.length !== 0 ? (
          historyData.map((history: HistoryItemData, index: number) => {
            return <HistoryItem key={`history-${index}`} history={history} />;
          })
        ) : (
          <NoHistory />
        )}
      </div>
      {hasHistory ? (
        <HistoryLayerFooter
          showRemoveAllHistoryModal={showRemoveAllHistoryModal}
        />
      ) : null}
    </div>
  );
}

const historyLayerWrapper = {
  display: "flex",
  position: "absolute" as const,
  flexDirection: "column" as const,
  justifyContent: "space-evenly",
  alignItems: "center",
  top: "64px",
  left: "50%",
  width: "366px",
  minHeight: "121px",
  maxHeight: "680px",
  borderRadius: "16px",
  boxSizing: "border-box" as const,
  padding: "8px",
  gap: "8px",
  backgroundColor: colors.surfaceDefault,
  boxShadow: shadow.floating,
  zIndex: 3,
};

const historyHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "350px",
  height: "48px",
  lineHeight: "19.09px",
  boxSizing: "border-box" as const,
  padding: "8px 8px 8px 16px",
  gap: "4px",
};

const historyHeaderTitle = {
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  width: "257px",
  height: "19px",
};

const historyHeaderCloseButton = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "65px",
  height: "32px",
  padding: "0 4px 0 4px",
  cursor: "pointer",
};

const historyHeaderClose = {
  width: "33px",
  height: "17px",
};

const historyItemWrapper = {
  "display": "flex",
  "flexDirection": "column" as const,
  "& > :not(:last-child)": {
    borderBottom: `1px solid ${colors.borderDefault}`,
  },
  "boxSizing": "border-box" as const,
  "maxHeight": "683px",
  "overflow": "auto",
  "overflowX": "hidden" as const,
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
