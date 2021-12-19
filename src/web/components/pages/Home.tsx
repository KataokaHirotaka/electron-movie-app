import React, { useState, useEffect, createContext } from 'react'
import { Header, Results } from './../index';
import { db } from './../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';


export const HomeContext = createContext<React.Dispatch<React.SetStateAction<string>>[]>([]);

function Home() {
  
  type FirestoreData = {
    title: string[];
    posterPath: string[];
    comment: string[];
    dataId: string[];
  }
  const [firestoreData, setFirestoreData] = useState<FirestoreData>({
    title: [],
    posterPath: [],
    comment: [],
    dataId: []
  });

  const [dataId, setDataId] = useState(''); //firestoreのデータID
  useEffect(() => {
    // firestoreからデータを削除する
    const deleteFirestoreData = () => {
      if (dataId.length) {
        deleteDoc(doc(db, 'history', dataId)); //firestoreからデータを削除
        // 削除する映画データの表示を画面から削除
        const movieContent = document.getElementById(dataId);
        movieContent?.remove();
      }
    }
    deleteFirestoreData();
  }, [dataId]);
  

  const homeContextArray = [setDataId]; //HomeContextに渡すデータ
  

  // firestoreからデータを取得する
  useEffect(() => {
    const getFirestoreData = async () => {
      const querySnapshot = await getDocs(collection(db, 'history'));
      let titleArray: string[] = [];
      let posterPathArray: string[] = [];
      let commentArray: string[] = [];
      let dataIdArray: string[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        titleArray.push(data.title);
        posterPathArray.push(data.posterPath);
        commentArray.push(data.comment);
        dataIdArray.push(doc.id)
      });
      setFirestoreData({
        title: titleArray,
        posterPath: posterPathArray,
        comment: commentArray,
        dataId: dataIdArray
      });
    }
    getFirestoreData();

  }, []);

  return (
    <div>
      <Header />
      <HomeContext.Provider value={homeContextArray}>
        <Results
          id={'home'}
          titleArray={firestoreData.title}
          posterPathArray={firestoreData.posterPath}
          overviewArray={null}
          commentArray={firestoreData.comment}
          dataIdArray={firestoreData.dataId}
          setIsLoading={null}
          isLoading={null}
        />
      </HomeContext.Provider>
      
    </div>
  )
}

export default Home;
