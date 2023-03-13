import React, { useContext } from "react";
import { AppMainContext } from "../../context/app_context";
import { useNavigate } from "react-router-dom";

const FormUser = () => {
  const { infoUser, setInfoUser } = useContext(AppMainContext);
  const history = useNavigate();

  const inputChange = (event) => {
    event.preventDefault();
    setInfoUser({
      ...infoUser,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    history("/main");
  };

  const { nameUser, languageUser } = infoUser;

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
              value={languageUser}
              name="languageUser"
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
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 translate-y-[1px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUser;
