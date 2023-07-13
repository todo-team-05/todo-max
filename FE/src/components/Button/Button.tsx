import { Txt } from "../Txt";

type Props = {
  onClick?: () => void;
  text: string;
  width: string;
  height: string;
  color: string;
  backgroundColor: string;
};

export function Button({
  onClick,
  text,
  width,
  height,
  color,
  backgroundColor,
}: Props) {
  return (
    <button
      onClick={onClick}
      css={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height,
        backgroundColor: `${backgroundColor}`,
        border: "none",
        borderRadius: "8px",
      }}>
      <Txt typography="displayBold14" color={color}>
        {text}
      </Txt>
    </button>
  );
}
