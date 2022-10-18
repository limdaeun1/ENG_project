import { useState } from "react";
import styled from "styled-components";
import lock from "../../img/lock2.png";
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
    <EnterModal room={room} modalVisibleId={modalVisibleId} setModalVisibleId={setModalVisibleId} id={id}/>
      <Container onClick={() => enterhandler(id) }>
          <PeopleParticipationBox>
          {room.lock===true ? <LockStatusBox src={lock}/> :<LockStatusBox2/> }
            <NumPeopleBox>{room.nowCount}명/{room.maxCount}명</NumPeopleBox>
          </PeopleParticipationBox>
        <TitleBox>{room.roomName}</TitleBox>
      </Container>

    </>
  );
};

export default ChatListCard;

const Container = styled.div`
  box-shadow: 3px 0px 3px #d5d6d6;
  border-radius: 10px;
  padding: 0 30px 30px 30px;
  margin: 0px 1% 3% 1%;
  align-items: center;
  min-width: 190px;
  cursor: pointer;
  height: 200px;
  width: 23%;
  background-image: linear-gradient( rgba(145, 143, 143, 0.243), rgba(237, 231, 231, 0.187) ),url({room.roomimage});
  background-size: cover;
  position: relative;
  transition: all 0.5s;
  box-shadow: rgba(0, 0, 0, 0.5) 3px 3px 8px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  }
`;

const Round = styled.div`
  min-width: 10px;
  min-height: 10px;
  border-radius: 100%;
  background-color: #2f9e44;
`

const TitleBox = styled.div`
  background-color: #fbfeffb0;
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  max-width: 210px;
  margin-top: 110px;
  font-size: 0.7vw;
  font-weight: 600;
  color:#000000f9;;
`;
const LockStatusBox = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 6%;
  margin-top: -1.5%;
`;
const LockStatusBox2 = styled.img`
  width: 30px;
  height: 30px;
  display: none;
`;
const PeopleParticipationBox = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  padding: 20px 20px 20px 0;
`;

const NumPeopleBox = styled.div`
  width: 40px;
 background-color: #f1b910;
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  margin-right: 5px;
  color:white;
  font-weight: 600;
  font-size: 0.7rem;
`;

const ParticipationBtn = styled.img`
  width: 30px;
  padding: 5px;
  border-radius: 10px;
  text-align: center;
`;
