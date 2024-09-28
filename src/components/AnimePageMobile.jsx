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
    const { DeviceType, setVideoLink } = useContext(AnimeContext);
    const [IsImageHovered, setIsImageHovered] = useState(false)
    const [AnimeSongsLinks,setAnimeSongsLinks] = useState(null);
    const [OpeningLinks, setOpeningLinks] = useState(null);
    const [EndingLinks,setEndingLinks] = useState(null);
    const GetAnimeSongsLinks = async () => {
        try {
            const res = await fetch(`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${AnimeID}&include=animethemes.animethemeentries.videos`);
            const parsedData = await res.json();
            const openingTheme = parsedData.anime[0].animethemes.filter(theme => theme.type === 'OP');
            setAnimeSongsLinks(parsedData.anime[0].animethemes);
            setOpeningLinks(parsedData.anime[0].animethemes.filter(theme => theme.type === 'OP'));
            setEndingLinks(parsedData.anime[0].animethemes.filter(theme => theme.type === 'ED'));
        }
        catch (error) {
            console.log(error)
        }
    }
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
    useEffect(() => {
        GetAnimeSongsLinks();
        // return ()=>{
        //     setAnimeSongsLinks(null)
        // }
    }, [])
    useEffect(() => {
        console.log(AnimeSongsLinks);
    }, [AnimeSongsLinks])
    return (
        <>
            {DeviceType === 'mobile' &&
                <div className='container-fluid p-0 m-0 rounded-0 PageBackground'>
                    {
                        AnimeDataByID ? <div style={{ backgroundColor: 'rgb(0,0,0,0.5)' }}>
                            <Navbar />
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-5 d-flex align-items-center">
                                        <img src={AnimeDataByID.images.jpg.large_image_url} className="img-fluid AnimeIMG w-100 rounded m-1" alt="..." />
                                    </div>
                                    <div className="col-7">
                                        <div className="card-body d-flex align-items-center justify-content-center flex-column">
                                            <h5 className="AnimeTitle text-center">{AnimeDataByID.title_english || AnimeDataByID.title}</h5>
                                            <p className="AnimeText text-center p-1">{AnimeDataByID.synopsis}</p>
                                            {/* <Link to={`/anime/${AnimeDataByID.mal_id}/${AnimeDataByID.trailer.youtube_id}`}>
                                                <button type="button" className="btn btn-light m-1 btn-lg w-100">Watch trailer</button>
                                            </Link>
                                            <button type="button" className="btn btn-success m-1 btn-lg w-100" onClick={() => navigate(`/anime/${AnimeDataByID.mal_id}/opening`)}>Watch opening</button> */}
                                            {
                                            OpeningLinks ?
                                                OpeningLinks.length < 2 ?
                                                    <button type="button" className="btn btn-success w-100 mx-auto my-1 btn-lg text-light DesktopBtn" onClick={() => {
                                                        navigate(`/anime/${AnimeDataByID.mal_id}/opening`)
                                                        setVideoLink(OpeningLinks[0].animethemeentries[0].videos[0].link)
                                                    } 
                                                }>Watch opening</button>
                                                    :
                                                    <>
                                                        <div className="btn-group dropdown-center mx-auto" data-bs-theme="dark">
                                                            <button type="button" className="btn btn-success dropdown-toggle my-1 btn-lg mx-auto" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Watch opening
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                {OpeningLinks.map((element) => {
                                                                    return <li className="dropdown-item text-light text-center" onClick={() => {
                                                                        navigate(`/anime/${AnimeDataByID.mal_id}/opening`);
                                                                        setVideoLink(element.animethemeentries[0].videos[0].link
                                                                        )
                                                                    }} style={{ cursor: 'pointer' }}>Opening {element.sequence || '1'}</li>
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </>
                                                : <button type="button" className="btn btn-success w-100 mx-auto my-1 btn-lg">
                                                    <div className="spinner-border text-light" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </button>
                                        }
                                        {
                                            EndingLinks ?
                                                EndingLinks.length < 2 ?
                                                    <button type="button" className="btn btn-primary w-100 mx-auto btn-lg my-1 text-light DesktopBtn" onClick={() => {
                                                        navigate(`/anime/${AnimeDataByID.mal_id}/opening`)
                                                        setVideoLink(EndingLinks[0].animethemeentries[0].videos[0].link)
                                                    } 
                                                }>Watch ending</button>
                                                    :
                                                    <>
                                                        <div className="btn-group dropdown-center mx-auto" data-bs-theme="dark">
                                                            <button type="button" className="btn btn-primary dropdown-toggle btn-lg mx-auto my-1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Watch ending
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                {EndingLinks.map((element) => {
                                                                    return <li className="dropdown-item text-light text-center" onClick={() => {
                                                                        navigate(`/anime/${AnimeDataByID.mal_id}/opening`);
                                                                        setVideoLink(element.animethemeentries[0].videos[0].link
                                                                        )
                                                                    }} style={{ cursor: 'pointer' }}>Ending {element.sequence || '1'}</li>
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </>
                                                : <button type="button" className="btn btn-primary w-100 mx-auto my-1 btn-lg">
                                                    <div className="spinner-border text-light" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </button>
                                        }
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
                                <img src={AnimeDataByID.images.jpg.large_image_url} className="img-fluid AnimeIMG w-25 rounded m-1" alt="..." style={{ opacity: IsImageHovered ? '0.75' : '1', transition: '0.3s', cursor: 'pointer', border: '2px solid white' }}
                                    onMouseOver={() => setIsImageHovered(true)}
                                    onMouseOut={() => setIsImageHovered(false)}
                                />
                                <div className='container p-2 m-1 d-flex align items-center justify-content-center flex-column w-100'>
                                    <h5 className="AnimeTitle text-center text-light">{AnimeDataByID.title_english || AnimeDataByID.title}</h5>
                                    <p className="AnimeText text-center p-1 text-light">{AnimeDataByID.synopsis}</p>
                                    <div className='d-flex align-items-center justify-content-around flex-row w-100'>
                                        {
                                            OpeningLinks ?
                                                OpeningLinks.length < 2 ?
                                                    <button type="button" className="btn btn-success w-25 mx-auto btn-lg text-light DesktopBtn" onClick={() => {
                                                        navigate(`/anime/${AnimeDataByID.mal_id}/opening`)
                                                        setVideoLink(OpeningLinks[0].animethemeentries[0].videos[0].link)
                                                    } 
                                                }>Watch opening</button>
                                                    :
                                                    <>
                                                        <div className="btn-group dropdown-center mx-auto" data-bs-theme="dark">
                                                            <button type="button" className="btn btn-success dropdown-toggle btn-lg mx-auto" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Watch opening
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                {OpeningLinks.map((element) => {
                                                                    return <li className="dropdown-item text-light text-center" onClick={() => {
                                                                        navigate(`/anime/${AnimeDataByID.mal_id}/opening`);
                                                                        setVideoLink(element.animethemeentries[0].videos[0].link
                                                                        )
                                                                    }} style={{ cursor: 'pointer' }}>Opening {element.sequence || '1'}</li>
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </>
                                                : <button type="button" className="btn btn-success w-25 mx-auto btn-lg">
                                                    <div className="spinner-border text-light" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </button>
                                        }
                                        {
                                            EndingLinks ?
                                                EndingLinks.length < 2 ?
                                                    <button type="button" className="btn btn-primary w-25 mx-auto btn-lg text-light DesktopBtn" onClick={() => {
                                                        navigate(`/anime/${AnimeDataByID.mal_id}/opening`)
                                                        setVideoLink(EndingLinks[0].animethemeentries[0].videos[0].link)
                                                    } 
                                                }>Watch ending</button>
                                                    :
                                                    <>
                                                        <div className="btn-group dropdown-center mx-auto" data-bs-theme="dark">
                                                            <button type="button" className="btn btn-primary dropdown-toggle btn-lg mx-auto" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Watch ending
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                {EndingLinks.map((element) => {
                                                                    return <li className="dropdown-item text-light text-center" onClick={() => {
                                                                        navigate(`/anime/${AnimeDataByID.mal_id}/opening`);
                                                                        setVideoLink(element.animethemeentries[0].videos[0].link
                                                                        )
                                                                    }} style={{ cursor: 'pointer' }}>Ending {element.sequence || '1'}</li>
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </>
                                                : <button type="button" className="btn btn-primary w-25 mx-auto btn-lg">
                                                    <div className="spinner-border text-light" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </button>
                                        }
                                        <button type="button" className="btn btn-outline-light w-25 mx-auto btn-lg">Add to playlist</button>
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
        </>
    )
}
