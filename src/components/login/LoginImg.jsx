import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";

const LoginImg = () => {
    const navigate = useNavigate();

  return (
    <Container>
        <Logo><img src="https://ifh.cc/g/g8oOgd.png"></img></Logo>
        <Imgbox><Img></Img></Imgbox>
        <Kakao>
            <a href={KAKAO_AUTH_URL}>
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile28.uf.tistory.com%2Fimage%2F99BEE8465C3D7D12140EAC"></img>
            </a></Kakao>
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
border: none;
    text-align: center;
    img{
        width: 2.5em;
    }
`