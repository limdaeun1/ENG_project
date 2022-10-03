import { useState } from "react";
import styled from 'styled-components';
import { enterRoomCam } from "../../redux/modules/chatroom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function EnterModal({ room , modalVisibleId, setModalVisibleId ,id}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassWord] = useState("");
    const payload = { id:id , password:password,}

    const onCloseHandler = () => {  //modalVisibleId이 빈값이 되면 모달이 안보임
        setModalVisibleId("")
    }

    const EnterCam = async () => {
        try {
          const response = await dispatch(enterRoomCam(payload)).unwrap();
          if(response.data.success === true) {
            if(room.category === "캠스터디" )
            navigate("/camchat/"+id ,{state:room})
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
    {modalVisibleId == id ? (
    <Container>
      <h4>비밀번호를 입력해주세요!</h4>
       <Input onChange={(e) => setPassWord(e.target.value)}/>
       <Btnbox>
          <button onClick={onCloseHandler}>닫기</button>
          <button onClick={()=>EnterCam()}>입력</button>
       </Btnbox>
    </Container>
    ) : null }
    </>
  )
}

export default EnterModal

const Container = styled.div`
  width: 200px;
  height: auto;
  min-height: 130px;
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
  text-align: center;
  
`

const Input = styled.input`
`

const Btnbox = styled.div`
  display: flex;
  button {
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.5s;
    color: #fff;
    border: none;
    font-size: 11px;
    padding: 6px;
    background-color: #000000;
    &:hover {
      background-color: #666666;
    }
    float: right;
    margin-top:10px;
    margin-right:2%;
    width: 60px;
  }
  justify-content: center;
`