import React, { useRef, useState, useEffect } from "react";
import { useResolvedPath } from "react-router";
import { firestore } from "../firebase";
import NewPhoto from "./NewPhoto";


export default function Album() {
  const [images, setImage] = useState([]);

  const match = useResolvedPath("").album;
  const { album } = match.params;

  useEffect(() => {
    firestore.collection("albums").doc(album).onSnapshot((doc) => {
        setImage(doc.data().photos || [])
      });
  }, []);

  return (
    <>
      <section>
        {images.map((image) => (
          <aside key={image.name}>
            <img src={image.image} alt="album" />
          </aside>
        ))}
      </section>
      <footer>
        <NewPhoto currentAlbum="" />
      </footer>
    </>
  );
}
