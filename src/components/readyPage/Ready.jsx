import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { enterRoomCam } from '../../redux/modules/chatroom';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const Ready = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {state} = useLocation();
  const {id} = useParams();
  const payload = { id:id , password:""}
  const videoRef = React.useRef(null); 

  //카메라,마이크 권한 요청.
  useEffect(()=> {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
              videoRef.current.srcObject = stream; 
            }) 
    .catch((error) =>
    alert(""));
    Swal.fire({
      title: `카메라, 마이크 접근 권한을\n허용해주세요!`, 
      icon: 'warning', 
    });
  },[])

  //방 입장하기 
  const Enterroom = async () => {
    try {
      const response = await dispatch(enterRoomCam(payload)).unwrap();
      if(response.data.success === true) {
        if(state.category === "캠스터디" ) {
         navigate("/camchat/"+id ,{state:state})
        }
        else {
         navigate("/scriptchat/"+id ,{state:state})
        }
      }
      else {
        window.alert (`${response.data.error.message}`);
      }
    } catch (error) {
      Swal.fire({
        title: '잘못된 요청입니다!', 
        icon: 'error', 
      });
    }
  };

  //입장취소 리스트 페이지로 돌아가기
  const BackPage = () => {
    navigate("/list");
  }

  return (
    <Bigwrap>
    <Wrap>
      <AllLayout>
        <VideoWrap>
          <Video ref={videoRef} autoPlay={true} />
        </VideoWrap >
        <Right>
            <CheckTextWrap>
                <MainTitle>입장전 확인해주세요!</MainTitle>
                <Text>
                입장전 카메라가 정상적으로 <br/>
                작동하는지 확인해주세요.<br/>
                </Text>
                <Text2>
                  카메라 마이크 접근 권한 차단 시<br/>
                  정상적인 이용이 불가능 합니다! <br/>
                </Text2>
            </CheckTextWrap>
            <RoomWrap>
              <EnterRoom onClick={()=> Enterroom()}>방 입장하기</EnterRoom>
              <LeaveRoom onClick={()=> BackPage()}>입장 취소</LeaveRoom>
          </RoomWrap>
      </Right>
      </AllLayout>
  </Wrap>
  </Bigwrap>
  );
}

export default  Ready;

const Bigwrap = styled.div`
  width : 70%;
  height : 600px;
  max-width: 1200px;
  min-width: 900px;
  margin: 2% auto 10% auto;
  border: none;
  margin-top:100px;
`;

const Wrap = styled.div`
  width : 70%;
  height : 500px;
  max-width: 1000px;
  min-width: 900px;
  box-shadow: 0 2px 7px 1px rgb(64 60 67 / 16%);
  margin: 2% auto 10% auto;
  border: none;
`;

const AllLayout = styled.div`
  width : 90%;
  margin : 0 auto;
  display :flex;
  /* border: solid 1px blue; */
  justify-content: center;
  padding-top: 8%;
`;

const VideoWrap = styled.div`
  width: 40%;
  min-width: 400px;
  border-radius : 10px;
  margin-right: 8%;
`;

const Video = styled.video`
  min-width: 400px;
  width: 100%;
  border-radius : 20px;
`;

const Right = styled.div`
  width : 30%;
  min-width: 300px;
`;
const CheckTextWrap = styled.div`
  width :100%;
`;
const MainTitle = styled.div`
  font-size : 22px;
  margin-top : 20px;
  font-weight : bold;
  text-align :center;
`;
const Text = styled.div`
  font-size : 17px;
  margin-top : 25px;
  text-align :center;
`;
const Text2 = styled.div`
  margin-top : 25px;
  text-align :center;
  font-size : 15px;
  text-decoration:underline;
  color :  #929292;
`;

const RoomWrap = styled.div`
  margin : 0  auto;
`;


const EnterRoom = styled.button`
  width : 150px;
  height : 45px;
  display :block;
  margin : 0 auto;
  margin-top : 40px;
  border-radius : 10px;
  border : none;
  color :  #fff;
  cursor: pointer;
  background : #4fc166;
  &:hover {
      background : #89f6ab;
  }
`;

const LeaveRoom = styled.button`
  display :block;
  margin : 0 auto;
  margin-top : 25px;
  font-size : 15px;
  text-decoration:underline;
  color :  #929292;
  cursor: pointer;
  background : none;
  border : none;
`;