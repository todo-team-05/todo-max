import { colors } from "../../constants/colors";
import { Txt } from "../Txt";

export function HistoryItem() {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "348px",
        height: "113px",
        padding: "16px",
        boxSizing: "border-box",
        gap: "16px",
        backgroundColor: colors.surfaceDefault,
      }}>
      <div
        className="profileImg"
        css={{
          width: "40px",
          height: "100%",
        }}>
        <img
          src="/icons/profileImg.png"
          alt="profileImg"
          css={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        className="historyBody"
        css={{
          display: "flex",
          flexDirection: "column",
          width: "260px",
          height: "100%",
          gap: "8px",
        }}>
        <div
          className="historyBodyUserName"
          css={{
            display: "flex",
            justifyContent: "start",
            width: "100%",
          }}>
          <Txt typography="displayMedium14" color={`${colors.textDefault}`}>
            @멋진박하
          </Txt>
        </div>
        <div
          className="historyBodyText"
          css={{
            display: "flex",
            flexWrap: "wrap",
            color: colors.textDefault,
            fontSize: "14px",
            // width: "260px",
            // height: "34px",
          }}>
          끝내주게 숨쉬기/을(를) /하고있는 일/에서 /해야할 일/으로
          /이동/하였습니다.
        </div>
        <div
          className="historyBodyTime"
          css={{
            display: "flex",
            justifyContent: "start",
            width: "100%",
          }}>
          <Txt typography="displayMedium12" color={`${colors.textWeak}`}>
            3분전
          </Txt>
        </div>
      </div>
    </div>
  );
}
