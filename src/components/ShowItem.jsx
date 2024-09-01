import React from 'react'
import '../styles/showitem.css'
import { Link } from 'react-router-dom';
export default function ShowItem(props) {
    return (
        <>
            <Link to={`/anime/${props.AnimeID}`}>
                <div className="card rounded m-2 border-2 border-light" style={{height:'33vh',width:'40vw'}}>
                        <img src={props.AnimeImageURL} className="card-img rounded" alt="..."/>
                            <div className="card-img-overlay p-1 text-center" style={{background:'linear-gradient( rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 20%)',
                                height:'35%',
                                top:'65%'
                            }}>
                                <h5 className="card-title p-1 text-center d-flex align-items-center justify-content-center" style={{height:'100%',}}>{(props.AnimeTitle.length > 35)?`${props.AnimeTitle.slice(0,35)}...`:`${props.AnimeTitle.slice(0,35)}`}</h5>
                            </div>
                    </div>
            </Link>
        </>
    )
}
