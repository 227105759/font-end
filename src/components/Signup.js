//-----------------------------
// Date : 7/6
// Class : SignUp
//
//
//
//-----------------------------

import React, { useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext"

export default function Signup() {
  //Create Ref
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {Signup} = useAuth()

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            {/* Email input*/}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              {/* Password input*/}
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              {/* confirm password input*/}
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {/* change page*/}
      <div className="w-100 text-center mt-2">Already have account? Log in</div>
    </>
  );
}
