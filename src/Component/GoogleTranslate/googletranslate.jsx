import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const hideBanner = () => {
      const bannerFrame = document.querySelector(".goog-te-banner-frame");
      const translatedText = document.querySelector(".goog-te-gadget-simple");
      const iframe = document.querySelector("iframe.skiptranslate");

      if (bannerFrame) {
        bannerFrame.style.display = "none";
      }

      if (translatedText) {
        translatedText.style.display = "none";
      }

      if (iframe) {
        iframe.style.display = "none";
      }
    };

    if (!document.querySelector("#google-translate-script")) {
      const googleTranslateScript = document.createElement("script");
      googleTranslateScript.id = "google-translate-script";
      googleTranslateScript.src = process.env.REACT_APP_GOOGLE_TRANSLATE_URL;
      googleTranslateScript.async = true;
      document.body.appendChild(googleTranslateScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );

        hideBanner();

        const observer = new MutationObserver(hideBanner);
        observer.observe(document.body, { childList: true, subtree: true });

        const styleTag = document.createElement("style");
        styleTag.innerHTML = `
          
          .goog-te-banner-frame {
            display: none !important; 
            width: 100% !important;
          }

          
          body {
            top: 0px !important;
          }

          .goog-te-gadget-simple {
            display: none !important; 
          }

          iframe.skiptranslate {
            display: none !important;
          }
        #google_translate_element {
            color: transparent;
            }
        #google_translate_element a {
            display: none;
            }
        div.goog-te-gadget {
            color: transparent !important;
            }
       /* Enforce smaller size */
          #google_translate_element select {
            color: white !important;
            padding: 2px !important; /* Reduced padding */
            border-radius: 4px !important;
            
            background-color: #14467B !important;
            border: 1px solid #1A5C98 !important;
            font-size: 10px !important; /* Reduced font size */
            width: auto !important;
            margin: 0 5px !important;
          }
          
          }
        `;
        document.head.appendChild(styleTag);
      };
    }

    const styleInterval = setInterval(() => {
      const translateDropdown = document.querySelector('#google_translate_element select');
      if (translateDropdown) {
        translateDropdown.style.color = 'white';
        translateDropdown.style.padding = '5px';
        translateDropdown.style.borderRadius = '4px';
        translateDropdown.style.backgroundColor = '#14467B'; 
        translateDropdown.style.border = '1px solid #ccc';   
        translateDropdown.style.fontSize = '12px'; 
        translateDropdown.style.margin = '0 10px'; 

        clearInterval(styleInterval); 
      }
    }, 100); 

  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;