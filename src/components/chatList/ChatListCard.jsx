import React from "react";
import styled from "styled-components";
import unlock from "../../img/unlock.png";
import lock from "../../img/lock.png";
import next from "../../img/next.png";
import { useNavigate } from "react-router-dom";

const ChatListCard = (room) => {
  const id = room.id
  const category = room.category
  const navigate = useNavigate();


  return (
    <>
      <Container>
        <Round />
        <TitleBox>{room.roomName} </TitleBox>
        <LockStatusBox src={unlock} />

        <PeopleParticipationBox>
          <NumPeopleBox>{room.nowCount}/{room.maxCount}</NumPeopleBox>
          {category==="캠스터디" ? <ParticipationBtn src={next} onClick={() => {navigate("/camchat/" + id , {state:room}) }}/> : <ParticipationBtn src={next} onClick={() => {navigate("/scriptchat/" + id , {state:room}) }}/>}
        </PeopleParticipationBox>

      </Container>
    </>
  );
};

export default ChatListCard;

const Container = styled.div`
  display: flex;
  background-color: #dee2e6;
  border-radius: 10px;
  padding: 30px;
  margin: 3%;
  align-items: center;
`;

const Round = styled.div`
  min-width: 10px;
  min-height: 10px;
  border-radius: 100%;
  background-color: #2f9e44;
`

const TitleBox = styled.div`
  width: 400px;
  max-width: 500px;
  background-color: #f8f9fa;
  padding: 5px;
  border-radius: 10px;
  margin-left: 20px;
  text-align: center;
`;
const LockStatusBox = styled.img`
  width: 30px;
  height: 30px;
`;
const PeopleParticipationBox = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const NumPeopleBox = styled.div`
  width: 40px;
  background-color: #ffd43b;
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  margin-right: 5px;
`;

const ParticipationBtn = styled.img`
  width: 30px;
  /* background-color: #37b24d; */
  padding: 5px;
  border-radius: 10px;
  text-align: center;
`;
