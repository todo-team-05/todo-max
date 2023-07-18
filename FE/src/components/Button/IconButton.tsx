import { useState } from "react";
import { CloseIcon } from "./CloseIcon";
import { EditIcon } from "./EditIcon";
import { HistoryIcon } from "./HistoryIcon";
import { PlusIcon } from "./PlusIcon";
import { colors } from "../../constants/colors";

type Props = {
  type: "close" | "edit" | "plus" | "history";
  width?: string;
  height?: string;
  color: string;
  onClick?(): void;
};

export function IconButton({
  type,
  width = "24px",
  height = "24px",
  color,
  onClick,
}: Props) {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      css={{
        width: width,
        height: height,
        ...buttonWrapper,
      }}>
      {type === "close" && (
        <CloseIcon
          width={width}
          height={height}
          color={isHover ? colors.surfaceDanger : color}
        />
      )}
      {type === "edit" && (
        <EditIcon
          width={width}
          height={height}
          color={isHover ? colors.surfaceBrand : color}
        />
      )}
      {type === "history" && (
        <HistoryIcon width={width} height={height} color={color} />
      )}
      {type === "plus" && (
        <PlusIcon
          width={width}
          height={height}
          color={isHover ? colors.surfaceBrand : color}
        />
      )}
    </button>
  );
}

const buttonWrapper = {
  padding: "0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
};
