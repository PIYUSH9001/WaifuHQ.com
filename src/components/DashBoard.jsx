import React, { useEffect } from 'react';
import Loli from '../LoliIcon.png';
export default function DashBoard(props) {
    return (
        <div>
            <iframe style={{width:'100vw',height:'30vh'}}
                src={props.TrailerURL}
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>
        </div>
    )
}
