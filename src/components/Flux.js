import React, { useState } from 'react'
import { Card } from 'react-bootstrap'

function Flux(props) {
  return (
    <Card className="ml-4 mb-4 border border-dark " style={{ width: '30rem' }}>
      <h1>{props.flux.title}</h1>
    </Card>
  )
}

export default Flux
