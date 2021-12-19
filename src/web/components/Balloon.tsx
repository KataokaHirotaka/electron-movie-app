import React from 'react'

type Props = {
  isMouseenter: boolean;
  isAdd: boolean;
  buttonClass: string;
}

function Balloon({isMouseenter, isAdd, buttonClass}: Props) {
  return (
    <div className="balloon-wrapper" style={{display: isMouseenter ? 'block' : 'block'}}>
      <div id="balloon">
        {buttonClass==="add-button" && isAdd && '履歴に追加済'}
        {buttonClass==="add-button" && !isAdd && '履歴に追加'}
        {buttonClass==="delete-button" && '履歴から削除'}
        {buttonClass==="close-button" && '閉じる'}
      </div>
    </div>
  )
}

export default Balloon