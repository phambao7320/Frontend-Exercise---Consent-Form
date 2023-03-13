import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppMainContextProvider from "./context/app_context";
import ConsentPage from "./pages/Consent";
import HomePage from "./pages/Home";
import MainContent from "./pages/Main";

const App = () => {
  return (
    <AppMainContextProvider>
      <div className="mx-20">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainContent />} />
            <Route path="/consent" element={<ConsentPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppMainContextProvider>
  );
};

export default App;
