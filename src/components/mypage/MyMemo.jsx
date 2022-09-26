import React from 'react'
import styled from 'styled-components'

const MyfeedBack = () => {
  return (
    <Box>
    <h3>방 제목</h3>
    {/* (넓이 고정해서 왼쪽 배치, 고정 너비 넘어가면 가로 길어지게 말고 세로로 길어지게) */}
    <p>여기 메모 들어갈 부분 나중에 고치기(스크롤 고민 중)</p>
    </Box>  
  )
}

export default MyfeedBack

const Box = styled.div`
    /* width: 100%;
    width: 600px;
    margin: 10px 40px 0 40px;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
    border-radius: 10px;
    border-bottom: solid 0.5px #8c8787;
    display: flex;
    padding: 0 40px 0 40px; */
    border: none;
    width: 92%;
    min-width: 440px;
    align-items: center;
  justify-content: center;
    margin: 0.5% 1% 0.1% 1%;
    height: auto;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
    border-radius: 10px;
    border-bottom: solid 0.5px #8c8787;
    display: flex;
    justify-content: space-between;
    padding: 0 3% 0 3%;
    h3{
        line-height: 13px;
        margin-right: 25px;
    }
`