export function Dim() {
  return <div css={dimWrapper} />;
}

const dimWrapper = {
  position: "fixed" as const,
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: "#14212B4D",
  zIndex: 4,
};
