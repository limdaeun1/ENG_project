import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { postTimer } from '../../redux/modules/chatroom';
import { useDispatch } from 'react-redux';


function Timer(id) {

const [time,setTime] = useState(0);
const [start,setStart] = useState(false);
const dispatch = useDispatch();


useEffect(() => {
  let interval = null;

  if(start) {
    interval = setInterval(()=> {
      setTime(prevTime => prevTime + 10)
    }, 10)
  }else {
    clearInterval(interval);
  }

  return () => clearInterval(interval);
},[start])

const Hr = ("0" + Math.floor((time / 3600000) % 60)).slice(-2)
const Min = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
const Sec = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
const timedata = `${Hr}${Min}${Sec}`

const data_ = {
studyTime : timedata,
roomId : id.id
}

const stopBtn = () => {
    setStart(false);
}

const saveBtn = () => {
  dispatch(postTimer(data_));
}


return (

    
    <TimeWrap>
        <Time>
          <p>내 공부시간 기록</p>
          <Span>{Hr}:</Span>
          <Span>{Min}:</Span>
          <Span>{Sec}</Span>
        </Time>
        <TimeBTN>
          <Start onClick={()=> setStart(true)}>▶</Start>
          <Stop onClick={stopBtn}>❚❚</Stop>
          <Save onClick={saveBtn}>기록 저장</Save>
        </TimeBTN>
    </TimeWrap>

);

}


const TimeWrap = styled.div`
border: none;
font-size: 20px;
height:3em;
width: 65%;
  display: flex;
  justify-content: space-between;
`;

const Time = styled.div`
border: none;
width: 70%;
  display : flex;
  color :#454545;
  align-items: center;
  float: right;
  p{
    border: none;
    font-size: 0.8em;
    margin-right: 5%;
    margin-left: 15%;
    min-width: 20px;
    height: 100%;
    line-height: 60px;
    float: right;
  }
`;

const Span = styled.div`
border: none;
  min-width:30px;
  float: right;
`;

const TimeBTN = styled.div`
border: none;
  width :30%;
  min-width: 30px;
  display : flex;
  align-items : center;
`;


const Start = styled.div`
border: none;
  font-size : 1.2rem;
  font-family: "PretendardBold";
  color :#454545;
  margin-right :8%;
  cursor: pointer;
  &:hover{
    color : #333;
  }
`;

const Stop = styled.div`
border: none;
  font-size : 1.2rem;
  font-family: "PretendardBold";
  color :#454545;
  cursor: pointer;
  margin-right :8%;
  &:hover{
    color : #333;
  }
`;

const Save = styled.button`
border: none;
width: 40%;
min-width:40px;
min-height: 30px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.5s;
  color: #fff;
  padding: 6px;
  background-color: #000000;
  &:hover {
    background-color: #666666;
  }
`;


export default Timer;