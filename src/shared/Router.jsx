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

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/mypage" element={<Mypage />} exact />
          <Route path="/list" element={<ListPage />} exact />
          <Route path="/camchat" element={<CamStudyChatPage />} exact />
          <Route path="/scriptchat" element={<ScriptChatPage />} exact />
          <Route path="/feedback" element={<FeedBackPage />} exact />
          <Route path="/createroom" element={<CreateRoomPage />} exact />
          <Route path="*" element={<div>없는 페이지입니다.</div>}  />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router