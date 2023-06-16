import React, { useState, useEffect, useInsertionEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import { getDatabase, ref, child, get } from "firebase/database";
import { auth, firestore } from "../firebase";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const cEmail = currentUser.email;
  const userId = auth.currentUser.uid; //get current user data
  const [userData, setUserData] = useState(null);// set the current user data

  //for get the current data
  useState(() => {
    firestore.collection("users").doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log(userData);
          setUserData(userData);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  });

  async function handelLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const location = useLocation();
  // console.log(location.state.uid)

  if (true) {
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {/*show the user current email */}
            <strong>Email: </strong>
            {cEmail}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
            123: {userId}
              {userData ? (
                <div>
                  <p>{userData.displayName}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
          </Card.Body>
        </Card>
  
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handelLogout}>
            Log Out
          </Button>
        </div>
      </>
    );
  } else {
    
  }

}
