import React, { useContext, useEffect, useState } from 'react'
// import loli from '../LoliIcon.png'
import '../styles/AnimePage.css'
import Navbar from './Navbar'
import { AnimeContext } from '../context'
import { useLocation, useParams } from 'react-router-dom'
import Loading from './Loading'
import TrendingShows from './TrendingShows'
import DashBoard from './DashBoard';
import { Link } from 'react-router-dom';
import CharacterList from './CharacterList'
import Footer from './Footer'
export default function AnimePage() {
    const location = useLocation();
    const { AnimeID } = useParams();
    const [AnimeDataByID, setAnimeDataByID] = useState(null);
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
        <div className='container-fluid p-0 m-0 rounded-0 PageBackground'>
            {
                AnimeDataByID ? <>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <CharacterList AnimeID={AnimeDataByID.mal_id}/>
                    <TrendingShows AnimeID={AnimeDataByID.mal_id} Parameter={'anime-recommended'} Title={'More shows like this'}/>
                    <Footer/>
                </>
                    :
                    <Loading FullPage='true' />
            }
        </div>
    )
}
