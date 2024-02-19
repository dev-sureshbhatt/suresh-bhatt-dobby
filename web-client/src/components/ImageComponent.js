import React from 'react'

export default function ImageComponent({...image}) {

  return (
    <div>
        <h1>{image.title}</h1>
        <img src={`http://localhost:4000/${image.path}.${image.extension}`} /> 
    </div>
  )
}
