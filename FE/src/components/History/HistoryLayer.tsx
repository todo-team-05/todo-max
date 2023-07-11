import { colors } from "../../constants/colors";
import { CloseButton } from "../Button/CloseButton";
import { Txt } from "../Txt";
import { HistoryItem } from "./HistoryItem";

export function HistoryLayer() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-evenly",
        alignItems: "center",
        position: "absolute",
        top: "64px",
        left: "50%",
        transform: "translateX(298px)",
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
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "65px",
            height: "32px",
            padding: "0 4px 0 4px",
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
            borderBottom: `1px solid ${colors.borderDefault}`, // or use your preferred color
          },
          "boxSizing": "border-box",
          "maxHeight": "683px",
          "overflow": "auto",
          "overflowX": "hidden",

          "&::-webkit-scrollbar": {
            width: "6px", // 스크롤바 너비를 조절하는 부분입니다. 원하는 크기로 변경하세요.
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.borderDefault, // 스크롤바의 색상을 변경하는 부분입니다. 원하는 색상으로 변경하세요.
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: colors.gray400, // 스크롤바를 hover 했을 때의 색상입니다. 원하는 색상으로 변경하세요.
          },
        }}>
        {/* <div
          className="noHistory"
          css={{
            width: "350px",
            height: "49px",
            padding: "16px",
            gap: "4px",
          }}>
          <div
            css={{
              width: "318px",
              height: "17px",
            }}>
            <Txt typography="displayMedium14" color={`${colors.textWeak}`}>
              사용자 활동 기록이 없습니다.
            </Txt>
          </div>
        </div> */}
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        {/* <HistoryItem /> */}
      </div>
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
    </div>
  );
}
