import { useContext } from "react";
import { colors } from "../../constants/colors";
import { ModalContext } from "../../contexts/ModalContext";
import { Button } from "../Button/Button";
import { Txt } from "../Txt";

type Props = {
  onClickLeftButton: () => void;
  text: string;
  leftButtonLabel: string;
  rightButtonLabel: string;
};

export function Alert({
  onClickLeftButton,
  text,
  leftButtonLabel = "취소",
  rightButtonLabel = "삭제",
}: Props) {
  const { setIsAlertOpen, setHistoryData } = useContext(ModalContext)!;

  const handleClickRightButton = () => {
    setHistoryData([]);
    setIsAlertOpen(false);
  };

  return (
    <div
      css={{
        zIndex: 100,
        position: "absolute",
        top: "50%",
        left: "50%",
        // top: "449px",
        // left: "720px",
        transform: "translate(-50%, -50%)",
        borderRadius: "8px",
        backgroundColor: `${colors.surfaceDefault}`,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "272px",
        height: "78px",
        boxShadow: "0px 2px 8px 0px #6E809129, 0px 2px 8px 0px #6E809129",
      }}>
      <div
        css={{
          width: "272px",
        }}>
        <Txt typography="displayMedium16" color={`${colors.textDefault}`}>
          {text}
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
          width="132px"
          height="32px"
          color={`${colors.textDefault}`}
          backgroundColor={`${colors.surfaceAlt}`}
        />
        <Button
          onClick={handleClickRightButton}
          text={rightButtonLabel}
          width="132px"
          height="32px"
          color={`${colors.textWhiteWeak}`}
          backgroundColor={`${colors.textDanger}`}
        />
      </div>
    </div>
  );
}
