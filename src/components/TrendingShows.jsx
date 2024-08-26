import React, { useContext } from 'react'
import ShowItem from './ShowItem'
import { AnimeContext } from '../context'
import '../styles/TrendingShows.css'
export default function TrendingShows(props) {
  const { AnimeData } = useContext(AnimeContext);
  return (
    <div className='container'>
      <h3 className='TrendingHeading text-light p-1 m-1 text-center'>{props.Title}</h3>
      <div className='AnimeContainer m-1 p-1 '>
        {AnimeData ? AnimeData.map((element) => {
          return<>
          <ShowItem AnimeImageURL={element.images.jpg.large_image_url} AnimeTitle={element.title_english} AnimeID={element.mal_id}/>
          </>
        }):'loading'}
      </div>
    </div>
  )
}
