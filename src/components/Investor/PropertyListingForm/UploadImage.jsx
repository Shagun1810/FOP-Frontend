import React, { useEffect, useState } from 'react'
import {
  ref,
  getStorage,
  uploadBytes,
  deleteObject,
  getDownloadURL,
  listAll,
  list,
} from 'firebase/storage'
import { storage } from '../../firebase'
import { v4 } from 'uuid'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const UploadImage = () => {
  const [documents, setDocuments] = useState(null)
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([])
  const [formData, setformData] = useState('')
  const navigate = useNavigate()
  const imagesListRef = ref(storage, 'images/')
  const location = useLocation()

  const uploadFile = () => {
    console.log('hi')
    if (imageUpload == null) return
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url])
        alert('Image uploaded successfully')
      })
    })
  }

  console.log(imageUrls)
  // console.log(imageUrls[0])

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);

  //       });
  //     });
  //   });
  // }, []);

  const sendRequestToBackend = async (id) => {
    const url = 'http://localhost:5000/api/properties/updateProperty'
    const response = await axios
      .patch(url, {
        id: id,
        images: imageUrls,
      })
      .catch((err) => {
        return {
          data: {
            message: err.response.data.message,
            success: err.response.data.success,
            status: err.response.status,
          },
        }
      })
    const data = await response.data
    return data
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImageUpload(file)
  }

  const addImageLinkToBackend = () => {
    const id = location.state.id
    console.log(id)
    sendRequestToBackend(id)
      .then((data) => {
        console.log(data)
        navigate('/lister')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="container mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Step 2: Upload Images</h1>
      <div className="mb-4">
        <label
          htmlFor="documents"
          className="text-sm font-semibold text-gray-600 mb-1"
        >
          Documents (Images, etc.):
        </label>
        <input
          type="file"
          id="documents"
          name="documents"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={uploadFile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Upload Image
        </button>
      </div>
      <div>
        {imageUrls.length > 0 &&
          imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Image ${index}`}
              className="mb-2"
            />
          ))}
      </div>
      <div className="mt-4">
        <button
          onClick={addImageLinkToBackend}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-300"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default UploadImage
