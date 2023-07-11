import { ColumnList } from "../components/ColumnList/ColumnList";
import { Header } from "../components/Header/Header";
import { colors } from "../constants/colors";

export function MainPage() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "center",
        // width: "100vw",
        width: "1440px",
        height: "100vh",
        backgroundColor: colors.surfaceAlt,
      }}>
      <Header />
      <ColumnList />
    </div>
  );
}
