import React from "react";
import { useState, useEffect } from "react";
import { firestore, setDoc, auth } from "../firebase";
import firebase from "firebase/compat/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function CatBackend() {
  const [isUsers, setUsers] = useState([]);
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();
  const [catData, setCatData] = useState([]);
  const [title, setTitle] = useState(""); //cat name
  const [age, setAge] = useState("");
  const [images, setImages] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [cid, setCid] = useState("");
  const userId = auth.currentUser.uid; //get current user data
  const [userData, setUserData] = useState(null); // set the current user data
  const [uType, setuType] = useState("");

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

  useState(() => {
    firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log(userData);
          setUserData(userData);
          setuType(userData.uType);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  });

  //show cat list
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

  //add new cat
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

  //edit
  useEffect(() => {
    fetchCatData();
  }, []);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //add fav
  const handleFavorite = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("cid", cid);

    try {
      const response = await fetch("http://localhost:3001/api/add-favorite", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Cat added:", data.catId);

        // Reset the form fields
        setCid();
      } else {
        console.error("Error adding cat with respond");
      }
    } catch (error) {
      console.error("Error adding cat:", error);
    }
  };

  //delete
  const handleDelete = async (cid) => {
    const response = await fetch(`http://localhost:3001/api/cats/${cid}`, {
      method: "DELETE",
      headers: {},
    });
    if (response.ok) {
      setCatData(catData.filter((cat) => cat.id !== cid));
    } else {
       //Handle error
    }
  };

  const handleEdit = (cat) => {
    navigate("/catEdit", { state: { cat: cat } });
  };

  if (uType === "staff") {
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
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia />
              <CardContent>
                <img src={items.images} alt="" height="200" width="200" />
                <Typography variant="body2" color="text.secondary">
                  <b> Name : </b> {items.title}
                </Typography>
                <b> Age : </b> {items.age}
              </CardContent>
              <CardActions disableSpacing>
                <form onSubmit={handleFavorite}>
                  <TextField
                    id="outlined-password-input"
                    label="Cat Name"
                    type="text"
                    value={items.id}
                    onChange={(event) => setCid(event.target.value)}
                  />
                  <IconButton aria-label="add to favorites" type="submit">
                    <FavoriteIcon />
                  </IconButton>
                </form>
              </CardActions>
            </Card>
            <button onClick={() => handleEdit(items)}>Edit</button>
            <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(items.id)}
          >
            Delete
          </Button>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        {imagePreview && (
          <Avatar
            alt="Image Preview"
            src={imagePreview}
            sx={{ width: 128, height: 128, marginTop: 2 }}
          />
        )}
        {catData.map((items) => (
          <div key={items.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia />
              <CardContent>
                <img src={items.images} alt="" height="200" width="200" />
                <Typography variant="body2" color="text.secondary">
                  <b> Name : </b> {items.title}
                </Typography>
                <b> Age : </b> {items.age}
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" type="submit">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </>
    );
  }
}
