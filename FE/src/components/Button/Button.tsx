import { Txt } from "../Txt";

type Props = {
  text: string;
  color: string;
  backgroundColor: string;
};

export function Button({ text, color, backgroundColor }: Props) {
  return (
    <button
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "132px",
        height: "32px",
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
