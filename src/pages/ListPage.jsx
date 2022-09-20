import React from 'react';
import ChatList from '../components/chatList/ChatList';
import Headers from '../components/Headers';
import Footers from '../components/Footers';

const ListPage = () => {
  return (
    <div>
      <Headers/>
      <ChatList />
      <Footers/>
    </div>
    
  )
}

export default ListPage