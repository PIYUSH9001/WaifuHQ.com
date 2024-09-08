import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import DashBoard from './DashBoard'
import TrendingShows from './TrendingShows'
import { AnimeContext } from '../context'
import '../styles/HomePage.css'
import Loading from './Loading'
export default function HomePage() {
    const {AnimeData,setAnimeData,SetData,DeviceType,CheckDevice} = useContext(AnimeContext);
    useEffect(()=>{
      SetData();
      CheckDevice();
      return ()=>{
        setAnimeData(null);
      }
    },[])
    useEffect(()=>{
      console.log(DeviceType)
    },[DeviceType])
  return (
    <div className='AnimePage container-fluid m-0 p-0'>
        {AnimeData?
        <>
        <Navbar/>
        <TrendingShows Title={"Currently airing"} Parameter="airing"/>
        <TrendingShows Title={"Upcoming shows"} Parameter="upcoming"/>
        </>
        :<Loading FullPage='true'/>}
    </div>
  )
}
