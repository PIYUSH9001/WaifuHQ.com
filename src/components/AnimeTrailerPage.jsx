import React, { useEffect, useState } from 'react';
import '../styles/AnimePageTrailer.css';
import { useParams } from 'react-router-dom';
import DashBoard from './DashBoard';
import Navbar from './Navbar';
import TrendingShows from './TrendingShows';
export default function AnimeTrailerPage() {
    const {AnimeTrailer} = useParams();
  return (
    <div className='container m-0 p-0 AnimeTrailerPage'>
        <Navbar/>
        <DashBoard TrailerURL={`https://www.youtube.com/embed/${AnimeTrailer}?controls=0&showinfo=0&autoplay=1&loop=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0`}/>
        <TrendingShows Title={"More shows like this"}/>

    </div>
  )
}
