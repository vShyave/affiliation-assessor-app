import React from 'react'

const Input = (props) => {
  return (
    <input type={props.type} name={props.name} id={props.id} placeholder={props.placeholder} className="w-full rounded-[4px] p-4 py-3 text-gray-900 ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={props.value} onChange={props.onChange} />
  )
}

export default Input
