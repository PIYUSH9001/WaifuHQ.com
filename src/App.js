import React, { useContext } from 'react'
import HomePage from './components/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AnimePage from './components/AnimePageMobile'
import { AnimeContext } from './context'
export default function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/anime/:AnimeID' element={<AnimePage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

