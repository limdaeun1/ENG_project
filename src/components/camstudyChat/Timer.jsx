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
  display: flex;
  justify-content: space-between;
  width: 550px;
`;

const Time = styled.div`
  width : 100%;
  display : flex;
  color :#454545;
  align-items: center;
  p{
    font-weight: 850;
    margin-right: 15px;
    margin-top: 20px;
  }
`;

const Span = styled.div`
  font-size : 3vh;
  margin-top :0.5vh;
`;

const TimeBTN = styled.div`
  width : 100%;
  display : flex;
  align-items : center;
  margin-top: 3px;
  margin-left: 10px;
`;


const Start = styled.div`
  font-size : 2.6vh;
  font-family: "PretendardBold";
  color :#454545;
  margin-right : 23px;
  cursor: pointer;
  &:hover{
    color : #333;
  }
`;

const Stop = styled.div`
  font-size : 2.2vh;
  font-family: "PretendardBold";
  color :#454545;
  cursor: pointer;
  &:hover{
    color : #333;
  }
`;

const Save = styled.button`
  margin-left:17px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
  color: #fff;
  border: 0;
  font-size: 11px;
  padding: 6px;
  background-color: #000000;
  &:hover {
    background-color: #666666;
  }
`;


export default Timer;