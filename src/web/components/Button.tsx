import React from 'react'
import './style/Button.css';

type Props = {
  buttonClass: string;
  setClickFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

function Button({buttonClass, setClickFlag}: Props) {
  return (
    <div className="button-wrapper">
      <button
        className={buttonClass}
        onClick={e => {
          const target = e.currentTarget;
          const targetClass = target.getAttribute('class');
          if (targetClass === 'add-button') {
            setClickFlag(true);
          }
        }}
      >

      </button>
    </div>
  )
}

export default Button
