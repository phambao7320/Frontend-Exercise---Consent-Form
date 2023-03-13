import { createContext, useState } from "react";

export const AppMainContext = createContext();

const AppMainContextProvider = ({ children }) => {
  const [infoUser, setInfoUser] = useState({
    nameUser: "",
    languageUser: "en-GB",
  });

  const [isNext, setIsNext] = useState(false);

  const appMainContextData = {
    infoUser,
    setInfoUser,
    isNext,
    setIsNext,
  };

  return (
    <AppMainContext.Provider value={appMainContextData}>
      {children}
    </AppMainContext.Provider>
  );
};

export default AppMainContextProvider;
