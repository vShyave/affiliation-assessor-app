import React from 'react'

const Button = (props) => {
  return (
    <button 
        onClick={props.onClick} 
        className={`bg-primary-900 p-3 font-medium rounded-[4px] ${props.moreClass}`}
        {...props.otherProps}>
        {/* { props.text } */}
      {/* onClick={props.onClick}  */}
      {/* className={`bg-primary-900 border-[1px] p-3 font-medium rounded-[4px] ${props.moreClass}`} */}
      {/* style={props.style}> */}
      { props.text }
    </button>
  )
}

export default Button
