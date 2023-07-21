type Props = {
  width: string;
  height: string;
  color: string;
};

export function HistoryIcon({ width, height, color }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
        fill={color}
      />
      <path d="M12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill={color} />
    </svg>
  );
}
