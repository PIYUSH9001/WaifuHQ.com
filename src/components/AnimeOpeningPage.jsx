import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoJS from './VideoPlayer';
import Navbar from './Navbar';
import '../styles/OpeningPage.css';
import MaitakeGuru from '../videos/MaitakeMaitakeGuruGuru.gif';
import '@videojs/themes/dist/forest/index.css';  // Forest theme CSS
import { AnimeContext } from '../context';
export default function AnimeOpeningPage() {
    const { AnimeID } = useParams();
    const {DeviceType} = useContext(AnimeContext);
    const [OpeningLink,setOpeningLink] = useState(null);
    const playerRef = React.useRef(null);
    const [OpacityValue,setOpacityValue] = useState(0);
    const GetOpeningLink = async ()=>{
        try{
            const res = await fetch(`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${AnimeID}&include=animethemes.animethemeentries.videos`);
            const parsedData = await res.json();
            setOpeningLink(parsedData.anime[0].animethemes[0].animethemeentries[0].videos[0].link);
        }
        catch(error){
            console.log(error)
        }
    }
    const changePlayerOptions = () => {
        // you can update the player through the Video.js player instance
        if (!playerRef.current) {
            return;
        }
        // [update player through instance's api]
        playerRef.current.src([{ src: 'https://vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }]);
    };
    useEffect(()=>{
        GetOpeningLink();
    },[])
    useEffect(()=>{
        if(OpacityValue === 0){
            setOpacityValue(0.5);
        }
    },[OpeningLink])
    useEffect(()=>{
        console.log(OpeningLink);
    },[]);
    return (
        <div className='container-fluid OpeningPage container-fluid p-0 m-0'>
            <Navbar />
            <div className={`container-fluid p-auto m-0 rounded w-100 d-flex flex-column align-items-center justify-content-center`} style={{height:'90vh',backgroundColor:`rgba(0,0,0,${OpacityValue}`,transition:'0.5s'}}>
                {OpeningLink ? <>
                 (
                    <VideoJS options={{
                        autoplay: false,
                        controls: true,
                        controlBar: {
                            pictureInPictureToggle: false
                          },
                        preload:false,
                        responsive: true,
                        fluid: true,
                        playbackRates: [1.05, 2],
                        sources: [{
                            src: OpeningLink,
                            type: 'video/webm'
                        }]
                    }}
                    onReady={changePlayerOptions}
                    />
                )
                </>:
                <div className='p-0 m-0 w-50 d-flex flex-column align-items-center justify-content-center rounded'>
                    <img src={MaitakeGuru} alt="" className='w-25 object-fit-cover rounded'/>
                    <h3 className='text-light p-1 text-center'>Please wait a moment Onii Chan...</h3>
                </div>
            }
                {/* <p>{OpeningLink?OpeningLink:'loading'}</p> */}
            </div>
        </div>
    )
}
