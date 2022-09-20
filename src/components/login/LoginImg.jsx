import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";

const LoginImg = () => {
    const navigate = useNavigate();

  return (
    <Container>
        <Logo><img src="https://ifh.cc/g/g8oOgd.png"></img></Logo>
        <Imgbox><img src="https://img.freepik.com/premium-vector/people-in-video-conference-characters_24877-71478.jpg"></img></Imgbox>
        <Kakao onClick={() => navigate("/")}><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile28.uf.tistory.com%2Fimage%2F99BEE8465C3D7D12140EAC"></img></Kakao>
    </Container>

  )
}

export default LoginImg

const Container = styled.div`
    width: 100%;
    width: 1020px;
    margin: 40px auto;
`

const Logo = styled.div`
text-align: center;
    img{
        width: 300px;
    }
    /* margin-top: -100px; */
`

const Imgbox = styled.div`
    text-align: center;
    margin-top: -80px;
`

const Kakao = styled.div`
    text-align: center;
    img{
        width: 250px;
    }
`