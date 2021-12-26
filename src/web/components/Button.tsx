import React, { useState } from 'react'
import { Balloon } from './index';
import './style/Button.css';

type Props = {
  buttonClass: string;
  setClickFlag: React.Dispatch<React.SetStateAction<boolean>> | null;
}

function Button({buttonClass, setClickFlag}: Props) {
  const [isAdd, setIsAdd] = useState(false); //add-buttonにクラスをつけるための変数
  function handleClick() { setIsAdd(!isAdd) }

  const [isMouseenter, setMouseenter] = useState(false);
  
  return (
    <div className="button-wrapper">
      <button
        className={`${buttonClass} ${isAdd && 'is_add'}`}
        onClick={e => {
          const target = e.currentTarget;
          const targetClass = target.getAttribute('class');
          if (targetClass?.match(/add-button/)) {
            if (setClickFlag) setClickFlag(true);
            handleClick();
          }
        }}
        onMouseEnter={() => setMouseenter(true)}
        onMouseLeave={() => setMouseenter(false)}
      >
      </button>
      <Balloon
        isMouseenter={isMouseenter}
        isAdd={isAdd}
        buttonClass={buttonClass}
      />
    </div>
  )
}

export default Button
