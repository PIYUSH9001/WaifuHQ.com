import React, { useContext } from 'react'
import HomePage from './components/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AnimePage from './components/AnimePageMobile'
import { AnimeContext } from './context'
import AnimeTrailerPage from './components/AnimeTrailerPage'
import AnimeList from './components/AnimeList'
// import '@videojs/themes/dist/forest/index.css';  // Forest theme CSS
import AnimeOpeningPage from './components/AnimeOpeningPage'
export default function App() {
  // https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=31240&include=animethemes.animethemeentries.videos
  const GenreList = {
    Romance: '22',
    Shounen: '27',
    Isekai: '62',
    Shoujo: '25',
    sol: '36',
    comedy: '4',
    psychology: '40',
    music: '19'
  }
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/anime/:AnimeID' element={<AnimePage />} />
          <Route path='/anime/:AnimeID/:AnimeTrailer' element={<AnimeTrailerPage />} />
          <Route path='/anime/:AnimeID/opening' element={<AnimeOpeningPage/>}/>
          <Route path='/anime/popular' element={<AnimeList Popular={true} Title={'Popular anime'} />} />
          <Route path='/search/:SearchInput' element={<AnimeList Title={'Search results'} Search={true} />} />

          {Object.keys(GenreList).map((genre) => (
            <Route
              key={genre}
              exact path={`/${genre.toLowerCase()}`}
              element={<AnimeList Genre={GenreList[genre]} Title={genre + ' ' + 'Anime'} />}
            />
          ))}
        </Routes>
      </>
    </BrowserRouter>
  )
}

