import React, { useContext } from 'react'
import HomePage from './components/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AnimePage from './components/AnimePageMobile'
import { AnimeContext } from './context'
import AnimeTrailerPage from './components/AnimeTrailerPage'
import AnimeList from './components/AnimeList'
export default function App() {
    const GenreList = {
      'Romance':'22',
      'Shounen':'27',
      'Isekai':'62',
      'Shoujo':'25',
      'sol':'36',
    }
  return (
    <BrowserRouter>
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/anime/:AnimeID' element={<AnimePage/>}/>
        <Route path='/anime/:AnimeID/:AnimeTrailer' element={<AnimeTrailerPage/>}/>
        {Object.keys(GenreList).map((genre) => (
          <Route
            key={genre}
            path={`/${genre.toLowerCase()}`}
            element={<AnimeList Genre={GenreList[genre]} Pageno={'1'} />}
          />
        ))}
      </Routes>
    </>
    </BrowserRouter>
  )
}

