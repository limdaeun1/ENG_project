import React from 'react'
import AddRoom from '../components/addRoom/AddRoom'
import Headers from '../components/Headers';
import Footers from '../components/Footers';


const CreateRoomPage = () => {
  return (
    <div>
      <Headers/>
      <AddRoom />
      <Footers/>
    </div>
  )
}

export default CreateRoomPage