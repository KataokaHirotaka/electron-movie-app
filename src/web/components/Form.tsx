import React from 'react'
import { useState } from 'react';
import './style/Form.css';

type Props = {
  setMovie: React.Dispatch<React.SetStateAction<string>>;
  movie: string;
  getMovieData: () => void;
  clearFlag: boolean;
  setClearFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form({setMovie, movie, getMovieData, setClearFlag, clearFlag }: Props) {
  const [changeFlag, setChangeFlag] = useState(false);
  const clearText = () => {setMovie('')};

  return (
    <form className="search-container">
      <div className="search-box">
        <input
          type="text"
          id="searchInput"
          placeholder="タイトル"
          value={movie}
          onChange={e => {
            setMovie(e.target.value);
            setChangeFlag(true);
          }}
        />
      </div>
      <div
        className="clear-button-wrapper"
        style={{display: changeFlag ? 'block' : 'none'}}
        onClick={() => {
          setChangeFlag(false);
          clearText();
        }}
      >
        <div className="search-clear-button"></div>
      </div>
      <div className="search-button-wrapper">
        <button
          className="search-button"
          onClick={e => {
            e.preventDefault();
            getMovieData();
          }}
        >
          検索
        </button>
      </div>
    </form>
  )
}

export default Form