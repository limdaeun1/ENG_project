import React from 'react'
import styled, {keyframes}  from 'styled-components'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const LoginImg = () => {
    const navigate = useNavigate();
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`; 
    const NAVER_AUTH_URL =`https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_REST_API_KEY}&response_type=code&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`
  return (
    <Container>
        <Logo>
            <img title="메인페이지 이동" src="https://ifh.cc/g/vkrmFP.png" onClick={() => navigate("/")}></img>
        </Logo>
        <Imgbox>
        <a href="https://www.instagram.com/engfluencer_official">
          <Img  title="Eng-Fluencer 공식 인스타그램 바로가기"></Img></a>
          </Imgbox>
        <Naver title="네이버 간편로그인" onClick={   () =>{
          Swal.fire({
      title: `검수 진행 중 입니다.`, 
      icon: 'info', 
    })
    }}>
            {/* <a href={NAVER_AUTH_URL}> */}
            <img src="https://ifh.cc/g/CYPS0t.png"></img>
            <button>네이버 로그인</button>
            {/* </a> */}
        </Naver>
        <Kakao title="카카오 간편로그인">
            <a href={KAKAO_AUTH_URL}>
            <img src="https://ifh.cc/g/8QQ5yW.png"></img>
            </a>
        </Kakao>
    </Container>

  )
}

export default LoginImg

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
    width: 100%;
    height: 100%;
    min-width: 600px;
    max-width:1500px;
    font-size:10px;
    margin: auto;
`

const Logo = styled.div`
border: none;
text-align: center;
width: 15%;
min-width:200px;
margin: auto;
height: auto;
    img{
        width: 100%;
        margin-top:15%;
        margin-bottom:5%;
    }
    &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
  cursor: pointer;
  }
`

const Imgbox = styled.div`
border: none;
width:84%;
min-width: 600px;
min-height: 500px;
    border-radius: 15px;
    margin: 1% auto 7% auto ;
    animation: ${smoothAppear} 3s 0s 1;
    `

const Img = styled.div`
border: none;
margin: 2% 5% auto 5%;
width: 90%;
height: 500px;
    background-image: url('https://ifh.cc/g/k5twLN.png');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    `

const Kakao = styled.div`
width:20%;
min-width:330px;
height: 82px;
margin: auto;
    text-align: center;
    img{
        width: 100%;
        border-radius: 10px;
        margin-top:15%;
        margin-bottom:15%;
    }
    &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
`

const Naver = styled.div`
border: 1px #03C75A;
width:20%;
min-width:330px;
height: 50px;
margin: auto;
    text-align: center;
    border-radius: 10px;
    background-color: #03C75A;
    img{
        width: 15%;
        height: 100%;
        float:left;
        border-radius: 10px;
    }
    button{
        background-color: #03C75A;
        border: solid 1px #03C75A;
        font-size: 15px;
        line-height: 45px;
        cursor: pointer;
        color: white;
        font-weight:bold;
    }
    &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
`