import React from "react";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

export default function CatEdit() {
  const location = useLocation();
  const catData = location.state.cat;
  const [title, setTitle] = useState(""); //cat name
  const [age, setAge] = useState("");
  const [id, setId] = useState("");
  const [images, setImages] = useState("");
  console.log(catData.id);

  //edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCatData = {
      title: title,
      age: age,
    };

    const response = await fetch(`http://localhost:3001/api/cats/${catData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCatData),
      });

    if (response.ok) {
        console.log("success");
    } else {
      console.log(updatedCatData);
      console.error("Failed to update cat data");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Avatar
          alt="Image Preview"
          src={catData.images}
          sx={{ width: 128, height: 128, marginTop: 2 }}
        />

        <TextField
          id="standard-basic"
          label="name"
          variant="standard"
          defaultValue={catData.title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          id="standard-basic"
          label="age"
          variant="standard"
          defaultValue={catData.age}
          onChange={(event) => setAge(event.target.value)}
        />
        <Button variant="contained" type="submit">
          change
        </Button>
      </div>
    </form>
  );
}
