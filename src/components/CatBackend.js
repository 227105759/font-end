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
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function CatBackend() {
  const [isUsers, setUsers] = useState([]);
  const [catData, setCatData] = useState([]);
  const [title, setTitle] = useState(""); //cat name
  const [age, setAge] = useState("");
  const [images, setImages] = useState("");

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const fetchCatData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/cats`);
      const data = await response.json();
      console.log(data);
      setCatData(data);
      console.log(catData);
    } catch (error) {
      console.error("Error fetching fontend cat data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("age", age);
    formData.append("images", images);

    try {
      const response = await fetch("http://localhost:3001/api/add-cat", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Cat added:", data.catId);

        // Reset the form fields
        setAge("");
        setTitle("");
        setImages("");
      } else {
        console.error("Error adding cat with respond");
      }
    } catch (error) {
      console.error("Error adding cat:", error);
    }
  };

  useEffect(() => {
    fetchCatData();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit}>
        Cat Image
        <input
          type="file"
          onChange={(event) => {
            setImages(event.target.files[0]);
            handleImageChange(event);
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Cat Name"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Cat Age"
          type="number"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </form>

      {imagePreview && (
        <Avatar
          alt="Image Preview"
          src={imagePreview}
          sx={{ width: 128, height: 128, marginTop: 2 }}
        />
      )}
      {catData.map((items) => (
        <div key={items.id}>
          <div className="wrapper__list">
            <p>
              <b> Id : </b> {items.id}
            </p>
            <p>
              <b> Age : </b> {items.age}
            </p>
            <img src={items.images} alt="" />
          </div>
        </div>
      ))}
    </>
  );
}
