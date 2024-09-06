import React, { useState } from 'react'
import '../styles/showitem.css'
import { Link } from 'react-router-dom';
import AlternativeImage from '../images/alternativeImage.jpg'
export default function ShowItem(props) {
    const [IsLoaded,setIsLoaded] = useState(false);
    return (
        <>
            <Link to={`/anime/${props.AnimeID}`}>
                <div className="card rounded m-2 border-2 border-light" style={{height:'16rem',width:'10rem',backgroundImage:`url(${AlternativeImage}`,backgroundSize:'cover'}}>
                        <img src={props.AnimeImageURL} className="card-img rounded" alt={AlternativeImage} style={{height:'100%',display:IsLoaded?'block':'none'}}
                        onLoad={()=>{
                            setIsLoaded(true);
                        }}/>
                            <div className="card-img-overlay p-1 text-center" style={{background:'linear-gradient( rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 20%)',
                                height:'6.5rem',
                                top:'9.25rem',
                            }}>
                                <h5 className="card-title p-1 text-center d-flex align-items-center justify-content-center placeholder-glow flex-column" style={{height:'100%',}}>
                                    {
                                    IsLoaded?(props.AnimeTitle.length > 35)?`${props.AnimeTitle.slice(0,35)}...`:`${props.AnimeTitle.slice(0,35)}`:(<>
                                    <span className="placeholder w-100 my-2"></span>
                                    <span className="placeholder w-50 my-2"></span>
                                    
                                    </>)
                                    
                                }

                                    </h5>
                            </div>
                    </div>
            </Link>
        </>
    )
}
