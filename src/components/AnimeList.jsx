import React, { useEffect, useState } from 'react'
import '../styles/AnimeList.css'
import ShowItem from './ShowItem';
import Navbar from './Navbar';
import Loading from './Loading';
import { useLocation } from 'react-router-dom';
export default function AnimeList(props) {
  const [AnimeData, setAnimeData] = useState(null);
  const URLLocation = useLocation();
  const FetchData = async () => {
    let res = await fetch(`https://api.jikan.moe/v4/anime?genres=${props.Genre}&order_by=popularity&page=${props.Pageno}`);
    let parsedData = await res.json();
    setAnimeData(parsedData.data);
  }
  useEffect(() => {
    FetchData();
    return ()=>{
      setAnimeData(null);
    }
  }, [URLLocation])
  return (
    <>
      <Navbar />
      <div className='container-fluid m-0 p-0 AnimeListContainer row' style={{ height: AnimeData ? 'auto' : '100vh' }}>
        {
          AnimeData ? (
            <>
                <h2 className='text-center text-light'>Romance Anime</h2>
                {AnimeData.map((element) => (
                  <div className='col-6 mb-3' key={element.mal_id}>
                    <ShowItem AnimeImageURL={element.images.jpg.large_image_url} AnimeTitle={element.title} AnimeID={element.mal_id} />
                  </div>
                ))}
            </>
          ) : (
            <Loading FullPage={'true'} />
          )
        }
      </div>
    </>
  );
}
