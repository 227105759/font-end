import React, { useState } from "react";
import { firestore } from "../firebase";

export default function NewAlbumForm() {
  const [albumName, setAlbumName] = useState("");

  const onAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const onAlbumCreate = () => {
    if(!albumName){
        return
    }
    firestore.collection("albums").doc(albumName).set({
        name: albumName,
    })
    setAlbumName("")
  };


  return (
    <>
      <input value={albumName} onChange={onAlbumNameChange} type="text" />
      <button onClick={onAlbumCreate}>Create album</button>
    </>
  );
}
