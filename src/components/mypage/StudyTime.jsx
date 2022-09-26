import React from 'react'
import styled from 'styled-components'

const StudyTime = () => {
  return (
    <Box>
        <h3>토익 공부 하실분~</h3><p>내 참여 시간 00:00:00</p>
    </Box>
  )
}

export default StudyTime

const Box = styled.div`
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
        line-height: 8px;
    }
`