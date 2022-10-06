import React from 'react'
import styled, {keyframes} from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Page3 from "../../img/Page3.png";

const MainPhoto = () => {
  const navigate = useNavigate();
  const userlogin = useSelector((state) => state.user);

  return (
    <>
    <Container>
      <Title>
        <h1>Eng - FLUENCER</h1>
        <h2>영어 공부를 위한 양방향 화상채팅 서비스</h2>
        <p>스크립트를 통해 편하게 대화하세요</p>
        <Btnbox>
        {userlogin.is_Login !== true ? ( 
        <Btn onClick={() =>  {
          alert("로그인이 필요한 서비스입니다.");
          navigate("/login");
        } }>스터디룸 입장</Btn>
              ) : (
                <Btn
                onClick={() =>
                  navigate("/list")
                }>스터디룸 입장</Btn>
              )}
              </Btnbox>
      </Title>
    </Container>
    </>
  )
}

export default MainPhoto

const smoothAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  border: none;
  height: 600px;
  width: 100vw;
  background-image: url(${Page3});
  background-size: cover;
  background-position: center;
  /* box-shadow: 2px 2px 10px gray; */
  align-items: center;
  text-align: center;
  animation: ${smoothAppear} 3s 0s 1;
`

const Title = styled.div`
border: none;
  height: 130px;
  width: 400px;
  h1{
    color: #dbffd6;
    font-weight: 900;
    text-shadow: -2px 0 #2bd315, 0 2px #2bd315, 2px 0 #2bd315, 0 -2px #2bd315;
    
  }
  h2{
    font-weight: 700;
    font-size: 20px;
   
  }
  p{
    font-weight: 700;
    font-size: 15px;
  
  }
  border-radius: 20px;
  text-align: center;
  color: #087d0e;
  display: inline-block;
  margin-top: 140px;
  margin-right: -600px;
`

const Btn = styled.button`
  width: 230px;
  height: 43px;
  font-size: 16px;
  background-color: #63c276;
  border: none;
  border-radius: 17px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #89f6ab;
  }
  font-weight: 750;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
`;

const Btnbox = styled.div`
border: none;
margin-top:15%;
`;