import React from 'react';
import styled from 'styled-components';
import roomcat from "../../img/roomcat.png"

const NonCard = () => {
  return (
    <>

    <Container >
      <img style = {{width:"60%"}}  src={roomcat}/>

      {/* <div style ={{display:"flex"}}>
        <Round />
        <TitleBox></TitleBox>
        <LockStatusBox ></LockStatusBox>
        <PeopleParticipationBox>
        <NumPeopleBox>
        </NumPeopleBox>
        <ParticipationBtn></ParticipationBtn>
        </PeopleParticipationBox>
      </div> */}

    </Container>
    </>

  )
}

export default NonCard;

const Container = styled.div`
  border-radius: 10px;
  padding: 30px;
  margin: 3%;
  align-items: center;
  text-align: center;
  min-width: 220px;
  font-size: 20px;
  color: #099268;
`;

const Round = styled.div`
  min-width: 10px;
  min-height: 10px;
  border-radius: 100%;
`

const TitleBox = styled.div`
  width: 400px;
  max-width: 500px;
  padding: 5px;
  border-radius: 10px;
  margin-left: 20px;
  text-align: center;
`;
const LockStatusBox = styled.div`
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
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  margin-right: 5px;
`;

const ParticipationBtn = styled.div`
  width: 30px;
  padding: 5px;
  border-radius: 10px;
  text-align: center;
`;
