import React, { useContext, useEffect, useState } from 'react'
import '../styles/AnimeList.css'
import ShowItem from './ShowItem';
import Navbar from './Navbar';
import Loading from './Loading';
import { useLocation } from 'react-router-dom';
import { AnimeContext } from '../context';
export default function AnimeList(props) {
  const [Pageno,setPageno] = useState(1);
  const [AnimeData, setAnimeData] = useState(null);
  const [PaginationDetails,setPaginationDetails] = useState(null);
  const URLLocation = useLocation();
  const FetchData = async () => {
    let res = await fetch(`https://api.jikan.moe/v4/anime?genres=${props.Genre}&order_by=popularity&page=${Pageno}&limit=20`);
    let parsedData = await res.json();
    setAnimeData(parsedData.data);
    setPaginationDetails(parsedData.pagination)
  }
  const CapitalizeWord = (word) => {
    if (!word || typeof word !== 'string') {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  useEffect(() => {
    FetchData();
    return () => {
      setAnimeData(null);
    }
  }, [URLLocation,Pageno])
  return (
    <>
      <Navbar />
      <div className='container-fluid m-0 p-0 AnimeListContainer row' style={{ height: AnimeData ? 'auto' : '100vh' }}>
        {
          AnimeData ? (
            <>
              <h2 className='text-center text-light'>{CapitalizeWord(props.Title)}</h2>
              {AnimeData.map((element) => (
                <div className='col-6 mb-3' key={element.mal_id}>
                  <ShowItem AnimeImageURL={element.images.jpg.large_image_url} AnimeTitle={element.title} AnimeID={element.mal_id} />
                </div>
              ))}
              <div className='PaginationContainer container m-0 p-3'>
              <button type="button" className="btn btn-light btn-lg" disabled={Pageno <= 1} onClick={()=>{
                  if(Pageno > 1){
                    setPageno(Pageno - 1);
                  }
              }}>Previous</button>
              <h3 className='text-light'>{Pageno}</h3>
              <button type="button" className="btn btn-success btn-lg" disabled={Pageno === PaginationDetails.last_visible_page} onClick={()=>{
                  if(Pageno < PaginationDetails.last_visible_page){
                    setPageno(Pageno + 1);
                  }
              }}>Next</button>
              </div>
            </>
          ) : (
            <Loading FullPage={'true'} />
          )
        }
      </div>
    </>
  );
}
