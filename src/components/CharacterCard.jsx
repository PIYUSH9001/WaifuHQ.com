import React, { useState } from 'react'
import PlaceholderIMG from '../images/PlaceholderImage.jpg';

export default function CharacterCard({ CharacterInfo }) {
    const [IsLoaded, setIsLoaded] = useState(false);
    return (
        <div key={CharacterInfo.CharacterID} className="CharacterCard rounded card p-1 m-1 border border-light border-2" style={{ position: 'relative' }}>
            <a href={CharacterInfo.CharacterURL} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            </a>
            <img src={IsLoaded ? CharacterInfo.CharacterIMG : PlaceholderIMG} alt="" className='CharacterDP rounded-circle' onLoad={(event) => {
                setTimeout(() => {
                    setIsLoaded(true)
                }, 1000);
            }} />
            <p className='CharacterName m-1 text-center placeholder-glow'>
                {IsLoaded ? CharacterInfo.CharacterName : (<>
                    <span className="placeholder w-100 my-2 rounded"></span>
                    <span className="placeholder w-50 my-2 rounded"></span>
                </>)}
                <small className='CharacterRole font-weight-bold'>({CharacterInfo.CharacterRole})</small>
            </p>
        </div>
    )
}
