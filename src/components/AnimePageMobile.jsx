import React, { useContext, useEffect, useState } from 'react'
import loli from '../LoliIcon.png'
import '../styles/AnimePage.css'
import Navbar from './Navbar'
import { AnimeContext } from '../context'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import TrendingShows from './TrendingShows'
import DashBoard from './DashBoard'
export default function AnimePage() {
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
    }, []);
    useEffect(() => {
        console.log(AnimeDataByID);
    }, [AnimeDataByID])
    return (
        <div className='container-fluid p-0 m-0 rounded-0 PageBackground'>
            <Navbar />
            {
                AnimeDataByID ?
                        <div className="card border-0 rounded-0" >
                            <img src={AnimeDataByID.images.jpg.large_image_url} className="card-img rounded-0" alt="..." />
                            <div className="card-img-overlay p-3 text-center rounded-0" style={{
                                background: 'linear-gradient( rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 20%)',
                                height: '40vh',
                                top: '53.25vh'
                            }}>
                                <h5 className="card-title AnimeTitle p-1">{AnimeDataByID.title_english}</h5>
                                <p className="card-text AnimeText p-1 m-1">{AnimeDataByID.synopsis}</p>

                                <button type="button" className="btn btn-light my-1">Watch trailer</button>
                                {/* <p className="card-update"><small>Last updated 3 mins ago</small></p> */}
                            </div>
                        </div>
                    :
                    <Loading />
            }
        </div>
    )
}
