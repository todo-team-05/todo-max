import { ColumnTitle } from "./ColumnTitle";

export function ColumnWrapper() {
  return (
    <div
      css={{
        display: "flex",
        width: "300px",
        gap: "8px",
        padding: "0 16px",
      }}>
      <ColumnTitle />
    </div>
  );
}
