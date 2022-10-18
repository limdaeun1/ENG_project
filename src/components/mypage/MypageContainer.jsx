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
    <Banner>
    </Banner>
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
background-image: url('https://ifh.cc/g/NSZtWA.png');
background-size: cover;
background-position: center;
`;