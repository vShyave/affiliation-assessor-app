import React from 'react'

const Button = (props) => {
  return (
    <button 
        onClick={props.onClick} 
        className={`border-primary-500 border-[1px] bg-primary-500 p-2 font-medium rounded-[4px] text-[14px] px-3 ${props.moreClass}` }
        style={props.style}>
        { props.text }
    </button>
  )
}

export default Button
