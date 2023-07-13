import { useEffect, useState } from "react";
import { ColumnList } from "../components/ColumnList/ColumnList";
import { Header } from "../components/Header/Header";
import { colors } from "../constants/colors";

export function MainPage() {
  const [mainPageData, setMainPageData] = useState<MainPageData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/index");
        const data = await response.json();
        setMainPageData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
        overflow: "hidden",
      }}>
      <Header />
      <ColumnList data={mainPageData} />
    </div>
  );
}

export type Card = {
  id: number;
  title: string;
  contents: string;
};

export type Column = {
  id: number;
  name: string;
  cards: Card[];
};

export type MainPageData = Column[];
