import React from 'react'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import { useDispatch } from 'react-redux'
import { getMypage } from '../redux/modules/mypage'
import { useEffect } from 'react'
import MypageContainer from '../components/mypage/MypageContainer'


const MyPage = () => {
  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(getMypage());
  }, []);
  

  return (
    <>
    <Headers/>
    <MypageContainer/>
    <Footers/>
    </>
  )
}

export default MyPage