//리다이렉트 될 화면
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getKakao } from "../redux/modules/user";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Loading = () => {
  const dispatch = useDispatch();

  
  const params = new URLSearchParams(window.location.search); //주소뒤의 ? 가 파라미터를 전달해준다는 뜻//?code=..이면 주소창이 전달해주는 파라미터의 이름은 code 이다.
  let code = params.get("code");
  console.log(code); //주소창에서 localhost3000/loading/?code= ....  에서 code= "~~~" 가져오기

  const Toast = Swal.mixin({
    toast: true,
    position: 'center-center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
 
Toast.fire({
    icon: 'success',
    title: 'Welcome to Eng-FLUENCER!!'
})


  useEffect(() => {
    //주소창에서 뗀 code를 토큰가져오는 함수에 보내줌
    dispatch(getKakao(code));
  }, []);


  

  return (
    <Div>
    </Div>
  );
};

export default Loading;

const Div = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;
  height: 300px;
  width: 400px;
  margin: -150px 0 0 -200px;
  padding: 5px;
`;