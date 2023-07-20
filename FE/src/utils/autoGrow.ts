export const autoGrow = (
  type: "card" | "column",
  element: HTMLTextAreaElement
) => {
  element.style.height = type === "card" ? "17px" : "24px";
  element.style.height = element.scrollHeight + "px";
};
