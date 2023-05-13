import React from 'react'

const Button = (props) => {
  return (
    <button 
        onClick={props.onClick} 
        className={`border-primary-500 border-2 bg-primary-500 text-white p-2 font-medium rounded-[4px] ${props.moreClass}` }
        style={props.style}>
        { props.text }
    </button>
  )
}

export default Button
