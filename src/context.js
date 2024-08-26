import React, { createContext, useState } from "react";

const AnimeContext = createContext();

const AnimeProvider = ({children}) =>{
    const [AnimeData,setAnimeData] = useState(null);
    const SetData = async () => {
        let res = await fetch("https://api.jikan.moe/v4/top/anime");
        let Animedata = await res.json();
        setAnimeData(Animedata.data);
      }
    return(
        <AnimeContext.Provider value={
            {
                AnimeData,
                setAnimeData,
                SetData,
            }
            }>
            {children}
        </AnimeContext.Provider>
    )
}

export {AnimeContext,AnimeProvider};