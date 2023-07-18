import { colors } from "../../constants/colors";
import { buttonOpacity } from "../../constants/opacity";
import { Txt } from "../Txt";
import { PlusIcon } from "./PlusIcon";

type Props = {
  icon?: "close" | "edit" | "histroy" | "plus";
  text?: string;
  width?: string;
  height?: string;
  color: string;
  backgroundColor: string;
  onClick?(): void;
  disabled?: boolean;
  radius?: string;
  boxShadow?: string;
  hover?: string;
};

export function Button({
  icon,
  text,
  width = "132px",
  height = "32px",
  color,
  backgroundColor,
  onClick,
  disabled,
  radius = "8px",
  boxShadow,
  hover,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      css={{
        width,
        height,
        backgroundColor,
        "borderRadius": radius,
        boxShadow,
        ":disabled": {
          opacity: buttonOpacity.disable,
        },
        ":hover": {
          width: hover,
          height: hover,
        },
        ...buttonWrapper,
      }}>
      {icon === "plus" && (
        <PlusIcon width="80%" height="80%" color={colors.surfaceDefault} />
      )}
      <Txt typography="displayBold14" color={color}>
        {text}
      </Txt>
    </button>
  );
}

const buttonWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
};
