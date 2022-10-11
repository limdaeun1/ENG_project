import { useState } from "react";
import styled from "styled-components";
import unlock from "../../img/unlock.png";
import lock from "../../img/lock.png";
import next from "../../img/next.png";
import { useNavigate } from "react-router-dom";
import { enterRoomCam } from "../../redux/modules/chatroom";
import { useDispatch } from "react-redux";
import EnterModal from "./EnterModal";

const ChatListCard = (room) => {
  const id = room.id
  const category = room.category
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalVisibleId, setModalVisibleId] = useState("")
  const payload = { id:id , password:"",}

  const onModalHandler = id => {
    setModalVisibleId(id)
  }

  //비번방이면 비번입력 모달창을 띄우고 , 아니면 방으로 입장
  const enterhandler = (id) => { 
    if(room.lock===true) {
      onModalHandler(id)
    }
    else {
      EnterCam()
    }
  }
 
  //방으로 입장
  const EnterCam = async () => {
    try {
      const response = await dispatch(enterRoomCam(payload)).unwrap();
      console.log(response);
      if(response.data.success === true) {
        if(room.category === "캠스터디" ) {
         navigate("/camchat/"+id ,{state:room})
        }
        else {
         navigate("/scriptchat/"+id ,{state:room})
        }
      }
      else {
        window.alert (`${response.data.error.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <EnterModal room={room} modalVisibleId={modalVisibleId} setModalVisibleId={setModalVisibleId} id={id}/>
        <Round />
        <TitleBox>{room.roomName} </TitleBox>
        {room.lock===true ? <LockStatusBox src={lock}/> :<LockStatusBox src={unlock}/> }
        <PeopleParticipationBox>
          <NumPeopleBox>{room.nowCount}/{room.maxCount}</NumPeopleBox>
          {category==="캠스터디" ? <ParticipationBtn src={next} onClick={() => enterhandler(id)}/> : <ParticipationBtn src={next} onClick={() => enterhandler(id) }/>}
        </PeopleParticipationBox>

      </Container>
    </>
  );
};

export default ChatListCard;

const Container = styled.div`
  display: flex;
  background-color: #d3f9d8;
  /* background: linear-gradient(to right, #c3fae8,#b2f2bb,#96f2d7); */
  /* background: linear-gradient(to right, #96f2d7,#b2f2bb,#96f2d7); */
  /* background: linear-gradient(to right, #b2f2bb,#96f2d7,#b2f2bb); */
  box-shadow: 3px 0px 3px #d5d6d6;
  border-radius: 10px;
  padding: 30px;
  margin: 3%;
  align-items: center;
  min-width: 220px;
  cursor: pointer;
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
 background: linear-gradient(to right, #ffd43b,#fcc419);
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
