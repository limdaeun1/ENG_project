import React from 'react'
import MypageBox from '../components/mypage/MypageBox'
import Headers from '../components/Headers'
import MypageContent from '../components/mypage/MypageContent'
import Footers from '../components/Footers'
import { useDispatch } from 'react-redux'
import { getMypage } from '../redux/modules/mypage'
import { useEffect } from 'react'


const MyPage = () => {
  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(getMypage());
  }, []);
  

  return (
    <>
    <Headers/>
    <MypageBox/>
    <MypageContent/>
    <Footers/>
    </>
  )
}

export default MyPage