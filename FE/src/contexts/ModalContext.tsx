import { createContext, useState, ReactNode } from "react";
import { HistoryItemData } from "../components/Header/Header";

type ModalContextType = {
  isAlertOpen: boolean;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  historyData: HistoryItemData[];
  setHistoryData: React.Dispatch<React.SetStateAction<HistoryItemData[]>>;
};

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export function ModalProvider({ children }: ModalProviderProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [historyData, setHistoryData] = useState<HistoryItemData[]>([]);

  const value: ModalContextType = {
    isAlertOpen,
    setIsAlertOpen,
    historyData,
    setHistoryData,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
