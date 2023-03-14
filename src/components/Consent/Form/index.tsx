import { useContext } from "react";
import { ICON_NEXT } from "../../../assets";
import { AppMainContext } from "../../../contexts";

const ConsentForm = () => {
  const { infoUser, setInfoUser, setShowConsent } = useContext(AppMainContext);

  const inputChange = (event: any) => {
    event.preventDefault();
    setInfoUser({
      ...infoUser,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    setShowConsent(true);
  };

  const { nameUser, languageSelect } = infoUser;

  return (
    <div>
      <form className="w-[40%] m-auto" onSubmit={onSubmit}>
        <div className="my-2">
          <label>Name</label>
          <div>
            <input
              onChange={inputChange}
              name="nameUser"
              value={nameUser}
              type="text"
              placeholder="Enter your name"
              className="w-full border h-10 px-2"
            />
          </div>
        </div>
        <div className="my-2">
          <label>Language</label>
          <div>
            <select
              className="w-full my-3 px-2 border h-10"
              onChange={inputChange}
              value={languageSelect}
              name="languageSelect"
            >
              <option value="en-GB">English</option>
              <option value="fr-FR">France</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="px-3 py-2 bg-slate-400 rounded-md flex items-center justify-center"
          >
            Next <ICON_NEXT />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsentForm;
