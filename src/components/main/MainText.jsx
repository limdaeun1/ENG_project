import React from 'react'
import styled from 'styled-components'

const MainText = () => {
  return (
    <Container>
        <TextBox>
            SERVICES
        </TextBox>
        <Box>
            <Boximg></Boximg>
            <Boxtext>
                <h3>양방향 소통이 가능합니다</h3>
                <p>동등한 위치에서의 양방향 소통으로 편안하게 대화 할 수 있습니다</p>
            </Boxtext>
        </Box>
        <Box>
            <Boximg2></Boximg2>
            <Boxtext>
                <h3>양방향 소통이 가능합니다</h3>
                <p>동등한 위치에서의 양방향 소통으로 편안하게 대화 할 수 있습니다</p>
            </Boxtext>
        </Box>
        <Box>
            <Boximg3></Boximg3>
            <Boxtext>
                <h3>양방향 소통이 가능합니다</h3>
                <p>동등한 위치에서의 양방향 소통으로 편안하게 대화 할 수 있습니다</p>
            </Boxtext>
        </Box>
    </Container>
  )
}

export default MainText

const Container = styled.div`
  height: auto;
  margin: 80px 170px 10px 170px;
  min-width: 980px; 
`

const TextBox = styled.h1`
    text-align: center;
    color: #9c9d9c;
`

const Box = styled.article`
   transition: all 0.5s;
   box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 20px;
   &:hover {
     box-shadow: rgba(0, 0, 0, 0.10) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
   }
   border-radius: 5px;
   cursor: pointer;
   margin: 40px;
   border-radius: 15px;
   display: flex;
`;

const Boximg = styled.div`
    width: 300px;
    height: 200px;
    background-image: url('https://cdn.pixabay.com/photo/2021/05/15/19/40/computer-6256527__480.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
`

const Boximg2 = styled.div`
    width: 300px;
    height: 200px;
    background-image: url('https://cdn.pixabay.com/photo/2022/01/17/14/10/video-conference-6944846__480.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
`

const Boximg3 = styled.div`
    width: 300px;
    height: 200px;
    background-image: url('https://cdn.pixabay.com/photo/2020/06/28/15/26/video-conference-5349687__480.png');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
`
    
const Boxtext = styled.div`
    margin-left: 180px;
    line-height: 40px;
`
