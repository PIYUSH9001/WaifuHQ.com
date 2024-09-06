import React, { useContext, useEffect, useState } from 'react'
import '../styles/AnimeList.css'
import ShowItem from './ShowItem';
import Navbar from './Navbar';
import Loading from './Loading';
import { useLocation, useParams } from 'react-router-dom';
import { AnimeContext } from '../context';
export default function AnimeList({Genre =  null,Title,Search = null,Popular = null}) {
  const [Pageno,setPageno] = useState(1);
  const [AnimeData, setAnimeData] = useState(null);
  const {SearchInput} = useParams();
  const [PaginationDetails,setPaginationDetails] = useState(null);
  const URLLocation = useLocation();
  const FetchData = async () => {
    let res;
    if(Genre){
      res = await fetch(`https://api.jikan.moe/v4/anime?genres=${Genre}&order_by=popularity&page=${Pageno}&limit=20`);
    }
    else if(Popular){
      res = await fetch(`https://api.jikan.moe/v4/top/anime?page=${Pageno}&limit=20`);
    }
    else if(Search){
        res = await fetch(`https://api.jikan.moe/v4/anime?q=${SearchInput}&page=${Pageno}&limit=20`)
    }
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
              <h2 className='text-center text-light ListHeading p-2'>{CapitalizeWord(Title)}</h2>
              {AnimeData.map((element) => (
                <div className='col-6 mb-3' key={element.mal_id}>
                  <ShowItem AnimeImageURL={element.images.jpg.large_image_url} AnimeTitle={element.title} AnimeID={element.mal_id} />
                </div>
              ))}
              <div className='PaginationContainer container m-0 p-3'>
              <button type="button" className="btn btn-light btn-lg PaginationBtn" disabled={Pageno <= 1} onClick={()=>{
                  if(Pageno > 1){
                    setPageno(Pageno - 1);
                  }
              }}>Previous</button>
              <h3 className='text-light'>{Pageno}</h3>
              <button type="button" className="btn btn-success btn-lg PaginationBtn" disabled={Pageno === PaginationDetails.last_visible_page} onClick={()=>{
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
