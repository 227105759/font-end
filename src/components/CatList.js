import React, { useState, useEffect } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { firestore } from "../firebase";
import NewAlbumForm from "./NewAlbumForm";
import Album from "./Album";
import ListHome from "./ListHome";



export default function CatList() {
    const [albums, setAlbums] = useState([])
    //const db = firestore()

    useEffect(() => {
        firestore.collection('albums').onSnapshot((snapshot) =>{
            const tempAlbums = []
            snapshot.forEach(doc =>{
                tempAlbums.push({...doc.data(), id: doc.id});
            })
            setAlbums(tempAlbums)
        })

    }, [])

  return (
    <>
      <Routes>
          <Route exact path="/" render={() => <ListHome albums={albums}/>} />
          <Route path='/album' Component={Album} />
      </Routes>

    </>
  );
}

