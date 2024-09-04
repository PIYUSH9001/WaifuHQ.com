import React, { createContext, useState } from "react";

const AnimeContext = createContext();

const AnimeProvider = ({children}) =>{
    const [AnimeData,setAnimeData] = useState(null);
    
    const SetData = async () => {
        try {
            let res = await fetch(`https://api.jikan.moe/v4/top/anime?filter=airing`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            let Animedata = await res.json();
            setAnimeData(Animedata.data);
        } catch (error) {
            console.error("Error fetching anime data:", error);
        }
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