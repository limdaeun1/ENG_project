import React from "react";
import Router from "./shared/Router.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginCheck } from "./redux/modules/user";
import { useSelector } from "react-redux";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("tokendi") !== null) {
      // Storage 에 token 저장된 값이 있다면 is_Login 상태를 true로 바꿔주는 함수로 보냄
      dispatch(loginCheck()); //app.js에서 뭔가실행될때마다 항상 로컬스토리지에 토큰이 있나 없나보고 state의 is_Login상태를 바꿔줌
    }
  }, []);



  return (
   <Router />
  );
}

export default App;
