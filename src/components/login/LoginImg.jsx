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
        <Logo><img src="https://ifh.cc/g/g8oOgd.png"></img></Logo>
        <Imgbox><Img></Img></Imgbox>
        <Kakao>
            <a href={KAKAO_AUTH_URL}>
            <img src="https://ifh.cc/g/8QQ5yW.png"></img>
            </a>
        </Kakao>
        <Naver>
            <a href={NAVER_AUTH_URL}>
            <img src={naverBtn}></img>
            </a>
        </Naver>
    </Container>

  )
}

export default LoginImg

const Container = styled.div`
/* border: none; */
border: solid 1px;
    width: 90%;
    margin-bottom: 5%;
    margin-left: 5%;
    margin-right: 5%;
    font-size:100px;
`

const Logo = styled.div`
/* border: none; */
border: solid 1px;
text-align: center;
    img{
        width: 2.5em;
        border: solid 1px;
    }
    /* margin-top: -100px; */
`

const Imgbox = styled.div`
border: none;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    `

const Img = styled.div`
border: none;
margin: auto;
    width: 40%;
    height: 5.5em;
    min-width: 450px;
    min-height: 500px;
    background-image: url('https://img.freepik.com/premium-vector/people-in-video-conference-characters_24877-71478.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    `


const Kakao = styled.div`
/* border: solid 1px red; */
border: none;
    text-align: center;
    img{
        width: 2.9em;
    }
`

const Naver = styled.div`
/* border: solid 1px red; */
border: none;
    text-align: center;
    img{
        width: 2.9em;
    }
`