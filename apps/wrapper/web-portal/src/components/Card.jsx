import React from 'react'

const Card = (props) => {
    return (
        <div className={`rounded-[12px] bg-white p-5 ${props.moreClass}`} style={props.styles} >
            {props.children}
        </div>
    )
}

export default Card
