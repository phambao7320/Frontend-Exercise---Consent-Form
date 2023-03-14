import { createContext, useState } from "react";
import { TypeConsentForm } from "../types";

export const AppMainContext = createContext<any>({});

const AppMainContextProvider = ({ children }: any) => {
  const initState: TypeConsentForm = {
    nameUser: "",
    languageSelect: "en-GB",
  };
  const [infoUser, setInfoUser] = useState<TypeConsentForm>(initState);
  const [showConsent, setShowConsent] = useState(false);

  const appMainContextData = {
    initState,
    infoUser,
    setInfoUser,
    showConsent,
    setShowConsent,
  };

  return (
    <AppMainContext.Provider value={appMainContextData}>
      {children}
    </AppMainContext.Provider>
  );
};

export default AppMainContextProvider;
