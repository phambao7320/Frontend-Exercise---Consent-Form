import { useContext, useEffect } from "react";
import { AppMainContext } from "../contexts";
import { ConsentForm, ConsentText } from "../components";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const { initState, setInfoUser, showConsent, setShowConsent } =
    useContext(AppMainContext);

  const { pathname } = useLocation();

  useEffect(() => {
    setInfoUser(initState);
    setShowConsent(false);
  }, [pathname]);

  return (
    <div>
      <h1 className="text-3xl text-center">Consent Form</h1>
      {!showConsent ? <ConsentForm /> : <ConsentText />}
    </div>
  );
};

export default HomePage;
