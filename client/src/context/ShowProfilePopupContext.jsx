import { useState,createContext } from "react";

const ShowProfilePopup = createContext();

const ShowProfilePopupProvider = ({children}) =>{
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    return (
        <ShowProfilePopup.Provider value={{showProfilePopup, setShowProfilePopup}}>
            {children}
        </ShowProfilePopup.Provider>
    )
};

export {ShowProfilePopup, ShowProfilePopupProvider};