import React, { useState } from 'react'
import { Form, Button, Container, Row } from 'react-bootstrap'

function FormFlux() {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")


  async function fetchData(event) {
    event.preventDefault()

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const response = await fetch('http://localhost:3000/fluxs', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        title,
        url,
      }),
    })
    setTitle("")
    setUrl("")
  }

  return (
    <Container>
      <Row className="justify-content-end">
        <Form className="d-flex border border-dark col-8 p-3 m-3">
          <div className="flex-grow-1">
            <Form.Group controlId="fluxTitle">
              <Form.Control required type="text" value={title} placeholder="Titre du flux" onChange={(event)=> setTitle(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="fluxUrl">
              <Form.Control required type="text" value={url} placeholder="url du flux" onChange={(event)=> setUrl(event.target.value)} />
            </Form.Group>
          </div>
          <div className="align-self-end mb-3 ml-3">
            <Button
              onClick={fetchData}
              variant="btn btn-outline-dark"
              type="submit"
            >
              Ok
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  )
}

export default FormFlux
