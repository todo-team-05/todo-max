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
    handleDeleteAllHistory();
  };

  const handleDeleteAllHistory = () => {
    const url =
      "http://dev-todo-max-team5-be.ap-northeast-2.elasticbeanstalk.com/history"; // 카드를 삭제할 엔드포인트

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("히스토리가 성공적으로 삭제되었습니다.");
        } else if (response.status === 400) {
          console.log("히스토리를 찾을 수 없습니다.");
        } else {
          console.log("히스토리 삭제에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("DELETE 요청 중 에러가 발생했습니다:", error);
      });
  };

  useEffect(() => {
    fetchHistoryData;
  }, [historyData]);

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
      const response = await fetch(
        "http://dev-todo-max-team5-be.ap-northeast-2.elasticbeanstalk.com/history"
      );
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
  createdAt?: string;
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
