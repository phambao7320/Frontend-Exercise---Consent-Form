import React, { Fragment } from "react";
import ItemConsent from "../components/item";

const ConsentPage = () => {
  const data = JSON.parse(localStorage.getItem("listConsent")) || [];

  return (
    <div className="mx-[200px]">
      <h1 className="text-3xl text-center my-5">All Consent</h1>

      <div className="flex justify-between items-center p-4 rounded-lg">
        <div>Detail</div>
        <div className="flex justify-center items-center gap-3">
          <div className="flex justify-between items-center gap-5">Consent</div>
          <div>Given</div>
        </div>
      </div>

      {data.map((item, index) => (
        <div
          key={index}
          className={`${
            index % 2 === 0 ? " bg-slate-200" : " bg-slate-50"
          } rounded-lg`}
        >
          <ItemConsent item={item} />
        </div>
      ))}
    </div>
  );
};

export default ConsentPage;
