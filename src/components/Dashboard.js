import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const cEmail = currentUser.email;
  const userId = auth.currentUser.uid; //get current user data
  const [userData, setUserData] = useState(null);// set the current user data
  const [uType, setuType]  = useState('');


  //for get the current data
  useState(() => {
    firestore.collection("users").doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log(userData);
          setUserData(userData);
          setuType(userData.displayName);
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

  //if is normal user 
  if (uType === "user") {
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
            {/*uType*/}
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
    // if is the staff account
    return(
      <div>
        staff

        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handelLogout}>
            Log Out
          </Button>
        </div>
     </div>
    )
  }

}
