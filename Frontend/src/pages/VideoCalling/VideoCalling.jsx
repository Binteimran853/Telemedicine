import React from 'react';
import "./VideoCalling.css"
import { useParams } from 'react-router-dom';
const VideoCalling = () => {
    const {doctorId}=useParams();
    return (
        <div>
      <form className='video-calling-form'>
        <lable><h1>Inside Video calling</h1></lable>
        <input type="text" placeholder='Enter Code' />
        <button type='submit'>Enter Room</button>
      </form>
            
        </div>
    );
}

export default VideoCalling;
