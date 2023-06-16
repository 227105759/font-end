import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Login() {
  const emailRef = useRef(); //for checking the email
  const passwordRef = useRef(); //for checking the password
  const { login } = useAuth(); // check and change the log on state
  const [error, setError] = useState(""); // if error has catehed
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // function from 'react-router-dom' to change page
  const [userData, setUserData] = useState(null); // set the current user data


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SignIn = () => {
    const [signInWithEmailAndPassword, user, loading, error] =
      useSignInWithEmailAndPassword(auth);
      console.log()
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }



  //const userRef = firestore.doc(`users/${emailRef.uid}`);

  //function for the web page to handel the loginrequest
  async function handleSubmit(e) {
    e.preventDefault();
    //for get the current data
    try {
      //when error has catched will change
      setError("");
      setLoading(true);
      //if login success
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);


  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>

      <Link to="/catlist">List</Link>
      <Link to="/login-google">google</Link>
      <Link to="/cat-backend">backend</Link>

    </>
  );
}
