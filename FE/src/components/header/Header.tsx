import { colors } from "../../constants/colors";
import { Txt } from "../Txt";

export function Header() {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "1280px",
        height: "28px",
        padding: "0 80px",
        margin: "18px 0",
      }}>
      <Txt typography="displayBold24" color={`${colors.textStrong}`}>
        TODO LIST
      </Txt>
      <button css={{ border: "none", backgroundColor: "transparent" }}>
        <img src="/icons/history.svg" alt="history" />
      </button>
    </div>
  );
}
