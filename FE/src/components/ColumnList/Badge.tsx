import { colors } from "../../constants/colors";
import { Txt } from "../Txt";

export function Badge() {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "24px",
        height: "24px",
        borderRadius: "8px",
        border: `1px solid ${colors.borderDefault}`,
      }}>
      <Txt typography="displayMedium12" color={`${colors.textWeak}`}>
        0
      </Txt>
    </div>
  );
}
