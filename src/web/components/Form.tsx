import React from 'react'
import { useState } from 'react';
import './style/Form.css';

type Props = {
  setMovie: React.Dispatch<React.SetStateAction<string>>,
  movie: string,
  getMovieData: () => void
}

function Form({setMovie, movie, getMovieData}: Props) {

  return (
    <form>
      <div className="search-box">
        <input
          type="text"
          placeholder="タイトル"
          onChange={e => setMovie(e.target.value)}
        />
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
