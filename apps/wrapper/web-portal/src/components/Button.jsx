import React from 'react'

const Button = (props) => {
  return (
    <button 
        onClick={props.onClick} 
        className={`border-blue-900 bg-blue-900 text-white p-3 font-medium rounded-[4px] ${props.moreClass}`}>
        { props.text }
    </button>
  )
}

export default Button
