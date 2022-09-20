import React from 'react';
import FeedBackList from '../components/feedBack/FeedBackList';
import Headers from '../components/Headers';
import Footers from '../components/Footers';

const FeedBackPage = () => {
  return (
    <div>
      <Headers/>
      <FeedBackList />
      <Footers/>
    </div>
  )
}

export default FeedBackPage;