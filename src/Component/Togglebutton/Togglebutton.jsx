import React, { useState } from "react";
import "./Togglebutton.css";
const Togglebutton = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  return (
    <>
      <div
        className={`toggle-switch ${isOn ? "on" : "off"}`}
        onClick={toggleSwitch}
      >
        <div className="toggle-knob"></div>
      </div>
    </>
  );
};

export default Togglebutton;
