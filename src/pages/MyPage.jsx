import React from 'react'
import MypageBox from '../components/mypage/MypageBox'
import Headers from '../components/Headers'
import MypageContent from '../components/mypage/MypageContent'
import Footers from '../components/Footers'

const MyPage = () => {
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