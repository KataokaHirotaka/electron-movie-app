import React,{ useState, useEffect, useContext } from 'react';
import './style/Modal.css';
import { Button } from './index';
import { db } from './firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { HomeContext } from './pages/Home';

type MovieData = {
  title: string | undefined;
  posterPath: string | null | undefined;
  overview: string | undefined;
  comment: string | undefined;
  dataId: string | null
}

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setClickFlag: React.Dispatch<React.SetStateAction<boolean>>;
  clickFlag: boolean;
  movieData: MovieData;
  id: string;
}

function Modal({showModal, setShowModal, setClickFlag, clickFlag, movieData, id}: Props) {
  const homeContext = useContext(HomeContext);
  const setDataId = homeContext[0]; //Home.tsxのdataIdを設定する
  
  const posterPath = movieData.posterPath;
  const movieTitle = movieData.title;
  const overview = movieData.overview;
  const getComment = movieData.comment;
  const dataId = movieData.dataId; //firestoreのデータID
  // const [clickFlag, setClickFlag] = useState(false);
  const closeModal = () => {
    document.body.classList.remove('modalOpner');
    setShowModal(false);
    setClickFlag(false);
  }

  const [comment, setComment] = useState<string>(''); // メモ用のcomment変数

  useEffect(() => {
    const historyRef = collection(db, 'history');
    // firestoreにデータを登録
    const setDataToFirestore = (title: string | undefined, posterPath: string | null | undefined, comment: string | undefined): void => {
      setDoc(doc(historyRef), {
        title: title,
        posterPath: posterPath,
        comment: comment
      });
    }
    // 保存ボタンをクリックされた時にデータベースに登録
    if (clickFlag) {
      setDataToFirestore(movieTitle, posterPath, comment);
    }
  }, [clickFlag]);

  return (
    <>
      {showModal &&
        <div id="overlay" onClick={closeModal}>
          <div id="modalContent" onClick={e => e.stopPropagation()}>
            <div className="movie-card">
              {posterPath && <img className="movie-poster" src={posterPath} />}
              {movieTitle && <p>{movieTitle}</p>}
              {id === 'search' && <p>{overview}</p>}
              {id === 'search'
                ? <input
                    type="text"
                    className="comment"
                    placeholder="メモを入力する"
                    onChange={e => setComment(e.target.value)} 
                  />
                : <p className="movie-comment">{getComment}</p>
              }
              {id === 'search'
                ? 
                <div className="add-button-wrapper">
                  <Button buttonClass="add-button" setClickFlag={setClickFlag} />
                </div>
                :
                <div
                  className="delete-button-wrapper"
                  onClick={() => {
                    if (dataId?.length) setDataId(dataId)
                    closeModal();
                  }
                }>
                  <Button buttonClass="delete-button" setClickFlag={setClickFlag} />
                </div>
              }
            </div>
            <div className="close-button-wrapper" onClick={closeModal}>
              <Button buttonClass="close-button" setClickFlag={setClickFlag} />
            </div>
          </div>
        </div>  
      }
    </>
  )
}

export default Modal
