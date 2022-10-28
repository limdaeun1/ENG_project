import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import notimer from '../../img/notimer.png'

const StudyTime = () => {
  const { isLoading, error, mypagelist } = useSelector((state) => state.mypage);

  console.log(mypagelist)

  if (isLoading) {
    return <div>...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
    {
      mypagelist?.timeDtoList?.length == 0 
      ?(<ImgContainer >
        <ImgBox src = {notimer} />
        </ImgContainer>) 
      :(<div>{mypagelist?.timeDtoList.map((time,i) => (
        <Box key={i}> 
        <p>{time.category}</p><h3>{time.roomName}</h3><p>{time.time.replace(/(.{2})/g,"$1:").slice(0, -1)}</p>
        </Box>
      ))}</div>)
    }
    </div>
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
        white-space : nowrap;
        overflow : hidden;
        text-overflow : ellipsis;
        max-width: 500px;
    }
    &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
    cursor: pointer;
  }
`
const ImgContainer = styled.div`
  text-align:center;
  display:block;
`

const ImgBox = styled.img`
  width:15vw
  ;min-width:200px;
`