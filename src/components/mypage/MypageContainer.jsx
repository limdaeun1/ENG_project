import styled from 'styled-components'
import React from 'react'
import MypageBox from "./MypageBox";
import MypageContent from "./MypageContent";

const MypageContainer = () => {
    return (
    <>
    <Bigcontainer>
    <Container>
    <MypageBox/>
    <MypageContent/>
    </Container>
    <Bannerbox>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeFAflIpcLJwVxI0Yy6oIjft-70ZmZiTpq3v9NY_1j83B8Y_A/viewform?usp=sf_link">
    <Banner title="설문조사 참여 바로가기">
    </Banner> </a>
    </Bannerbox>
    </Bigcontainer>
    </> )
}

export default MypageContainer

const Bigcontainer = styled.div`
border: none;
width: 100%;
height:100%;
min-width:800px;
min-height: 700px;
display:flex;
`;

const Container = styled.div`
border: none;
width: 75%;
float:left;
display:block;
align-items: center;
justify-content: center;
`;

const Bannerbox = styled.div`
border:none;
width: 25%;
`;

const Banner= styled.div`
border: none;
width: 200px;
height: 600px;
margin: 20% auto 0% auto;
background-image: url('https://ifh.cc/g/H7vQCh.png');
background-size: cover;
background-position: center;
&:hover {
    transform: scale(1.03);
    transition: all 0.2s linear;
  }
`;