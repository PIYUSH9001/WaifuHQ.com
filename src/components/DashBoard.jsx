import React, { useEffect } from 'react';
// import Loli from '../LoliIcon.png';
export default function DashBoard(props) {
    return (
        <div className='container m-0 p-0 ' style={{zIndex:'1'}}>
            <iframe style={{width:'100vw',height:'18rem'}}
                src={props.TrailerURL}
                 allow="autoplay; encrypted-media">
            </iframe>
        </div>
    )
}
