import React from 'react'
import { useState } from 'react';
import './style/Form.css';

type Props = {
  setMovie: React.Dispatch<React.SetStateAction<string>>;
  movie: string;
  getMovieData: () => void;
}

function Form({setMovie, movie, getMovieData }: Props) {
  const [changeFlag, setChangeFlag] = useState(false);
  const clearText = () => {
    setMovie('');
  };
  // const [clearFlag, setClearFlag] = useState(false);
  // const clearMovieData = () => {
  //   const search = document.getElementById('search');
  //   if (search) search.style.display = 'none';
  //   setClearFlag(true);
  // }

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
          // clearMovieData();
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