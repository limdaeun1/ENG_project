import React from 'react';
import ChatList from '../components/chatList/ChatList';
import Headers from '../components/Headers';
import Footers from '../components/Footers';

const ListPage = () => {
  return (
    <>
      <Headers/>
      <ChatList />
      <Footers/>
    </>
  )
}

export default ListPage