import React from 'react'
import { Header, Form, Results } from '../index';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const MovieContext = createContext([]);

function Search() {
  type movieDataType = {
    title: string[];
    posterPath: string[];
  }
  const API_KEY = '0965bb0b2ed4a6b448e51c23934b8931' // TMDB(映画データベース）のAPIキー
  const [movie, setMovie] = useState<string>('');
  const [movieData, setMovieData] = useState<movieDataType>({
    title: [],
    posterPath: []
  })

  // 取得したデータを配列にする
  const createDataArray = (res: any, array1: string[], array2: string[]) => {
    const dataLength = res.data.results.length;
    for (let i = 0; i < dataLength; i++) {
      const title = res.data.results[i].title;
      const posterPath = res.data.results[i].poster_path;
      array1.push(title);
      array2.push(posterPath);
    }
  }

  // TMDB(映画データベース)から映画のデータを取得
  const getMovieData = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ja-JP&query=${movie}&page=1`)
    .then(res => {
      // タイトルとポスター画像パスの配列を作成
      let titleArray: string[] = [];
      let posterPathArray: string[] = [];
      createDataArray(res, titleArray, posterPathArray);
      setMovieData({
        title: titleArray,
        posterPath: posterPathArray
      });
      return;
    })
    .catch(err => {
      console.log(err);
      return;
    })
  }

  return (
    <>
      <Header />
      <Form setMovie={setMovie} movie={movie} getMovieData={getMovieData}/>
      <Results id={'search'} titleArray={movieData.title} posterPathArray={movieData.posterPath}/>
    </>
  )
}

export default Search
