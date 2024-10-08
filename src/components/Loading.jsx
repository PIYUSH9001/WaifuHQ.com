import React from 'react'

export default function Loading(props) {
    return (
        <div className='loader' style={
                {
                height:props.FullPage?'100vh':'auto',
                flexGrow:'1',
                width:'auto',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'rgba(0,0,0,0.5)',
                }
            }
                >
            <div className="spinner-border text-danger mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
