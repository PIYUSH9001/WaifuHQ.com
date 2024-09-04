import React, { useEffect, useState } from 'react'
import '../styles/CharacterList.css'
import Loading from './Loading';
import MinimizeIcon from '../MinimizeIcon.png';
export default function CharacterList(props) {
    const [CharacterData, setCharacterData] = useState(null);
    const [ShowCharacterProperties,setShowCharacterProperties] = useState({
        Title:'Hide characters',
        Color:'success',
        IsClicked:false,
    })
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
        <>
        <div className='container w-100 text-center p-2 d-flex align-items-center justify-content-center'>
        <h3 className='text-center text-light mx-2'>Characters</h3>
        <button className={`btn btn-${ShowCharacterProperties.Color} rounded-circle CollapseBtn`} type="button" data-bs-toggle="collapse" data-bs-target="#CharactersTab" aria-expanded="true" aria-controls="CharactersTab"
        onClick={()=>{
            if(ShowCharacterProperties.IsClicked === false){
                setShowCharacterProperties({
                    Title:'Show characters',
                    Color:'danger',
                    IsClicked:true,
                })
            }
            else{
                setShowCharacterProperties({
                    Title:'Hide characters',
                    Color:'success',
                    IsClicked:false,
                })
            }
        }}
        >
                <img src={MinimizeIcon} alt="" className='w-100 object-fit-cover'/>
            </button>
            </div>
        <div className='CharacterList row m-0 p-1 rounded-0 collapse show' id='CharactersTab'>
            
            {CharacterData ? CharacterData.map((element) => {
                return (
                    <>
                        <div className="CharacterCard card p-1 m-1">
                            <img src={element.character.images.jpg.image_url} alt="" className='CharacterDP rounded-circle' />
                            <p className='CharacterName m-1 text-center'>
                                {element.character.name}
                                <small className='CharacterRole font-weight-bold'>({element.role})</small>
                            </p>
                        </div>
                    </>
                )
            })
                :
                <Loading FullPage={'true'} />
            }
        </div>
            </>
    )
}
