import React, { useEffect, useState } from 'react'
import ImageComponent from '../components/ImageComponent'

function Images() {

    const [images, setImages] = useState([{}])


    //for fetching all images when the page component mounts 
    useEffect(()=>{


        fetch('http://localhost:4000/images', {
            credentials: 'include' //for sending token to verify, authenticate and display get image belonging to the user
        }).then((response=>{

            if (response.status == 403) {
                alert("You seems to be not authorized, please register/login")
            }

        response.json().then((response) => {
            console.log(response)
            setImages(response)
        }).catch(err => console.log(err))

        }))
        .catch(err => console.log(err))



console.log("mounted")
    }, [])




  return (
    <div>
        <ImageComponent />
    </div>
  )
}

export default Images