import { colors } from "../../constants/colors";
import { Txt } from "../Txt";
import { HistoryItemData } from "../Header/Header";

export function HistoryItem({ history }: { history: HistoryItemData }) {
  return (
    <div css={historyItemWrapper}>
      <div className="profileImg" css={profileImgWrapper}>
        <img src="/icons/profileImg.png" alt="profileImg" css={profileImg} />
      </div>
      <div className="historyBody" css={historyContentWrapper}>
        <div className="historyBodyUserName" css={historyUserName}>
          <Txt typography="displayMedium14" color={colors.textDefault}>
            @멋진박하
          </Txt>
        </div>
        <div className="historyBodyText" css={historyContent}>
          {generateHistoryText(history)}
        </div>
        <div className="historyBodyTime" css={historyTime}>
          <Txt typography="displayMedium12" color={colors.textWeak}>
            3분전
          </Txt>
        </div>
      </div>
    </div>
  );
}

const generateHistoryText = (history: HistoryItemData) => {
  const boldStyle = {
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "0em",
    color: "#4E4B66",
  };
  switch (history.action) {
    case "카드등록":
      return (
        <>
          <span style={boldStyle}>{history.title}</span>을(를){" "}
          <span style={boldStyle}>{history.at}</span>에{" "}
          <span style={boldStyle}>등록</span>하였습니다.
        </>
      );
    case "카드삭제":
      return (
        <>
          <span style={boldStyle}>{history.title}</span>을(를){" "}
          <span style={boldStyle}>{history.at}</span>에서{" "}
          <span style={boldStyle}>삭제</span>하였습니다.
        </>
      );
    case "카드변경":
      return (
        <>
          <span style={boldStyle}>{history.title}</span>을(를){" "}
          <span style={boldStyle}>변경</span>하였습니다.
        </>
      );
    case "카드이동":
      return (
        <>
          <span style={boldStyle}>{history.title}</span>을(를){" "}
          <span style={boldStyle}>{history.from}</span>
          에서 <span style={boldStyle}>{history.to}</span>로{" "}
          <span style={boldStyle}>이동</span>하였습니다.
        </>
      );
    case "칼럼등록":
      return (
        <>
          <span style={boldStyle}>새 칼럼</span>을{" "}
          <span style={boldStyle}>등록</span>하였습니다.
        </>
      );
    case "칼럼변경":
      return (
        <>
          <span style={boldStyle}>{history.title}</span> 칼럼을{" "}
          <span style={boldStyle}>{history.to}</span>로{" "}
          <span style={boldStyle}>변경</span>하였습니다.
        </>
      );
    case "칼럼삭제":
      return (
        <>
          <span style={boldStyle}>{history.title}</span> 칼럼을{" "}
          <span style={boldStyle}>삭제</span>하였습니다.
        </>
      );
    case "칼럼이동":
      return (
        <>
          <span style={boldStyle}>{history.title}</span> 칼럼을{" "}
          <span style={boldStyle}>이동</span>하였습니다.
        </>
      );
    default:
      return null;
  }
};

const historyItemWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "348px",
  height: "113px",
  padding: "16px",
  boxSizing: "border-box" as const,
  gap: "16px",
  backgroundColor: colors.surfaceDefault,
};

const profileImgWrapper = {
  width: "40px",
  height: "100%",
};

const profileImg = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover" as const,
};

const historyContentWrapper = {
  display: "flex",
  flexDirection: "column" as const,
  width: "260px",
  height: "100%",
  gap: "8px",
};

const historyUserName = {
  display: "flex",
  justifyContent: "start",
  width: "100%",
};

const historyContent = {
  color: colors.textDefault,
  fontSize: "14px",
};

const historyTime = {
  display: "flex",
  justifyContent: "start",
  width: "100%",
};
