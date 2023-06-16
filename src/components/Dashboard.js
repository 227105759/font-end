import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const cEmail = currentUser.email;

  async function handelLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }


  const Getdata = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${cEmail}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(()=>{
   // Getdata();
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/*show the user current email */}
          <strong>Email: </strong>{cEmail}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handelLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
