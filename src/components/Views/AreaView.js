import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { FiBox } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import TitleInput from "./shared/TitleInput";
import "./AreaView.css";

function AreaView() {
  const { areadId } = useParams();
  const area = useSelector((state) =>
    state.area.areas.find((area) => area.id === Number(areadId))
  );

  return (
    <div className="view-wrapper">
      <div className="view-header">
        <FiBox />
        <TitleInput name={area.name} placeholder={"New Area"} />
        <BsThreeDots className="btn" />
      </div>
      <div className="view-body"></div>
    </div>
  );
}

export default AreaView;
