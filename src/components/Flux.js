import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import Article from './Article'



function Flux(props) {
  const [articles, setArticles] = useState([])
  const [read, setRead] = useState("")

  const modifyRead = async (articleId,read) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const appel = await fetch('http://localhost:3000/articles/'+articleId+'?change=' + read, {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({
        read: read
      }),
    })

    const response = await fetch('http://localhost:3000/articles?flux_id=' + props.flux.id, {
      method: 'GET',
      headers: myHeaders,
    }).then((response) => response.json())

    setArticles(response)
  }


  useEffect(async () => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    window.setInterval(   
    const response = await fetch('http://localhost:3000/articles?flux_id=' + props.flux.id, {
      method: 'GET',
      headers: myHeaders,
    }).then((response) => response.json())


    setArticles(response), 15000)
  }, [])

  return (
    <Card className="ml-4 mb-4 border border-dark " style={{ width: '30rem' }}>
      <h1 className="border border-dark">{props.flux.title}</h1>

      {articles.map((elem) => (
        <Article key={elem.id} article={elem} modifyRead={modifyRead} />
      ))}
    </Card>
  )
}

export default Flux
