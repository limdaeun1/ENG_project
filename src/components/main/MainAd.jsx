import React from 'react'
import styled from 'styled-components'

const MainAd = () => {
  return (
    <Container>
        <Ad1>
            <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpiG5GOuuyq6TP_cgfaZhx95v4768Kuo5Sg&usqp=CAU"></img>
        </Ad1>
        <Ad2>
            <img src ="https://www.lens007.com/wp-content/uploads/%EC%B9%9C%EA%B5%AC%EC%B6%94%EC%B2%9C-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B0%B0%EB%84%88-007.jpg"></img>
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
        width: 90%;
        min-width: 170px; 
        height: 100%;
        border-radius: 20px;
        margin: 0% 5% 0% 5%;
    }

`

const Ad2 = styled.div`
    margin-left: 5%;
    img{
        width: 90%;
        height: 100%;
        min-width: 250px; 
        border-radius: 20px;
        margin: 0% 5% 0% 5%;
    }
`