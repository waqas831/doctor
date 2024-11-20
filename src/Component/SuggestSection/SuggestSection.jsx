import React from "react";
import "./SuggestSection.css";
import SuggestImg1 from "../../images/suggest inprovement.svg";
import SuggestImg2 from "../../images/Customise Loung.svg";
import SuggestImg3 from "../../images/Account setting.svg";
const SuggestSection = () => {
  const suggestions = [
    { img: SuggestImg1, text: "Suggest Improvement" },
    { img: SuggestImg2, text: "Customise Lounge" },
    { img: SuggestImg3, text: "Account Setting" },
  ];
  return (
    <>
      <div className="SuggestSection-main">
        {suggestions.map((suggestion, index) => (
          <div className="SuggestSection-otr" key={index}>
            <div className="SuggestSection-inr">
              <div className="SuggestSection-box-otr">
                <div className="SuggestSection-box-inr">
                  <img
                    className="SuggestSection-img"
                    src={suggestion.img}
                    alt={suggestion.text}
                  />
                  <p className="SuggestSection-txt">{suggestion.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SuggestSection;
