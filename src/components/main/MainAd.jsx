import React from 'react'
import styled from 'styled-components'

const MainAd = () => {
  return (
    <Container>
        <Ad1>
            <img src ="https://ifh.cc/g/YSy0Pz.png"></img>
        </Ad1>
        <Ad2>
            <img src ="https://ifh.cc/g/YSy0Pz.png"></img>
        </Ad2>
    </Container>
  )
}

export default MainAd

const Container = styled.div`
border:none;
margin-top: 10%;
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
    }
`