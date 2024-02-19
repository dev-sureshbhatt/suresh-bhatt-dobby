import React, { useEffect, useState } from 'react'
import ImageComponent from '../components/ImageComponent'
import './Images.css'


function Images() {

    const [images, setImages] = useState([])
    const [search, setSearch] = useState('')


    //for fetching all images when the page component mounts 
    useEffect(() => {


        fetch('https://suresh-bhatt-dobby.onrender.com/images', {
            credentials: 'include' //for sending token to verify, authenticate and display get image belonging to the user
        }).then((response => {

            if (response.status == 403) {
                alert("You seems to be not authorized, please register/login")
            }

            response.json().then((response) => {
                // console.log(response)
                setImages(response)
            }).catch(err => console.log(err))

        }))
            .catch(err => console.log(err))
    }, [])




    

    return (
        <div className='container'>
            <div className='search'>
            <input value={search} onChange={(ev) => setSearch(ev.target.value)} placeholder='Search by Image Title...'></input>
            </div>
            <div className='images'>
            {
                Array.isArray(images) &&
                images.filter(image => image.title && image.title.toLowerCase().includes(search)).map(image => <ImageComponent key={image._id} {...image} />)
            }
            </div>


        </div>
    )
}

export default Images