import { HistoryProvider } from "./contexts/HistoryContext";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <>
      <HistoryProvider>
        <MainPage />
      </HistoryProvider>
    </>
  );
}

export default App;
