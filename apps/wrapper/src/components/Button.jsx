import React from "react";

const Button = ({ text, onClick, styles = "", css }) => {
  return (
    <button
      onClick={onClick}
      style={css}
      className={`bg-primary transition-all duration-300 hover:bg-white hover:text-primary border-2 font-medium py-3 text-[18px] ${styles}`}
    >
      {text}
    </button>
  );
};

export default Button;
