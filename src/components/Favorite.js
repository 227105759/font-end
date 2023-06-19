import React from "react";
import { useState, useEffect } from "react";
import { firestore, setDoc } from "../firebase";
import firebase from "firebase/compat/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useLocation } from "react-router";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";

export default function Favorite() {
  const location = useLocation();
  const navigate = useNavigate();
  const catData = location.state.cat;
  const [title, setTitle] = useState(""); //cat name
  const [age, setAge] = useState("");
  const [id, setId] = useState("");
  const [images, setImages] = useState("");


  const [catInfo, setcatInfo] = useState({
    title: "",
    age: "",
  });
  const onChangeValue = (e) => {
    setcatInfo({
      ...catInfo,
      [e.target.name]: e.target.value,
    });
  };

  //----------------------------------------------------------
  const [isfile, setFile] = useState(null);
  const handleImageAsFile = (e) => {
    setFile(e.target.files[0]);
  };

  {
    /* Insert ------------------------------------------- */
  }
  const addlist = async (event) => {
    try {
      event.preventDefault();
      let file = isfile;
      firestore.collection("favorite").add({
        title: catData.title,
        age: catData.age,
      });
      setcatInfo({
        ...catData,
        title: "",
      });
      setFile(null);
      navigate("/cat-backend");
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="App">
        <h1> Cat List </h1>
        <div className="wrapper">
          <Avatar
            alt="Image Preview"
            src={catData.images}
            sx={{ width: 128, height: 128, marginTop: 2 }}
          />
          {/* Insert users -------------------------------------------*/}
          <form onSubmit={addlist}>
            <input
              type="text"
              id="title"
              name="title"
              value={catData.title}
              onChange={onChangeValue}
              placeholder=" Title "
              required
            />
            <input
              type="number"
              id="age"
              name="age"
              value={catData.age}
              onChange={onChangeValue}
              placeholder=" Age "
              required
            />
            <button type="submit" className="btn__default btn__add"> Sure to like it ?
            </button>
          </form>
        </div>
        {/* Fetch users ------------------------------------------------*/}
      </div>
    </>
  );
}
