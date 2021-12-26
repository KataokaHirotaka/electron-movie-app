import React, { useState } from 'react'
import { Modal, Skelton } from './index';
import './style/Results.css';

type Props = {
  titleArray: string[];
  posterPathArray: string[];
  overviewArray: string[] | null;
  commentArray: string[] | undefined;
  dataIdArray: string[] | null; //firestoreのID,検索画面ではidはないのでnull
  id: string; // bodyに付与するID
  isLoading: boolean | null;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null;
}

function Results({titleArray, posterPathArray, overviewArray, commentArray, dataIdArray, id, isLoading, setIsLoading}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    document.body.classList.add('modalOpner');
    setShowModal(true);
  };
  const [clickFlag, setClickFlag] = useState(false);

  // モーダルに表示するための映画情報
  type MovieData = {
    title: string | undefined;
    posterPath: string | null | undefined;
    overview: string | undefined;
    comment: string | undefined;
    dataId: string | null;
  }
  const [movieData, setMovieData] = useState<MovieData>({
    title: '',
    posterPath: '',
    overview: '',
    comment: '',
    dataId: ''
  });
  
  window.addEventListener('DOMConetntLoaded', () => {
    if (setIsLoading) setTimeout(() => {setIsLoading(false)}, 800)
  });
  
  return (
    <>
      <div className="content-wrapper" id={id}>
        {
          id === 'search' && titleArray.length === 0 && isLoading && (
            <div className="noContent-wrapper" style={{margin: '50px auto 0 auto'}}>
              <p>検索結果は見つかりませんでした。</p>
              <img src={'./img/no_img_2.jpeg'} alt="" />
            </div>
          )
        }
        {
          // 取得した映画データを表示
          titleArray.map((title, i) => {
            let posterPath = posterPathArray[i];
            if (posterPath === null) posterPath = './img/no_image.png';
            else posterPath = `https://image.tmdb.org/t/p/w154${posterPath}`;
            // firestoreのデータIDの設定
            let dataId = '';
            if (dataIdArray?.length) dataId = dataIdArray[i];
            // データベースから取得したコメントの設定
            let getComment = '';
            if (commentArray?.length) getComment = commentArray[i];
            // データベースから取得した概要の設定
            let overview = '';
            if (overviewArray?.length) overview = overviewArray[i];
            
            return (
              <div
                className="content"
                id={dataId}
                onClick={e => {
                  const target = e.currentTarget;
                  const poster = target.querySelector('img');
                  const title = target.querySelector('.movie-title')?.innerHTML;
                  const posterPath = poster?.getAttribute('src');
                  const comment = target.querySelector('.movie-comment')?.innerHTML;
                  const overview = target.querySelector('.movie-overview')?.innerHTML;
                  const dataId = target.getAttribute('id');
                  setMovieData({
                    title: title,
                    posterPath: posterPath,
                    overview: overview,
                    comment: comment,
                    dataId: dataId
                  })
                }}
              >
                <div className="skelton-wrapper" style={{display: isLoading ? 'block' : 'none'}}>
                  <Skelton />
                </div>
                <img
                  className="movie-poster"
                  src={posterPath}
                  onClick={openModal}
                  onLoad={() => {
                    if (setIsLoading) {
                      // 1秒間スケルトンを表示するようにする
                      setTimeout(() => {setIsLoading(false);}, 1000);
                    }
                  }}
                  style={{display: isLoading ? 'none' : 'inline-block'}}
                />
                <p className="movie-title" style={{display: 'none'}}>{title}</p>
                {id === 'home' && <p className="movie-comment" style={{display: 'none'}}>{getComment}</p>}
                {id === 'search' && <p className="movie-overview" style={{display: 'none'}}>{overview}</p>}
              </div>
            )
          })
        }
        {/* 選択した映画をモーダルで表示、そこに保存ボタンを作成 */}
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          setClickFlag={setClickFlag}
          clickFlag={clickFlag}
          movieData={movieData}
          id={id}
        />
      </div>
    </>
  )
}

export default Results;