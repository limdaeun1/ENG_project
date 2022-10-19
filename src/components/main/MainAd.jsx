import React from 'react'
import styled from 'styled-components'
import test22 from "../../img/test22.png";

const MainAd = () => {
  return (
    <Container>
        <Ad1>
        <img src ="https://ifh.cc/g/YSy0Pz.png"></img>
        </Ad1>
        <Ad2>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeFAflIpcLJwVxI0Yy6oIjft-70ZmZiTpq3v9NY_1j83B8Y_A/viewform?usp=sf_link">
            <img title="리뷰 작성하러 가기" src ={test22}></img></a>
        </Ad2>
    </Container>
  )
}

export default MainAd

const Container = styled.div`
border:none;
margin-bottom: 10%;
    display: flex;
    justify-content:center;
    width: 100%;
    min-width:800px;
    height: 250px;
`

const Ad1 = styled.div`
    img{
        width: 83%;
        min-width: 300px; 
        height: 100%;
        border-radius: 20px;
        margin: 0% 2% 0% 13%;
    }

`

const Ad2 = styled.div`
    margin-left: 5%;
    img{
        width: 83%;
        height: 100%;
        min-width: 300px; 
        border-radius: 20px;
        margin: 0% 15% 0% 2%;
        &:hover {
    transform: scale(1.03);
    transition: all 0.2s linear;
  }
    }
`