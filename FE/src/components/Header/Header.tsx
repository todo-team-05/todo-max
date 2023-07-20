import { useContext, useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { HistoryLayer } from "../History/HistoryLayer";
import { Txt } from "../Txt";
import { keyframes } from "@emotion/react";
import { IconButton } from "../Button/IconButton";
import { HistoryContext } from "../../contexts/HistoryContext";
import { Alert } from "../Alert/Alert";
import { Dim } from "../Dim/Dim";

export function Header() {
  const [isHistoryLayerOpen, setIsHistoryLayerOpen] = useState(false);
  const [historyAnimation, setHistoryAnimation] = useState(slideInAnimation);
  const [isHistoryAnimationEnd, setIsHistoryAnimationEnd] = useState(false);
  const [isRemoveAll, setIsRemoveAll] = useState<boolean>(false);
  const HistoryContextValue = useContext(HistoryContext);
  const { historyData, setHistoryData } = HistoryContextValue!;

  const showRemoveAllHistoryModal = () => {
    setIsRemoveAll(true);
  };

  const closeRemoveAllHistoryModal = () => {
    setIsRemoveAll(false);
  };

  const removeAllHistory = () => {
    setHistoryData([]);
    setIsRemoveAll(false);
  };

  const handleClickHistoryIcon = () => {
    setIsHistoryLayerOpen(true);
    fetchHistoryData();
  };

  const handleClickCloseButton = () => {
    setHistoryAnimation(slideOutAnimation);
  };

  const handleAnimationEnd = () => {
    if (historyAnimation === slideOutAnimation) {
      setIsHistoryAnimationEnd(true);
    }
  };

  const fetchHistoryData = async () => {
    try {
      const response = await fetch("/history");
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isHistoryAnimationEnd) {
      setIsHistoryLayerOpen(false);
      setIsHistoryAnimationEnd(false);
      setHistoryAnimation(slideInAnimation);
    }
  }, [isHistoryAnimationEnd]);

  return (
    <div css={headerWrapper}>
      <Txt typography="displayBold24" color={`${colors.textStrong}`}>
        TODO LIST
      </Txt>
      <IconButton
        type="history"
        color={colors.textDefault}
        onClick={handleClickHistoryIcon}
      />
      {isHistoryLayerOpen ? (
        <HistoryLayer
          onAnimationEnd={handleAnimationEnd}
          animation={historyAnimation}
          onClickCloseButton={handleClickCloseButton}
          historyData={historyData}
          showRemoveAllHistoryModal={showRemoveAllHistoryModal}
        />
      ) : null}
      {isRemoveAll && <Dim />}
      {isRemoveAll && (
        <Alert
          type="removeHistory"
          onClickLeftButton={closeRemoveAllHistoryModal}
          onClickRightButton={removeAllHistory}
        />
      )}
    </div>
  );
}

export type HistoryItemData = {
  title: string;
  from?: string;
  to?: string;
  at?: string;
  action: string;
};

const slideIn = keyframes`
  0% {
    transform: translateX(200%);
  }
  100% {
    transform: translateX(298px);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(298px);
  }
  100% {
    transform: translateX(200%);
  }
`;

const slideInAnimation = {
  animation: `${slideIn} 0.5s ease-out forwards`,
};

const slideOutAnimation = {
  animation: `${slideOut} 0.5s ease-out forwards`,
};

const headerWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "1280px",
  height: "28px",
  padding: "0 80px",
  margin: "18px 0",
  overflow: "hidden",
};
