import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function UploadImage() {

const [files, setFiles] = useState([])
const [uploadedImages, setUploadedImages] = useState([])
const [redirect, setRedirect] = useState(false)

function handleSubmit(ev){
    ev.preventDefault()
    setUploadedImages(files)


    const data = new FormData
        // Append each file separately
        for (let i = 0; i < files.length; i++) {
            data.append("files", files[i]);
        }

    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: data,
      credentials: "include"
    })
    .then((response)=>{

      response.json().then((msg)=>{alert(msg.msg); setRedirect(true)}).catch(err => alert("something went wrong, please try again"))
    })
    .catch(err => alert("something went wrong, please try again"))
    

}



  if (redirect) {
    return (
      <Navigate to={'/images'} />
    )
  }


  return (
    <form onSubmit={handleSubmit}>
        <input 
          type='file'
          multiple
          required
          onChange={(ev)=>{setFiles(ev.target.files)}}></input>
        <button>Upload Images</button>

    </form>
  )
}

export default UploadImage