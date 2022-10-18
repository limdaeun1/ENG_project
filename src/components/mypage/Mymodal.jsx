import React from 'react'
import styled from 'styled-components';


function Mymodal({day, name, content, modalVisibleId, setModalVisibleId ,id}) {

    const onCloseHandler = () => {
        setModalVisibleId("")
    }

    return (
        <>
        {modalVisibleId == id ? (
        <Container>
            <Btn onClick={onCloseHandler}>X</Btn>
            <P3>{day}</P3>
            <Roomname>{name}</Roomname>
            <P2>{content}</P2>
        </Container>
        ) : null }
        </>
    );
}
export default Mymodal;

const Container = styled.div`
  width: 300px;
  height: auto;
  min-height: 250px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
  border-radius: 10px;
  border-bottom: solid 0.5px #8c8787;
  padding: 0 3% 0 3%;
  background-color: #f2f9ed;
`

const Btn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
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
    transform: scale(1.3);
    transition: all 0.2s linear;
  }
`

const Roomname = styled.h3`
  font-size: 18px;
  overflow : hidden;
  text-overflow : ellipsis;
  white-space : nowrap;
`

const P2 = styled.p`
  width: 300px;
    display: inline-block;
`


const P3 = styled.p`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`