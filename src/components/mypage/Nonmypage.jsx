import React from 'react';
import styled from 'styled-components';
import roomcat from "../../img/roomcat.png"

const NonCard = () => {
  return (
    <>

    <Container >
      <img style = {{width:"60%"}}  src={roomcat}/>
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