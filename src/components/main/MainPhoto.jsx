import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MainPhoto = () => {
  const navigate = useNavigate();
  const userlogin = useSelector((state) => state.user);

  return (
    <Container>
      <Title>
        <h2>영어 공부를 위한 화상채팅 서비스</h2>
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
  )
}

export default MainPhoto

const Container = styled.div`
border: none;
  width: 80%;
  height: 600px;
  min-width: 80%; 
  background-image: url('https://ifh.cc/g/Zdgxh0.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 2px 2px 10px gray;
  align-items: center;
  text-align: center;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 2%;
`

const Title = styled.div`
border: none;
  height: 130px;
  width: 400px;
  h2{
    font-weight: 800;
    font-size: 20px;
  }
  p{
    font-weight: 700;
    font-size: 15px;
  }
  border-radius: 20px;
  text-align: center;
  color: #1f5d17;
  display: inline-block;
  margin-top: 100px;
`

const Btn = styled.button`
  width: 250px;
  height: 32px;
  font-size: 14px;
  background-color: #63c276;
  border: none;
  border-radius: 17px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #89f6ab;
  }
  margin-right: 30px;
  font-weight: 700;
`;

const Btnbox = styled.div`
border: none;
margin-top:15%;
`;