import React, { useEffect, useState } from 'react'
import '../styles/CharacterList.css'
export default function CharacterList(props) {
    const [CharacterData, setCharacterData] = useState(null);
    const FetchCharacterData = async () => {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${props.AnimeID}/characters`)
        const data = await res.json();
        setCharacterData(data.data);
    }
    useEffect(() => {
        FetchCharacterData();
        return () => {
            setCharacterData(null);
        }
    }, [])
    return (
        <div className='CharacterList row m-0 p-1 rounded-0'>
            <h3 className='text-center text-light'>Characters</h3>
            {CharacterData ? CharacterData.map((element) => {
                return (
                    <>
                        <div className="CharacterCard card p-1 m-1">
                            <img src={element.character.images.jpg.image_url} alt="" className='CharacterDP' />
                                <p className='CharacterName p-1 m-1 text-cente'>
                                    {element.character.name}
                                </p>
                        </div>
                    </>
                )
            })
                :
                'loading'
            }
        </div>
    )
}
