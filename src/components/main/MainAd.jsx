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
    margin: 100px 180px 70px 180px;
    display: flex;
    justify-content:center;
    height: 250px;
`

const Ad1 = styled.div`
    margin: 20px;
    img{
        height: 250px;
        border-radius: 20px;
    }

`

const Ad2 = styled.div`
    margin: 20px;
    img{
        height: 250px;
        border-radius: 20px;
    }
`