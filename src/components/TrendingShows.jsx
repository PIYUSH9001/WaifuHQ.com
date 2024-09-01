import React, { useContext, useEffect, useState } from 'react'
import ShowItem from './ShowItem'
import { AnimeContext } from '../context'
import '../styles/TrendingShows.css'
import Loading from './Loading';
export default function TrendingShows(props) {
  const [AnimeData,setAnimeData] = useState(null);
  const FetchData = async (parameter)=>{
      let url;
      switch (parameter) {
        case 'upcoming':
          url = 'https://api.jikan.moe/v4/top/anime?filter=upcoming';
          break;
        case 'airing':
          url = 'https://api.jikan.moe/v4/top/anime?filter=airing';
          break;
        case 'top':
          url = 'https://api.jikan.moe/v4/top/anime';
          break;
        case 'anime-recommended':
          url = `https://api.jikan.moe/v4/anime/${props.AnimeID}/recommendations`;
          break;
        default:
          url = 'https://api.jikan.moe/v4/top/anime';
      }
      try {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        let Animedata = await res.json();
        setAnimeData(Animedata.data);
    } catch (error) {
        console.error("Error fetching anime data:", error);
    }
  }
  useEffect(()=>{
    FetchData(props.Parameter);
  },[])
  useEffect(()=>{
    console.log(AnimeData);
  },[AnimeData])
  return (
    <div className='container m-0 p-1'>
      <h3 className='TrendingHeading text-light p-1 m-1 text-center'>{props.Title}</h3>
      <div className='AnimeContainer m-1 p-1 '>
      {AnimeData ? AnimeData.map((element) => {
          const animeProps = {
            AnimeImageURL: props.Parameter === 'anime-recommended'? element.entry.images.jpg.large_image_url:element.images.jpg.large_image_url,
            AnimeTitle:props.Parameter === 'anime-recommended'? element.entry.title_english:element.title,
            AnimeID: props.Parameter === 'anime-recommended'? element.entry.mal_id:element.mal_id,
          };
          return <ShowItem key={element.mal_id} {...animeProps} />;
        }) : <Loading/>}
      </div>
    </div>
  )
}
