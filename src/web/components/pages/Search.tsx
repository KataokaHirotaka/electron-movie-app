import React from 'react'
import { Header, Form, Results } from '../index';
import { useState, createContext } from 'react';
import axios from 'axios';

export const SearchContext = createContext([]);

function Search() {
  type movieDataType = {
    title: string[];
    posterPath: string[];
    overview: string[];
  }
  const API_KEY = '0965bb0b2ed4a6b448e51c23934b8931' // TMDB(映画データベース）のAPIキー
  const [movie, setMovie] = useState<string>('');
  const [movieData, setMovieData] = useState<movieDataType>({
    title: [],
    posterPath: [],
    overview: []
  });
  const [isLoading, setIsLoading] = useState(false); // ローディング画面用のstate

  // 取得したデータを配列にする
  const createDataArray = (res: any, array1: string[], array2: string[], array3: string[]) => {
    const dataLength = res.data.results.length;
    for (let i = 0; i < dataLength; i++) {
      const data = res.data;
      const title = data.results[i].title;
      const posterPath = data.results[i].poster_path;
      const overview = data.results[i].overview;
      array1.push(title);
      array2.push(posterPath);
      array3.push(overview);
    }
  }

  // TMDB(映画データベース)から映画のデータを取得
  const getMovieData = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ja-JP&query=${movie}&page=1`)
    .then(res => {
      setIsLoading(true);
      // タイトルとポスター画像パスの配列を作成
      let titleArray: string[] = [];
      let posterPathArray: string[] = [];
      let overviewArray: string[] = [];
      createDataArray(res, titleArray, posterPathArray, overviewArray);
      setMovieData({
        title: titleArray,
        posterPath: posterPathArray,
        overview: overviewArray
      });
      setTimeout(() => {setIsLoading(false)}, 800)
      return;
    })
    .catch(err => {
      console.log(err);
      return;
    })
  }

  return (
    <div className="search-content">
      <Header />
      <Form
        setMovie={setMovie}
        movie={movie} 
        getMovieData={getMovieData}
      />
      <Results
        id={'search'}
        titleArray={movieData.title}
        posterPathArray={movieData.posterPath}
        overviewArray={movieData.overview}
        commentArray={undefined}
        dataIdArray={null}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Search;