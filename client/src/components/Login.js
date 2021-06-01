import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

export default function Login({ onIdSubmit, onUsernameSubmit }) {
  const idRef = useRef()
  const usernameRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    onIdSubmit(idRef.current.value)
    onUsernameSubmit(usernameRef.current.value)
  }

  function createNewId() {
    onIdSubmit(uuidV4())
  }

  return (
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} placeholder='Generate your Id' required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter Your Username</Form.Label>
          <Form.Control type="text" ref={usernameRef} required />
        </Form.Group>
        <Button type="submit" className="mr-2">Login</Button>
        <Button onClick={createNewId} variant="secondary"  >Generate random Id</Button>
      </Form>
    </Container>
  )
}
