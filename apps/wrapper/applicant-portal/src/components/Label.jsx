import React from 'react'

const Label = (props) => {
    return (
        <label htmlFor={props.htmlFor} className={`text-gray-800 cursor-pointer  ${props.moreClass} ${(props.required) ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}`}>
            { props.text }
        </label>
    )
}

export default Label
