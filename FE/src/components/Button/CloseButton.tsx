export function CloseButton() {
  return (
    <button
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "24px",
        height: "24px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}>
      <img src="/icons/close.svg" alt="닫기" />
    </button>
  );
}
