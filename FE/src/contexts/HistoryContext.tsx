import { createContext, useState, ReactNode } from "react";
import { HistoryItemData } from "../components/Header/Header";

type HistoryContextType = {
  historyData: HistoryItemData[];
  setHistoryData: React.Dispatch<React.SetStateAction<HistoryItemData[]>>;
};

type HistoryProviderProps = {
  children: ReactNode;
};

export const HistoryContext = createContext<HistoryContextType | undefined>(
  undefined
);

export function HistoryProvider({ children }: HistoryProviderProps) {
  const [historyData, setHistoryData] = useState<HistoryItemData[]>([]);
  const value: HistoryContextType = {
    historyData,
    setHistoryData,
  };

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}
