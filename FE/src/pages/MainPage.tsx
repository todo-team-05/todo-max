import { useContext, useEffect, useState } from "react";
import { ColumnList } from "../components/ColumnList/ColumnList";
import { Header } from "../components/Header/Header";
import { colors } from "../constants/colors";
import { Button } from "../components/Button/Button";
import { shadow } from "../constants/shadow";
import { HistoryContext } from "../contexts/HistoryContext";

export function MainPage() {
  const [mainPageData, setMainPageData] = useState<MainPageData>();
  const HistoryContextValue = useContext(HistoryContext);
  const { setHistoryData } = HistoryContextValue!;

  const removeColumn = (columnId: number) => {
    if (mainPageData) {
      const filter = mainPageData.filter((list) => list.id !== columnId);
      setMainPageData(filter);
    }
  };

  const addNewColumn = () => {
    if (mainPageData) {
      const newColumn: Column = {
        id: Date.now(),
        name: "새 칼럼",
        cards: [],
      };

      const newData = [newColumn, ...mainPageData];
      setMainPageData(newData);
    }

    const newHistory = {
      title: "",
      action: "칼럼등록",
    };
    setHistoryData((prevHistoryData) => [newHistory, ...prevHistoryData]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("/index");
        const response = await fetch(
          "http://todo-max-team5-be.ap-northeast-2.elasticbeanstalk.com/index"
        );
        const data = await response.json();
        const processedData = data === null ? [] : data;
        processedData.forEach((column: Column) => {
          if (column.cards === null) column.cards = [];
        });
        setMainPageData(processedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div css={mainPageWrapper}>
      <Header />
      <ColumnList data={mainPageData} removeColumn={removeColumn} />
      <div css={addColumnButton}>
        <Button
          icon="plus"
          width="56px"
          height="56px"
          color={colors.textWhiteDefault}
          backgroundColor={colors.surfaceBrand}
          radius="50%"
          boxShadow={shadow.up}
          onClick={addNewColumn}
          hover="65px"
        />
      </div>
    </div>
  );
}

const mainPageWrapper = {
  position: "relative" as const,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  // width: "100vw",
  width: "1440px",
  // height: "100vh",
  height: "100vh",
  backgroundColor: colors.surfaceAlt,
  overflow: "hidden",
};

const addColumnButton = {
  position: "absolute" as const,
  right: "50px",
  bottom: "50px",
};

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
