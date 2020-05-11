import React, { useState, useEffect } from 'react'
import FormFlux from './components/FormFlux'
import Flux from './components/Flux'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row } from 'react-bootstrap'

function App() {
  const [fluxs, setFluxs] = useState([])

  useEffect(() => {
    async function call() {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      const response = await fetch('http://localhost:3000/fluxs', {
        method: 'GET',
        headers: myHeaders,
      }).then((response) => response.json())

      setFluxs(response)
    }
    call()
  }, [])

  return (
    <div className="App">
      <FormFlux />
      <Container fluid>
        <Row>
          {fluxs.map((elem) => (
            <Flux key={elem.id} flux={elem} />
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default App
