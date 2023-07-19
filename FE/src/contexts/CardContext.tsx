import { createContext, useState, ReactNode, useRef } from "react";

type CardContextType = {
  dragCardDataRef: React.MutableRefObject<DragCardDataRef>;
  dragPosition: DragPosition;
  setDragPosition: React.Dispatch<React.SetStateAction<DragPosition>>;
  isOverHalf: boolean;
  setIsOverHalf: React.Dispatch<React.SetStateAction<boolean>>;
  isCardDraggedOverRef: React.MutableRefObject<boolean>;
  isColumnDraggedOverRef: React.MutableRefObject<boolean>;
  currentDraggedOverCardRef: React.MutableRefObject<CurrentDraggedOverCard>;
};

type CardProviderProps = {
  children: ReactNode;
};

export const CardContext = createContext<CardContextType | undefined>(
  undefined
);

export function CardProvider({ children }: CardProviderProps) {
  const dragCardDataRef = useRef<DragCardDataRef>({
    startX: 0,
    startY: 0,
    cloneCardX: 0,
    cloneCardY: 0,
    cardId: 0,
    columnId: 0,
    cardTitle: "",
    cardContent: "",
    userAdvice: "",
  });
  const [dragPosition, setDragPosition] = useState<DragPosition>({
    x: 0,
    y: 0,
    cardMiddleX: 0,
    cardMiddleY: 0,
    cardTop: 0,
  });
  const [isOverHalf, setIsOverHalf] = useState<boolean>(false);
  const isCardDraggedOverRef = useRef<boolean>(false);
  const isColumnDraggedOverRef = useRef<boolean>(false);
  const currentDraggedOverCardRef = useRef<CurrentDraggedOverCard>({
    cardId: 0,
    columnId: 0,
    position: "",
  });
  const value: CardContextType = {
    dragCardDataRef,
    dragPosition,
    setDragPosition,
    isOverHalf,
    setIsOverHalf,
    isCardDraggedOverRef,
    isColumnDraggedOverRef,
    currentDraggedOverCardRef,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

type CurrentDraggedOverCard = {
  cardId: number;
  columnId: number;
  position: string;
};

type DragCardDataRef = {
  startX: number;
  startY: number;
  cloneCardX: number;
  cloneCardY: number;
  cardId: number;
  columnId: number;
  cardTitle: string;
  cardContent: string;
  userAdvice: string;
};

type DragPosition = {
  x: number;
  y: number;
  cardMiddleX: number;
  cardMiddleY: number;
  cardTop: number;
};
