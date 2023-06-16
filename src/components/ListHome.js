import React from "react";
import { Routes } from "react-router";
import NewAlbumForm from "./NewAlbumForm";


export default function ListHome(albums) {
  return (
    <>
      <section>
        {albums.map((album) => (
          <Routes to={`/${album.id}`}>
            <aside key={album.name}>
              <img src={album.image} alt="album" />
              <h3>{album.name}</h3>
            </aside>
          </Routes>
        ))}
      </section>
      <footer>
        <NewAlbumForm />
      </footer>
    </>
  );
}
