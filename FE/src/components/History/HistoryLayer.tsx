import { keyframes } from "@emotion/react";
import { colors } from "../../constants/colors";
import { CloseButton } from "../Button/CloseButton";
import { Txt } from "../Txt";
import { HistoryItem } from "./HistoryItem";
import { HistoryLayerFooter } from "./HistoryLayerFooter";
import { NoHistory } from "./NoHistory";

export type HistoryItemData = {
  title: string;
  from: string;
  to: string;
  at: string;
  action: string;
};

export function HistoryLayer({
  historyData,
  onClickCloseButton,
}: {
  historyData: any;
  onClickCloseButton: () => void;
}) {
  console.log(historyData);

  const hasHistory = historyData && historyData.length > 0;
  console.log(hasHistory);

  return (
    <div
      css={{
        animation: `${slideIn} 0.3s ease-out forwards`,
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",

        top: "64px",
        left: "50%",
        // transform: "translateX(298px)",
        width: "366px",
        minHeight: "121px",
        maxHeight: "680px",
        borderRadius: "16px",
        boxSizing: "border-box",
        padding: "8px",
        gap: "8px",
        backgroundColor: colors.surfaceDefault,
        boxShadow: "0px 16px 16px 0px #6E80913D, 0px 0px 4px 0px #6E809114",
        zIndex: 3,
      }}>
      <div
        className="HistoryLayerHeader"
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "350px",
          height: "48px",
          lineHeight: "19.09px",
          // padding: "0 8px",
          boxSizing: "border-box",
          padding: "8px 8px 8px 16px",
          gap: "4px",
        }}>
        <div
          css={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: "257px",
            height: "19px",
          }}>
          <Txt typography="displayBold16" color={`${colors.textStrong}`}>
            사용자 활동 기록
          </Txt>
        </div>
        <div
          onClick={onClickCloseButton}
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "65px",
            height: "32px",
            padding: "0 4px 0 4px",
            cursor: "pointer",
          }}>
          <CloseButton />
          <div css={{ width: "33px", height: "17px" }}>
            <Txt typography="displayBold14" color={`${colors.textDefault}`}>
              닫기
            </Txt>
          </div>
        </div>
      </div>
      <div
        className="historyItemWrapper"
        css={{
          "display": "flex",
          "flexDirection": "column",
          "& > :not(:last-child)": {
            borderBottom: `1px solid ${colors.borderDefault}`,
          },
          "boxSizing": "border-box",
          "maxHeight": "683px",
          "overflow": "auto",
          "overflowX": "hidden",
          "justifyContent": "center",

          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.borderDefault,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: colors.gray400,
          },
        }}>
        {hasHistory ? (
          historyData.map((history: HistoryItemData) => {
            console.log(history);
            return <HistoryItem history={history} />;
          })
        ) : (
          <NoHistory />
        )}
      </div>
      {hasHistory ? <HistoryLayerFooter /> : null}
    </div>
  );
}

const slideIn = keyframes`
  0% {
    transform: translateX(150%);
  }
  100% {
    transform: translateX(298px);
  }
`;
