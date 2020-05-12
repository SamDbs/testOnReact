import React, { useState, useEffect } from 'react'
import { Card, Pagination } from 'react-bootstrap'
import Article from './Article'

function Flux(props) {
  const [articles, setArticles] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const artsPerPage = 5

  const modifyRead = async (articleId, read) => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const appel = await fetch(
      'http://localhost:3000/articles/' + articleId + '?change=' + read,
      {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify({
          read: read,
        }),
      },
    )

    const response = await fetch(
      'http://localhost:3000/articles?flux_id=' + props.flux.id,
      {
        method: 'GET',
        headers: myHeaders,
      },
    ).then((response) => response.json())

    setArticles(response)
  }

  useEffect(() => {
    async function call() {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      const response = await fetch(
        'http://localhost:3000/articles?flux_id=' + props.flux.id,
        {
          method: 'GET',
          headers: myHeaders,
        },
      ).then((response) => response.json())

      setArticles(response)

      setInterval(async () => {
        const response = await fetch(
          'http://localhost:3000/articles?flux_id=' + props.flux.id,
          {
            method: 'GET',
            headers: myHeaders,
          },
        ).then((response) => response.json())

        setArticles(response)
      }, 50000)
    }
    call()
  }, [props.flux.id])

  // Get current articles

  const indexOfLastArticle = currentPage * artsPerPage
  const indexofFirstArticle = indexOfLastArticle - artsPerPage
  const currentArts = articles.slice(indexofFirstArticle, indexOfLastArticle)

  const paginationItems = [];
  const nbPages = articles.length /artsPerPage


  
  for(let i=0; i< nbPages;i++){ 
  paginationItems.push(<Pagination.Item active={i+1 === currentPage} key={i} onClick={() => setCurrentPage(i+1)}>{i+1}</Pagination.Item>)
  }
  return (
    
      <Card
        className="ml-4 mb-4 border border-dark "
        style={{ width: '35rem' }}
      >
        <h3 className="border border-dark p-2">
          {' '}
          Les news de {props.flux.title}
        </h3>
        <div className="pt-3 pb-3">
          {currentArts.map((elem) => (
            <Article key={elem.id} article={elem} modifyRead={modifyRead} />
          ))}
        </div>
        
        <Pagination className="justify-content-center">
            {paginationItems}
        </Pagination>
      </Card>
  )
}

export default Flux
