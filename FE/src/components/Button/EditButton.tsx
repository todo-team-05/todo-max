export function EditButton() {
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
      }}>
      <img src="/icons/edit.svg" alt="수정" />
    </button>
  );
}
