//-----------------------------
// Date : 7/6
// Class : SignUp
//
//
//
//-----------------------------

import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { auth, createUserDocument, database } from "../firebase"

export default function Signup() {
  const emailRef = useRef() //for checking the email
  const passwordRef = useRef()//for checking the password
  const passwordConfirmRef = useRef()// for checking the password correct or not
  const { signup } = useAuth()// check the sign up state
  const [error, setError] = useState("")// if error has catehed
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const displayName = "no"


  //function for the web page to handle the register request
  async function handleSubmit(e) {
    e.preventDefault()

    //if the password not same as the confirm password
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
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
      await createUserDocument(user, {displayName});
      
      //setError( user.current.value)
      //navigate("/login")
    } catch {
      setError("Failed to create accounr")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}