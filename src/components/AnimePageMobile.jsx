import React, { useContext, useEffect, useState } from 'react'
// import loli from '../LoliIcon.png'
import '../styles/AnimePage.css'
import Navbar from './Navbar'
import { AnimeContext } from '../context'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading'
import TrendingShows from './TrendingShows'
import DashBoard from './DashBoard';
import { Link } from 'react-router-dom';
import CharacterList from './CharacterList'
import Footer from './Footer'
import VideoJS from './VideoPlayer'
export default function AnimePage() {
    const location = useLocation();
    const { AnimeID } = useParams();
    const [AnimeDataByID, setAnimeDataByID] = useState(null);
    const { DeviceType } = useContext(AnimeContext);
    const [IsImageHovered,setIsImageHovered] = useState(false)
    const navigate = useNavigate();
    function toCamelCase(str) {
        // Remove special characters and split the string into words
        const words = str.replace(/[^a-zA-Z0-9\s]/g, ' ').trim().split(/\s+/);
      
        return words.map((word, index) => {
          // Replace "season" with "S" and handle the following number if present
          if (word.toLowerCase() === 'season') {
            return 'S';
          }
      
          // Convert "a" in specific cases like "date a live"
          if (word.toLowerCase() === 'a' && index > 0) {
            return 'A';
          }
      
          // Keep numbers as is, especially for things like "S2"
          if (!isNaN(word)) {
            return word;
          }
      
          // For the first word, keep it lowercase
          if (index === 0) {
            return word.toLowerCase();
          }
      
          // For subsequent words, capitalize the first letter
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
      }
    // const changePlayerOptions = () => {
    //     // you can update the player through the Video.js player instance
    //     if (!playerRef.current) {
    //         return;
    //     }
    //     // [update player through instance's api]
    //     playerRef.current.src([{ src: 'https://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }]);
    // };
    const getAnimeDataByID = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${AnimeID}`);
            const ParsedAnimeDataByID = await response.json();
            setAnimeDataByID(ParsedAnimeDataByID.data);
        }
        catch (error) {
            return (
                <div>
                    <p>Error occured! - {error}</p>
                </div>
            )
        }
    }
    useEffect(() => {
        getAnimeDataByID();
        return () => {
            setAnimeDataByID(null);
        }
    }, [location]);
    return (
        <>
            {DeviceType === 'mobile' &&
                <div className='container-fluid p-0 m-0 rounded-0 PageBackground'>
                    {
                        AnimeDataByID ? <div style={{ backgroundColor: 'rgb(0,0,0,0.5)' }}>
                            <Navbar />
                            {/* <div className="card border-0 rounded-0" >
                        <img src={AnimeDataByID.images.jpg.large_image_url} className="card-img rounded-0" alt="..." />
                        <div className="card-img-overlay p-3 text-center rounded-0" style={{
                            background: 'linear-gradient( rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 20%)',
                            height: '40vh',
                            top: '53.25vh'
                            }}>
                            <h5 className="card-title AnimeTitle p-1">{AnimeDataByID.title_english}</h5>
                            <p className="card-text AnimeText p-1 m-1">{AnimeDataByID.synopsis}</p>
                            <Link to={`/anime/${AnimeDataByID.mal_id}/${AnimeDataByID.trailer.youtube_id}`}>
                            <button type="button" className="btn btn-light my-3 btn-lg w-50">Watch trailer</button>
                            </Link>
                            </div>
                            </div> */}

                            

                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-5 d-flex align-items-center">
                                        <img src={AnimeDataByID.images.jpg.large_image_url} className="img-fluid AnimeIMG w-100 rounded m-1" alt="..." />
                                    </div>
                                    <div className="col-7">
                                        <div className="card-body">
                                            <h5 className="AnimeTitle text-center">{AnimeDataByID.title_english || AnimeDataByID.title}</h5>
                                            <p className="AnimeText text-center p-1">{AnimeDataByID.synopsis}</p>
                                            <Link to={`/anime/${AnimeDataByID.mal_id}/${AnimeDataByID.trailer.youtube_id}`}>
                                                <button type="button" className="btn btn-light m-1 btn-lg w-100">Watch trailer</button>
                                            </Link>
                                            <button type="button" class="btn btn-outline-primary w-25 mx-auto btn-lg text-light" onClick={()=>navigate(`/anime/${AnimeDataByID.mal_id}/opening`)}>Watch opening</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CharacterList AnimeID={AnimeDataByID.mal_id} />
                            <TrendingShows AnimeID={AnimeDataByID.mal_id} Parameter={'anime-recommended'} Title={'More shows like this'} />
                            <Footer />
                        </div>
                            :
                            <Loading FullPage='true' />
                    }
                </div>
            }
            {DeviceType === 'desktop' &&
                <div className='container-fluid p-0 m-0 rounded-0 PageBackground'>
                    {
                        AnimeDataByID ? <div style={{ backgroundColor: 'rgb(0,0,0,0.5)' }}>
                            <Navbar />
                            <div className="container-fluid m-0 p-1 w-100 d-flex align items-center justify-content-center" >
                                <img src={AnimeDataByID.images.jpg.large_image_url} className="img-fluid AnimeIMG w-25 rounded m-1" alt="..." style={{opacity:IsImageHovered?'0.75':'1',transition:'0.3s',cursor:'pointer',border:'2px solid white'}}
                                onMouseOver={()=>setIsImageHovered(true)}
                                onMouseOut={()=>setIsImageHovered(false)}
                                />
                                <div className='container p-2 m-1 d-flex align items-center justify-content-center flex-column w-100'>
                                    <h5 className="AnimeTitle text-center text-light">{AnimeDataByID.title_english || AnimeDataByID.title}</h5>
                                    <p className="AnimeText text-center p-1 text-light">{AnimeDataByID.synopsis}</p>
                                    <div className='d-flex align-items-center justify-content-around flex-row w-100'>
                                    <button type="button" class="btn btn-outline-primary w-25 mx-auto btn-lg text-light" onClick={()=>navigate(`/anime/${AnimeDataByID.mal_id}/opening`)}>Watch opening</button>
                                    <button type="button" class="btn btn-outline-success w-25 mx-auto btn-lg text-light" onClick={()=>{
                                        navigate(`/anime/${AnimeDataByID.mal_id}/${AnimeDataByID.trailer.youtube_id}`)
                                    }}>Watch trailer</button>
                                    <button type="button" class="btn btn-outline-light w-25 mx-auto btn-lg">Add to playlist</button>

                                    </div>
                                </div>
                            </div>
                            <CharacterList AnimeID={AnimeDataByID.mal_id} />
                            <TrendingShows AnimeID={AnimeDataByID.mal_id} Parameter={'anime-recommended'} Title={'More shows like this'}/>
                            <Footer />
                        </div>
                            :
                            <Loading FullPage='true' />
                    }
                </div>
            }
        </>
    )
}
