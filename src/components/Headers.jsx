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
  width: 100%;
  height: 120px;
  /* background-color: red; */
  text-align: center;
  display: flex;
  justify-content: space-between;
`

const Logo = styled.img`
  width: 200px;
  height: 190px;
  margin-top: -35px;
  margin-left: 20px;
`

const Btn = styled.button`
  width: 80px;
  height: 36px;
  font-size: 14px;
  font-weight: 540;
  background-color: #39964c;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #89f6ab;
  }
  margin-right: 20px;
`;

const Btnbox = styled.div`
  margin-top: 60px;
`