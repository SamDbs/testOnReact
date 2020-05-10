import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'


function Article(props) {
  const text = `marquer comme ${props.article.read ? 'non lu' : 'lu'}`
  const class_read = `${props.article.read ? '' : 'bg-light '}`

 
  
  return (
    <Card className={ "ml-2 mr-2 mb-1 p-3 " + (class_read)}>
      <div className="d-flex">
        <p className="h5">{props.article.title}</p>
        <p className="h6">{props.article.pub}</p>
      </div>
      <p className="h6">{props.article.summary}</p>
      <Button onClick={() => props.modifyRead(props.article.id, !props.article.read)}>
        {text}
      </Button>
    </Card>
  )
}

export default Article
