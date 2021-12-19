import React from 'react';
import { Button } from './index';

type MovieData = {
  title: string | undefined;
  posterPath: string | null | undefined;
  comment: string | undefined;
  dataId: string | null
}
type Props = {
  movieData: MovieData;
  hoverFlag: boolean;
}

function Card({movieData, hoverFlag}: Props) {
  const posterPath = movieData.posterPath;
  const title = movieData.title;
  const dataId = movieData.dataId;


  return (
    <div className="movie-card" style={{display: hoverFlag ? 'block' : 'none'}}>
      <div className="movie-poster-wrapper">
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w154${posterPath}`}
          alt="" 
        />
      </div>
      <div className="movie-card-bottom">
        <Button buttonClass='add-buton' setClickFlag={null}/>
        <Button buttonClass='detail-button' setClickFlag={null} />
      </div>
    </div>
  )
}

export default Card
