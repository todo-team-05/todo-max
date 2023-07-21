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
  columnsRectsRef: React.MutableRefObject<Record<number, DOMRect>>;

  droppedCardRef: React.MutableRefObject<DropCard>;
  isDroppedRef: React.MutableRefObject<boolean>;
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
    absoluteX: 0,
    absoluteY: 0,
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
  const currentDraggedOverCardRef = useRef<CurrentDraggedOverCard>({
    cardId: 0,
    columnId: 0,
    position: "",
  });

  const [isOverHalf, setIsOverHalf] = useState<boolean>(false);
  const isCardDraggedOverRef = useRef<boolean>(false);
  const isColumnDraggedOverRef = useRef<boolean>(false);
  const columnsRectsRef = useRef<Record<number, DOMRect>>({});

  const isDroppedRef = useRef<boolean>(false);
  const droppedCardRef = useRef<DropCard>({
    cardId: 0,
    categoryId: 0,
    beforeCardId: 0,
    afterCardId: 0,
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
    columnsRectsRef,

    droppedCardRef,
    isDroppedRef,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

type CurrentDraggedOverCard = {
  cardId: number | null;
  columnId: number;
  position: string;
};

type DragCardDataRef = {
  startX: number;
  startY: number;
  cloneCardX: number;
  cloneCardY: number;
  absoluteX: number;
  absoluteY: number;
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

type DropCard = {
  cardId: number;
  categoryId: number;
  beforeCardId: number;
  afterCardId: number;
};
