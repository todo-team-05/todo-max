import { useState } from "react";
import { colors } from "../../constants/colors";
import { HistoryIcon } from "../History/HistoryIcon";
import { HistoryLayer } from "../History/HistoryLayer";
import { Txt } from "../Txt";

export function Header() {
  const [isHistoryLayerOpen, setIsHistoryLayerOpen] = useState(false);
  const [historyData, setHistoryData] = useState();

  const handleClickHistoryIcon = () => {
    setIsHistoryLayerOpen(true);
    fetchHistoryData();
  };

  const handleClickCloseButton = () => {
    setIsHistoryLayerOpen(false);
  };

  const fetchHistoryData = async () => {
    try {
      const response = await fetch("http://localhost:8080/history");
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "1280px",
        height: "28px",
        padding: "0 80px",
        margin: "18px 0",
        overflow: "hidden",
      }}>
      <Txt typography="displayBold24" color={`${colors.textStrong}`}>
        TODO LIST
      </Txt>
      <HistoryIcon onClick={handleClickHistoryIcon} />
      {isHistoryLayerOpen ? (
        <HistoryLayer
          onClickCloseButton={handleClickCloseButton}
          historyData={historyData}
        />
      ) : null}
    </div>
  );
}
