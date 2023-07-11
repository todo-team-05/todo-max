import { ColumnWrapper } from "./ColumnWrapper";

export function ColumnList() {
  return (
    <div
      css={{
        display: "flex",
        width: "1280px",
        position: "relative",
        gap: "24px",
      }}>
      <ColumnWrapper />
      <ColumnWrapper />
      <ColumnWrapper />
    </div>
  );
}
