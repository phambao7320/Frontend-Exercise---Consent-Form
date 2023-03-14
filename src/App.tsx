import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppMainContextProvider from "./contexts";
import { HomePage, ConsentPage } from "./pages";

const App = () => {
  return (
    <AppMainContextProvider>
      <div className="mx-20">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consent" element={<ConsentPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppMainContextProvider>
  );
};

export default App;
