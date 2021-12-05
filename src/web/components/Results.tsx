import React, { useState } from 'react'
import { Modal } from './index';
import './style/Results.css';

type Props = {
  titleArray: string[];
  posterPathArray: string[];
  id: string;
}

function Results({titleArray, posterPathArray, id}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    document.body.classList.add('modalOpner');
    setShowModal(true);
  }
  const [movieTitle, setMovieTitle] = useState<string | undefined>('');
  const [posterPath, setPosterPath] = useState<string | null | undefined>('');
  return (
    <>
      <div className="content-wrapper" id={id}>
        {
          // 取得した映画データを表示
          titleArray.map((title, i) => {
            const posterPath = posterPathArray[i];
            return (
              <div
                className="content"
                onClick={(e) => {
                  const target = e.currentTarget;
                  const poster = target.querySelector('img');
                  const title = target.querySelector('p')?.innerText;
                  const posterPath = poster?.getAttribute('src');
                  setPosterPath(posterPath);
                  setMovieTitle(title);
                  openModal();
                }}
              >
                <img className="movie-poster" src={`https://image.tmdb.org/t/p/w154${posterPath}`} alt="" />
                {/* homeページの時はタイトルを載せない */}
                {id === 'search' && <p className="movie-title">{title}</p>}
              </div>

            )
          })
        }
        {/* 選択した映画をモーダルで表示、そこに保存ボタンを作成 */}
        <Modal showModal={showModal} setShowModal={setShowModal} movieTitle={movieTitle} posterPath={posterPath}/>
      </div>
    </>
  )
}

export default Results
