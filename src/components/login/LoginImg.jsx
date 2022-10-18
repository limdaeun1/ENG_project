import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import naverBtn from "../../img/naverBtn.png"


const LoginImg = () => {
    const navigate = useNavigate();
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`; 
    const NAVER_AUTH_URL =`https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_REST_API_KEY}&response_type=code&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`
  return (
    <Container>
        <Logo>
            <img src="https://ifh.cc/g/vkrmFP.png" onClick={() => navigate("/")}></img>
        </Logo>
        <Imgbox><Img onClick={() => navigate("/")}></Img></Imgbox>
        <Naver>
            <a href={NAVER_AUTH_URL}>
            <img src="https://ifh.cc/g/CYPS0t.png"></img>
            <button>네이버 로그인</button>
            </a>
        </Naver>
        <Kakao>
            <a href={KAKAO_AUTH_URL}>
            <img src="https://ifh.cc/g/8QQ5yW.png"></img>
            </a>
        </Kakao>
    </Container>

  )
}

export default LoginImg

const Container = styled.div`
border: none;
/* border: solid 1px; */
    width: 100%;
    height: 100%;
    min-width: 600px;
    max-width:1500px;
    font-size:10px;
    margin: auto;
`

const Logo = styled.div`
border: none;
/* border: solid 1px red; */
text-align: center;
width: 15%;
min-width:200px;
margin: auto;
height: auto;
/* background-image:"https://ifh.cc/g/vkrmFP.png"; */
    img{
        width: 100%;
        /* border: solid 1px orange; */
        margin-top:15%;
        margin-bottom:5%;
    }
    &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
`

const Imgbox = styled.div`
border: none;
/* border: solid 1px yellow; */
width:40%;
min-width: 600px;
min-height: 600px;
    border-radius: 15px;
    margin: 1% auto 0 auto ;
    `

const Img = styled.div`
border: none;
/* border: solid 1px green; */
margin: auto;
width: 100%;
height: 600px;
    background-image: url('https://img.freepik.com/premium-vector/people-in-video-conference-characters_24877-71478.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    `


const Kakao = styled.div`
/* border: solid 1px red; */
width:20%;
min-width:330px;
height: 82px;
margin: auto;
/* border: none; */
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
/* border: none; */
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
    }
    &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
`