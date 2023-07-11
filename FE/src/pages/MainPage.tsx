import { colors } from "../constants/colors";

export function MainPage() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: colors.surfaceAlt,
      }}></div>
  );
}
