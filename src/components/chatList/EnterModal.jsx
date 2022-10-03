import { useState } from "react";
import styled from 'styled-components';
import { enterRoomCam } from "../../redux/modules/chatroom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function EnterModal({ room , modalVisibleId, setModalVisibleId ,id}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassWord] = useState("");

    const onCloseHandler = () => {  //modalVisibleId이 빈값이 되면 모달이 안보임
        setModalVisibleId("")
    }

    const EnterCam = async (id,password) => {
        try {
          const response = await dispatch(enterRoomCam(id,password)).unwrap();
          console.log(response);
          if(response.data.success === true) {
            navigate("/camchat/"+id ,{state:room})
          }
          else {
            window.alert (`${response.data.error.message}`);
          }
        } catch (error) {
          console.log(error);
        }
      };
    console.log(password)

  return (
    <>
    {modalVisibleId == id ? (
    <Container>
       <input  onChange={(e) => setPassWord(e.target.value)}/>
       <button onClick={onCloseHandler}>닫기</button>
       <button onClick={()=>EnterCam(id,password)}>입력</button>
    </Container>
    ) : null }
    </>
  )
}

export default EnterModal

const Container = styled.div`
  width: 200px;
  height: auto;
  min-height: 100px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
  border-radius: 10px;
  border-bottom: solid 0.5px #8c8787;
  padding: 0 3% 0 3%;
  background-color: white;
`