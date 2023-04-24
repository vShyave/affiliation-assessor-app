import React from 'react'

const Loader = () => {
  return (
    <div className="flex w-[80%] border-primary border-[1px] h-[280px] mx-auto">
        <div className="loader"></div>

        <style>
          {
            `
              .loader {
                border: 8px solid #FFF; /* Light grey */
                border-top: 8px solid #F8913D; /* Blue */
                border-radius: 50%;
                width: 60px;
                height: 60px;
                animation: spin 2s linear infinite;
                margin: auto;
              }
                
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `
          }
        </style>
    </div>
  )
}

export default Loader
