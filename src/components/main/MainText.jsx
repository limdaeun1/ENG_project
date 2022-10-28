import React from 'react'
import styled from 'styled-components'

const MainText = () => {

  return (
    <Container>
        <TextBox>
            SERVICES
        </TextBox>
        <Bigbox>
            <Box>
                <Boximg></Boximg>
                <Boxtext>
                    <h3>편안한 양방향 소통</h3>
                    <p>동등한 위치에서의 양방향 소통으로 편안한 대화를 나눌 수 있습니다.</p>
                </Boxtext>
            </Box>
            <Box2>
                <Boximg2></Boximg2>
                <Boxtext>
                    <h3>유쾌한 스크립트</h3>
                    <p>일상 속 , 티비 속 유쾌한 상황들을 재현한 내용들로 학습해볼 수 있습니다. </p>
                </Boxtext>
            </Box2>
            <Box3>
                <Boximg3></Boximg3>
                <Boxtext>
                    <h3>공부 편의 기능들</h3>
                    <p>메모장과 타이머 등 학습에 유용한 도구들을 제공합니다.</p>
                </Boxtext>
            </Box3>
        </Bigbox>
    </Container>
  )
}

export default MainText

const Container = styled.div`
  border: none;
  height: auto;
  width: 100%;
  min-width:900px;
  margin-top: 12%;
  margin-bottom:15% ;
  font-size: 40px;
`

const TextBox = styled.h1`
 border: none;
 width: 100%;
 min-width: 200px;
 text-align: center;
 color: #9c9d9c;
 font-size: 2.5rem;
 margin-bottom: 4%;
 margin-top: -20px;
`

const Box = styled.article`
   border: none;
   transition: all 0.5s;
   box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 20px;
   &:hover {
     box-shadow: rgba(0, 0, 0, 0.10) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
     transform: scale(0.9);
    transition: all 0.2s linear;
   }
   border-radius: 5px;
   cursor: pointer;
   margin-left: 2rem;
   margin-right: 3rem;
   border-radius: 15px;
   font-size: 1.1rem;
   margin-top: 150px;
   width: 380px;
   height:500px;
`;

const Box2 = styled.article`
   border: none;
   transition: all 0.5s;
   box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 20px;
   &:hover {
     box-shadow: rgba(0, 0, 0, 0.10) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
     transform: scale(0.9);
    transition: all 0.2s linear;
   }
   border-radius: 5px;
   cursor: pointer;
   margin-left: 1rem;
   margin-right: 1rem;
   border-radius: 15px;
   font-size: 1.1rem;
   margin-bottom: 130px;
   padding: 10px;
`;

const Box3 = styled.article`
   border: none;
   transition: all 0.5s;
   box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 20px;
   &:hover {
     box-shadow: rgba(0, 0, 0, 0.10) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
     transform: scale(0.9);
    transition: all 0.2s linear;
   }
   border-radius: 5px;
   cursor: pointer;
   margin-left: 3rem;
   margin-right: 2rem;
   border-radius: 15px;
   font-size: 1.1rem;
   margin-top: 150px;
   width: 380px;
   height:500px;
`;

const Boximg = styled.div`
    border: none;
    width: 100%;
    min-width:190px;
    min-height: 200px;
    background-image: url('https://ifh.cc/g/PyXTkX.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
`

const Boximg2 = styled.div`
    border: none;
    width: 100%;
    min-width:200px;
    min-height: 340px;
    background-image: url('https://ifh.cc/g/xdba1W.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
`

const Boximg3 = styled.div`
    border: none;
    width: 100%;
    min-width:200px;
    min-height: 200px;
    background-image: url('https://ifh.cc/g/LYpCnV.png');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
`
    
const Boxtext = styled.div`
    border: none;
    width: 80%;
    min-width: 100px;
    margin-left: 10%;
    line-height: 2.5rem;
    font-size: 1.05rem;
`
const Bigbox =styled.div`
    display: flex;
    justify-content:space-between;
`