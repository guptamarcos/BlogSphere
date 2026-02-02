import { useState,createContext } from "react";

const ShowProfilePopup = createContext();

const ShowProfilePopupProvider = ({children}) =>{
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [imgRef, setImgRef] = useState(null);

    return (
        <ShowProfilePopup.Provider value={{showProfilePopup, setShowProfilePopup, imgRef, setImgRef}}>
            {children}
        </ShowProfilePopup.Provider>
    )
};

export {ShowProfilePopup, ShowProfilePopupProvider};