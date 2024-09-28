import React, { createContext, useState } from "react";

const AnimeContext = createContext();

const AnimeProvider = ({children}) =>{
    const [AnimeData,setAnimeData] = useState(null);
    const [SearchInput,setSearchInput] = useState('');
    const [DeviceType,setDeviceType] = useState(null);
    const [VideoLink,setVideoLink] = useState(null);
    const CheckDevice = ()=>{
        let screenSize = window.innerWidth;
        if(screenSize < 768 ){
            setDeviceType("mobile");
        }
        else if((screenSize < 1024 && screenSize >= 768)){
            setDeviceType("tablet");
        }
        else{
            setDeviceType("desktop");
        }
    }
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
                SearchInput,
                setSearchInput,
                DeviceType,
                CheckDevice,
                VideoLink,
                setVideoLink,
            }
            }>
            {children}
        </AnimeContext.Provider>
    )
}

export {AnimeContext,AnimeProvider};