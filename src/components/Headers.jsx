import styled from 'styled-components'
import React from 'react'
import { useNavigate } from "react-router-dom";

const Headers = () => {
  const navigate = useNavigate();
  
  return (
    <Div>
      <Logo src = "https://ifh.cc/g/g8oOgd.png"  onClick={() => navigate("/")}></Logo>
      <Btnbox>
        <Btn onClick={() => navigate("/login")}>Login</Btn>
        <Btn onClick={() => navigate("/mypage")}>Mypage</Btn>
      </Btnbox>
    </Div>
  )
}

export default Headers

const Div = styled.div`
border: none;
  width: 100%;
 height: 100%;
 font-size: 14px;
  text-align: center;
  display: flex;
  justify-content: space-between;
`

const Logo = styled.img`
border: none;
  width: 10%;
  min-width: 100px;
  height: 10%;
  margin-left: 1%;
`

const Btn = styled.button`
  width: 50%;
  min-width: 60px;
  height: 45%;
  min-height: 45%;
  font-size: 1rem;
  /* 14px; */
  background-color: #39964c;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
  margin-right: 10%;
  margin-top: 10%;
  &:hover {
    background-color: #89f6ab;
  }
`;

const Btnbox = styled.div`
display: flex;
width: 20%;
min-width:190px;
border: none;
margin-top: 5%;
`;