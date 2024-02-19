import React from 'react'

export default function ImageComponent({...image}) {

  return (
    <div>
        <h1>{image.title}</h1>
        <img height="500px" width={"600px"} src={`http://localhost:4000/${image.path}.${image.extension}`} /> 
    </div>
  )
}
