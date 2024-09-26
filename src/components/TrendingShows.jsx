import React, { useContext, useEffect, useRef, useState } from 'react'
import ShowItem from './ShowItem'
import { AnimeContext } from '../context'
import '../styles/TrendingShows.css'
import RightScrollIcon from '../images/RightScrollIcon.png';
import LeftScrollIcon from '../images/LeftArrowIcon.png';
import Loading from './Loading';
export default function TrendingShows(props) {
  const [AnimeData, setAnimeData] = useState(null);
  const { DeviceType } = useContext(AnimeContext);
  const AnimeContainerRef = useRef(null);
  const scrollRight = () => {
    if (AnimeContainerRef.current) {
      AnimeContainerRef.current.scrollBy({
        left: 700,
        behavior: 'smooth',
      });
    }
  };
  const scrollLeft = () => {
    if (AnimeContainerRef.current) {
      AnimeContainerRef.current.scrollBy({
        left: -700,
        behavior: 'smooth',
      });
    }
  };
  const FetchData = async (parameter) => {
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
  useEffect(() => {
    FetchData(props.Parameter);
  }, [props.Parameter])
  useEffect(()=>{
    const img1 = new Image();
    const img2 = new Image();
    img1.src = '../images/RightScrollIcon.png';
    img2.src = '../images/LeftArrowIcon.png';
  },[]);
  // useEffect(()=>{
  //   console.log(AnimeData.length);
  // },[AnimeData])
  return (
    <>
      <div className='m-1 py-1 d-flex flex-column align-items-center justify-content-center'>
        <h3 className='TrendingHeading text-light p-1 m-1 text-center'>{props.Title}</h3>
        <div className='d-flex align-items-center justify-content-between w-100'>
          {DeviceType === 'desktop' && (
            <div className=' m-0 p-1 d-flex align-items-center justify-content-center' style={{ height: '100%', width: '8%' }}>
              <button type="button" className="btn btn-dark rounded-circle" style={{ height: '3.5rem', width: '4rem', objectFit: 'cover' }} onClick={scrollLeft}>
                <img src={LeftScrollIcon} alt="" style={{ height: '2.5rem', width: '2rem', objectFit: 'cover' }} />
              </button>
            </div>
          )}
          <div className='container AnimeContainer m-1 p-1 w-100' ref={AnimeContainerRef}>
            {AnimeData ? AnimeData.length !== 0 ? AnimeData.map((element) => {
              const animeProps = {
                AnimeImageURL: props.Parameter === 'anime-recommended' ? element.entry.images.jpg.large_image_url : element.images.jpg.large_image_url,
                AnimeTitle: props.Parameter === 'anime-recommended' ? element.entry.title : element.title,
                AnimeID: props.Parameter === 'anime-recommended' ? element.entry.mal_id : element.mal_id,
                EpisodeCount: element.episodes,
                Synopsis: element.synopsis,
              };
              return <ShowItem key={element.mal_id} {...animeProps} ShowEffect={true} Thumbnail={false}/>;
            }) : <div className='container p-1 m-1 d-flex align-items-center justify-content-center'>
              <h3 className='text-center text-light'>Sorry,we currently don't have the data for this show</h3>
            </div> : <Loading />}
          </div>
          {DeviceType === 'desktop' && (
            <div className='mx-1 p-1 d-flex align-items-center justify-content-center' style={{ height: '100%', width: '8%' }}>
              <button type="button" className="btn btn-dark rounded-circle" style={{ height: '3.5rem', width: '', objectFit: 'cover' }} onClick={scrollRight}>
                <img src={RightScrollIcon} alt="" style={{ height: '2.5rem', width: '2rem', objectFit: 'cover' }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
