
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom"

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

  async function handelLogout() {
    setError('')

    try{
        await logout()
        navigate("/login")
    }catch{
        setError('Failed to log out')
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/*show the user current email */}
          <strong>Email: </strong>{currentUser.email}
          <Link to ="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
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
