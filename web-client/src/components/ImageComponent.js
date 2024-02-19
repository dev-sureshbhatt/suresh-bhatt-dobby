import React from 'react'
import './ImageComponent.css'
import { useState } from 'react'

export default function ImageComponent({...image}) {


  const [editTitle, setEditTitle] = useState(false)
  const [title, setTitle] = useState(image.title)

function handleEdit(){

  fetch('http://localhost:4000/images', {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify({'id': image._id, title}),
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => setEditTitle(false))
  .catch(err => alert('something went wrong'))



  console.log("I have to handle edits now for image", image._id)
  console.log("old title was", image.title, "new title is", title)
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
