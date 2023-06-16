//-----------------------------
// Date : 7/6
// Class : SignUp
// description : This page for the normal user to register their own account
//
//
//-----------------------------

import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { auth, createUserDocument, database, firestore } from "../firebase"


export default function SignupStaff() {
  const emailRef = useRef() //for checking the email
  const passwordRef = useRef()//for checking the password
  const passwordConfirmRef = useRef()// for checking the password correct or not
  const signUpCodeRef = useRef()// for checking the staff code corrent or not
  const displayNameRef = useRef()
  const { signup } = useAuth()// check the sign up state
  const [error, setError] = useState("")// if error has catehed
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const uType = "user"
  


  //function for the web page to handle the register request
  async function handleSubmit(e) {
    e.preventDefault()

    //if the password not same as the confirm password
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    if(signUpCodeRef.current.value !== '4553'){
        return setError("The sign up code not exits or not correct!!")
    }

    try {
      setError("")
      setLoading(true)
      //if sign up success
      //await signup(emailRef.current.value, passwordRef.current.value)
      const { user } = await auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
        
      //const {user} = await signup(emailRef.current.value, passwordRef.current.value)
      //await createUserDocument(emailRef.current.value,passwordRef.current.value,{displayName})
      const displayName = displayNameRef.current.value
      await createUserDocument(user, {displayName, uType});
      
      //setError( user.current.value)
      navigate("/login")
    } catch {
      setError("Failed to create accounr")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Staff Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="display-Name">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="string" ref={displayNameRef} required />
            </Form.Group>
            <Form.Group id="sign-up-code">
              <Form.Label>Staff Sign Up Code</Form.Label>
              <Form.Control type="string" ref={signUpCodeRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
        <br></br>
        user Register? <Link to="/signup">Sign up with user</Link>
      </div>
    </>
  )
}