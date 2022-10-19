import styled from 'styled-components'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Headers = () => {
  const navigate = useNavigate();
  const userlogin = useSelector((state) => state.user);
  
  const logoutHandler = () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log-out',
      cancelButtonText: 'Cancel', 
      reverseButtons: true,
      
   }).then(result => {
      if (result.isConfirmed) {
    localStorage.clear();
  
    navigate("/");
    window.location.reload(); 

      }
   })
  };

  const logincheck = () =>{

    Swal.fire({
      title: '로그인이 필요한 서비스입니다.',
      text: '로그인 페이지로 이동하시겠습니까?',
      icon: 'info',
      
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33',
      confirmButtonText: '이동',
      cancelButtonText: '취소', 
      reverseButtons: true, 
      
   }).then(result => {
      if (result.isConfirmed) { 
         navigate("/login");
      }
   });
  }

  

  
  return (
    <Div>
      <Logo src = "https://ifh.cc/g/g8oOgd.png"  onClick={() => navigate("/")}></Logo>
      <Btnbox>
        <Btnboxsmall1>
        <Img>
        <img src="https://ifh.cc/g/5fWtMJ.png"></img>
        </Img>
        </Btnboxsmall1>
        <Btnboxsmall2>
              {userlogin.is_Login !== true ? ( //uselogin.is_Login 이 true가 아니면 로그인 페이지로 이동 + 로그인 버튼이 보이게 하고 true면 로그아웃 버튼이 보인다.  
        <Btn onClick={() => navigate("/login")}>Login</Btn>
              ) : (
                <Btn onClick={logoutHandler}> Log-out</Btn>
              )}
              {userlogin.is_Login ? (
                  <Btn1 onClick={() => navigate("/mypage")}>My page</Btn1>
            ) : (
              <Btn1
                onClick={() => {
                  logincheck()
                }}
                > My page</Btn1>
            )}
            </Btnboxsmall2>

      </Btnbox>
    </Div>
  )
}

export default Headers

const Div = styled.div`
border: none;
  width: 100%;
 height: 140px;
 min-width: 800px;
 font-size: 14px;
  text-align: center;
  display: flex;
  justify-content: space-between;
`

const Logo = styled.img`
border: none;
  width: 10%;
  max-width:150px;
  min-width: 130px;
  margin-left: 1%;
  &:hover {
    transform: scale(1.2);
    transition: all 0.2s linear;
  }
`

const Btn = styled.button`
  width: 30%;
  min-width: 70px;
  height: 27px;
  font-size: 0.8rem;
  background-color: #4fc166;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
  margin-right: 10%;
  &:hover {
    background-color: #89f6ab;
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
  font-weight: 540;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
`;

const Btn1 = styled.button`
  width: 30%;
  min-width: 70px;
  height: 27px;
  font-size: 0.8rem;
  background-color: #4fc166;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #89f6ab;
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
  font-weight: 540;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
`;

const Img = styled.div`
border: none;
margin-left:60%;
    width: 35px;
    height: 15px;
    background-position: center;
    z-index: 1;
    `

const Btnbox = styled.div`
display: block;
width: 20%;
min-width:230px;
height: 70px;
border: none;
margin-top: 70px;
`;

const Btnboxsmall1 = styled.div`
display: flex;
width: 100%;
height: 15px;
border: none;
`;

const Btnboxsmall2 = styled.div`
display: flex;
width: 100%;
height: 52px;
border: none;
`;