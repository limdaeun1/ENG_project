import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import Mypage from "../pages/MyPage";
import ListPage from "../pages/ListPage";
import CamStudyChatPage from '../pages/CamStudyChatPage';
import ScriptChatPage from '../pages/ScriptChatPage';
import FeedBackPage from '../pages/FeedBackPage';
import CreateRoomPage from '../pages/CreateRoomPage';
import Loading from '../pages/Loading';
import LoadingNaver from '../pages/LoadingNaver';
import ReadyPage from '../pages/ReadyPage';



const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/mypage" element={<Mypage />} exact />
          <Route path="/list" element={<ListPage />} exact />
          <Route path="/camchat/:id" element={<CamStudyChatPage />} exact />
          <Route path="/scriptchat/:id" element={<ScriptChatPage />} exact />
          <Route path="/feedback" element={<FeedBackPage />} exact />
          <Route path="/createroom" element={<CreateRoomPage />} exact />
          <Route path="*" element={<div>없는 페이지입니다.</div>}  />
          <Route path="/login/kakao" element={<Loading />} exact />
          <Route path="/login/naver" element={<LoadingNaver />} exact />
          <Route path="/enter/:id" element={<ReadyPage />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router