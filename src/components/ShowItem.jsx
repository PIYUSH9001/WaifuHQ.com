import React, { useContext, useEffect, useState } from 'react'
import '../styles/showitem.css'
import { Link } from 'react-router-dom';
import AlternativeImage from '../images/alternativeImage.jpg'
import { AnimeContext } from '../context';
export default function ShowItem(props) {
    const [IsLoaded, setIsLoaded] = useState(false);
    const [IsHovered, setIsHovered] = useState(false);
    const { DeviceType } = useContext(AnimeContext);
    return (
        <>
            {
                DeviceType === 'mobile' ?
                    <Link to={`/anime/${props.AnimeID}`}>
                        <div className="card rounded m-2 border-2 border-light" style={{ height: '16rem', width: '10rem', backgroundImage: `url(${AlternativeImage}`, backgroundSize: 'cover' }}>
                            <img src={props.AnimeImageURL} className="card-img rounded" alt={AlternativeImage} style={{ height: '100%', display: IsLoaded ? 'block' : 'none' }}
                                onLoad={() => {
                                    setIsLoaded(true);
                                }} />
                            <div className="card-img-overlay p-1 text-center" style={{
                                background: 'linear-gradient( rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 20%)',
                                height: '6.5rem',
                                top: '9.25rem',
                            }}>
                                <h5 className="card-title p-1 text-center d-flex align-items-center justify-content-center placeholder-glow flex-column" style={{ height: '100%', }}>
                                    {
                                        IsLoaded ? (props.AnimeTitle.length > 35) ? `${props.AnimeTitle.slice(0, 35)}...` : `${props.AnimeTitle.slice(0, 35)}` : (<>
                                            <span className="placeholder w-100 my-2 rounded"></span>
                                            <span className="placeholder w-50 my-2 rounded"></span>
                                        </>)

                                    }

                                </h5>
                            </div>
                        </div>
                    </Link>
                    :
                    <Link to={`/anime/${props.AnimeID}`}>
                        <div className="card rounded m-2 border-2 border-light d-flex flex-row" style={{
                            height: '16rem', width: IsHovered?'20rem':'10rem', backgroundSize: 'cover', transition: '0.5s', zIndex: IsHovered? '1':'0', transform: IsHovered ? 'scale(1.05)' : 'scale(1)',
                            transformOrigin: 'top center',
                        }}
                            onMouseOver={() => {
                                setIsHovered(true);
                            }}
                            onMouseOut={() => {
                                setIsHovered(false)
                            }}
                        >
                            <img src={props.AnimeImageURL} className="card-img rounded-left" alt={AlternativeImage} style={{
                                height: '100%', display: IsLoaded ? 'block' : 'none',
                                width: '9.75rem'
                            }}
                                onLoad={() => {
                                    setIsLoaded(true);
                                }}
                            />
                            <span class="badge badge-info rounded-50" style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', backgroundColor: 'rgba(0,0,0,0.75)', transition: '0.25s', visibility: IsHovered ? 'visible' : 'hidden', opacity: IsHovered ? '1' : '0', }}>{`${props.EpisodeCount != null ? props.EpisodeCount + ' ' + 'EP' : ''}`}</span>
                            <div className="card-img-overlay p-1 text-center" style={{
                                background: 'linear-gradient( rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 20%)',
                                height: '6.5rem',
                                width: '9.75rem',
                                top: '9.25rem',
                                transition: '0.25s',
                                visibility: IsHovered ? 'hidden' : 'visible',
                                opacity: IsHovered ? '0' : '1'
                            }}>
                                <h5 className="card-title p-1 text-center d-flex align-items-center justify-content-center placeholder-glow flex-column" style={{ height: '100%', }}>
                                    {
                                        IsLoaded ? (props.AnimeTitle.length > 35) ? `${props.AnimeTitle.slice(0, 35)}...` : `${props.AnimeTitle.slice(0, 35)}` : (<>
                                            <span className="placeholder w-100 my-2 rounded"></span>
                                            <span className="placeholder w-50 my-2 rounded"></span>
                                        </>)

                                    }
                                </h5>
                            </div>
                            <div className='container p-1 bg-dark d-flex align-items-center justify-content-center flex-column' style={{
                                transition: '0.35s',
                                visibility: IsHovered ? 'visible' : 'hidden',
                                opacity: IsHovered ? '1' : '0',
                            }}>
                                <h3 className='p-1 text-center d-flex align-items-center justify-content-center' style={{
                                    height: '3rem',
                                    width: '9.5rem',
                                    fontSize: '1.2rem'
                                }}>{(props.AnimeTitle.length > 25) ? `${props.AnimeTitle.slice(0, 25)}...` : `${props.AnimeTitle.slice(0, 25)}`}</h3>
                                <p className='p-1 text-center' style={{ height: '8rem', width: '100%', overflowX: 'scroll' }}>
                                    {props.Synopsis}
                                </p>
                                <button type="button" class="btn btn-outline-light">Watch now</button>
                            </div>
                        </div>
                    </Link>
            }
        </>
    )
}
