import { colors } from "../../constants/colors";
import { Button } from "../Button/Button";
import { Txt } from "../Txt";
import { shadow } from "../../constants/shadow";

type Props = {
  type: "removeCard" | "removeColumn" | "removeHistory";
  onClickLeftButton: () => void;
  onClickRightButton?: () => void;
  leftButtonLabel?: string;
  rightButtonLabel?: string;
};

export function Alert({
  type,
  onClickLeftButton,
  onClickRightButton,
  leftButtonLabel = "취소",
  rightButtonLabel = "삭제",
}: Props) {
  return (
    <div css={alertWrapper}>
      <div css={alertTitle}>
        <Txt typography="displayMedium16" color={colors.textDefault}>
          {(() => {
            switch (type) {
              case "removeCard":
                return "선택한 카드를 삭제할까요?";
              case "removeHistory":
                return "모든 사용자 활동 기록을 삭제할까요?";
              case "removeColumn":
                return "선택한 칼럼을 삭제할까요?";
              default:
                return "";
            }
          })()}
        </Txt>
      </div>
      <div
        css={{
          display: "flex",
          gap: "8px",
        }}>
        <Button
          onClick={onClickLeftButton}
          text={leftButtonLabel}
          color={`${colors.textDefault}`}
          backgroundColor={`${colors.surfaceAlt}`}
        />
        <Button
          onClick={onClickRightButton}
          text={rightButtonLabel}
          color={`${colors.textWhiteWeak}`}
          backgroundColor={`${colors.textDanger}`}
        />
      </div>
    </div>
  );
}

const alertWrapper = {
  zIndex: 100,
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "8px",
  backgroundColor: colors.surfaceDefault,
  padding: "24px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "24px",
  width: "272px",
  height: "78px",
  boxShadow: shadow.up,
};

const alertTitle = {
  width: "272px",
};
