import React, { useState } from 'react'

function UploadImage() {

    const [files, setFiles] = useState([])

function handleSubmit(ev){
    ev.preventDefault()


    const data = new FormData
        // Append each file separately
        for (let i = 0; i < files.length; i++) {
            data.append("files", files[i]);
        }

    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: data
    })
    console.log(files)

}




  return (
    <form onSubmit={handleSubmit}>
        <input 
          type='file'
          multiple
          onChange={(ev)=>{setFiles(ev.target.files)}}></input>
        <button>Upload Images</button>
    </form>
  )
}

export default UploadImage