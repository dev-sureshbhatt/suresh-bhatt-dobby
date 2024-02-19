import React from 'react'
import './ImageComponent.css'
import { useState } from 'react'

export default function ImageComponent({...image}) {


  const [editTitle, setEditTitle] = useState(false)
  const [title, setTitle] = useState(image.title)

function handleEdit(){
  console.log("I have to handle edits now")
}



  return (
    <div className='image-component-container'>
        <h1>{title}</h1>
        
        {editTitle && <input value={title} onChange={(ev)=>{setTitle(ev.target.value)}}></input>}
        {editTitle ? (<button onClick={handleEdit}>Save</button>) : (<button onClick={ev => setEditTitle(true)}>Edit Title</button>) }
        <img height="500px" width={"600px"} src={`http://localhost:4000/${image.path}.${image.extension}`} /> 
    </div>
  )
}
