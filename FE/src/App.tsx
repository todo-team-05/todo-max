import { CardProvider } from "./contexts/CardContext";
import { HistoryProvider } from "./contexts/HistoryContext";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <>
      <HistoryProvider>
        <CardProvider>
          <MainPage />
        </CardProvider>
      </HistoryProvider>
    </>
  );
}

export default App;
