import React,{ useState, useEffect } from 'react';
import './style/Modal.css';
import { Button } from './index';
import { db } from './firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  movieTitle: string | undefined;
  posterPath: string | null | undefined;
}

function Modal({showModal, setShowModal, movieTitle, posterPath}: Props) {
  const [clickFlag, setClickFlag] = useState(false);
  const closeModal = () => {
    document.body.classList.remove('modalOpner');
    setShowModal(false);
    setClickFlag(false);
  }

  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    const historyRef = collection(db, 'history');
    type ToFirestoreData = {
      title: string | undefined;
      posterPath: string | null | undefined,
      commment: string | undefined;
    }
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
  }, [clickFlag])

  const addButton = 'add-button';
  return (
    <>
      {showModal ? (
        <div id="overlay" onClick={() => closeModal()}>
          <div id="modalContent" onClick={e => e.stopPropagation()}>
            <div className="movie-card">
              {posterPath && <img src={posterPath} alt="" />}
              {movieTitle && <p>{movieTitle}</p>}
              <input type="text" onChange={e => setComment(e.target.value)}/>
              <Button buttonClass="add-button" setClickFlag={setClickFlag} />
            </div>
          </div>
        </div>  
      ) : (
        <></>
      )}
    </>
    
  )
}

export default Modal
