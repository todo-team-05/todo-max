import { MainPageData } from "../../pages/MainPage";
import { ColumnWrapper } from "./ColumnWrapper";

export function ColumnList({
  data,
  removeColumn,
  refreshMainData,
}: {
  data: MainPageData | undefined;
  removeColumn(columnId: number): void;
  refreshMainData(): void;
}) {
  return (
    <div css={columnListWrapper}>
      {data?.map((column) => (
        <ColumnWrapper
          key={column.id}
          id={column.id}
          column={column}
          removeColumn={removeColumn}
          refreshMainData={refreshMainData}
        />
      ))}
    </div>
  );
}

const columnListWrapper = {
  display: "flex",
  width: "1280px",
  top: "32px",
  gap: "24px",
};
