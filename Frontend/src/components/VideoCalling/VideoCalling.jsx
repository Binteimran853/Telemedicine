import React from 'react'
import "./VideoCalling.css"
import { useParams } from 'react-router-dom'
export default function VideoCalling() {
    const {doctorId}=useParams();
  return (
    <div>
        <form className='video-calling-form'>
            <label ><h1>Video Calling</h1></label>
            <input type="text" placeholder='Enter Code' />
            <button type='submit'>Enter</button>
        </form>
    </div>
  )
}
