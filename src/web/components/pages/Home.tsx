import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Header, Results } from './../index';
import { db } from './../firebase';
import { onSnapshot, collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore';

function Home() {
  type FirestoreData = {
    title: string[];
    posterPath: string[];
  }
  const [firestoreData, setFirestoreData] = useState<FirestoreData>({
    title: [],
    posterPath: []
  });
  // firestoreからデータを取得する
  useEffect(() => {
    const getFirestoreData = async () => {
      const querySnapshot = await getDocs(collection(db, 'history'));
      let titleArray: string[] = [];
      let posterPathArray: string[] = [];
      querySnapshot.forEach(doc => {
        const title = doc.data().title;
        const posterPath = doc.data().posterPath;
        titleArray.push(title);
        posterPathArray.push(posterPath);
      });
      setFirestoreData({
        title: titleArray,
        posterPath: posterPathArray
      });
    }
    getFirestoreData();

  }, []);

  return (
    <div>
      <Header />
      <Results id={'home'} titleArray={firestoreData.title} posterPathArray={firestoreData.posterPath}/>
    </div>
  )
}

export default Home;
