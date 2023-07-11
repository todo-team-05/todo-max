import { colors } from "../../constants/colors";
import { Button } from "../Button/Button";
import { Txt } from "../Txt";

export function Alert() {
  return (
    <div
      css={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "272px",
        height: "78px",
        boxShadow: "0px 2px 8px 0px rgba(110, 128, 145, 0.16)",
      }}>
      <div
        css={{
          width: "272px",
        }}>
        <Txt typography="displayMedium16" color={`${colors.textDefault}`}>
          안내 문구를 이렇게 표기합니다
        </Txt>
      </div>
      <div
        css={{
          display: "flex",
          gap: "8px",
        }}>
        <Button
          text="Button"
          color={`${colors.textDefault}`}
          backgroundColor={`${colors.surfaceAlt}`}
        />
        <Button
          text="Button"
          color={`${colors.textWhiteWeak}`}
          backgroundColor={`${colors.textDanger}`}
        />
      </div>
    </div>
  );
}
