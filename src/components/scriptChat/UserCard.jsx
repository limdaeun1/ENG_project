import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

const UserCard = ({ user, Authorization, roomId, client, userId, roomManager}) => {


  const onSubmitBan = () => {
    client.current.publish({
      destination: "/pub/chat/message",
      headers: { Authorization: Authorization },
      //전송할 데이터를 입력
      body: JSON.stringify({
        type: 4,
        message: user.memberId,
        roomId: roomId.id,
      }),
    });
  };

const banBtn = () =>{
  Swal.fire({
    title: "강퇴하시겠습니까?",
    html: `${user?.memberName}님을 강퇴하시겠습니까?`,
    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
    cancelButtonColor: '#d33',
    showCancelButton: true,
    confirmButtonText: "강퇴",
    cancelButtonText: '취소',
}).then(result => {
  if(result.isConfirmed){
    onSubmitBan();
    Swal.fire('강퇴처리 되었습니다.','','success');
  }
})
}

const onSubmitManager = () => {
  client.current.publish({
    destination: "/pub/chat/message",
    headers: { Authorization: Authorization },
    //전송할 데이터를 입력
    body: JSON.stringify({
      type: 6,
      message: user.memberId,
      roomId: roomId.id,
    }),
  });
};

const managerBtn = () =>{
  Swal.fire({
    title: "방장권한을 위임하시겠습니까?",
    html: `${user?.memberName}님에게 방장권한을 위임하시겠습니까?`,
    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
    cancelButtonColor: '#d33',
    showCancelButton: true,
    confirmButtonText: "위임",
    cancelButtonText: '취소',
}).then(result => {
  if(result.isConfirmed){
    onSubmitManager(); 
    Swal.fire('방장을 위임했습니다.','','success');
  }
})
}

const declareBtn =() =>{
  Swal.fire({
    title: '신고유형을 선택하세요',
    input: 'select',
    inputOptions: {
        "증오심 표현 또는 노골적 폭력":"증오심 표현 또는 노골적 폭력",
        "음란물": '음란물',
        "잘못된 정보": "잘못된 정보",
    },
    inputPlaceholder: '신고유형을 선택하세요',
    showCancelButton: true,
    inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
        else{
            client.current.publish({
            destination: "/pub/chat/message",
            headers: { Authorization: Authorization },
            //전송할 데이터를 입력
            body: JSON.stringify({
              type: 7,
              message: user.memberId,
              roomId: roomId.id,
              etc:value
            }),
          });
        }
    }
  }).then(result => {
    if(result.isConfirmed){
      Swal.fire(`${user?.memberName}님을 신고했습니다.`,'','success');
    }}
)
}

  return (
    <>
     {roomManager == userId ? (
      // 방장이 본인이면서 해당 카드가 본인일때
        user?.memberId == userId ? (
          <UserBox>
            <UserImgBox
              src={user?.memberImg}
            />
            <UserNameBox>👑{user?.memberName}</UserNameBox>
            
          </UserBox>
        ) : (
          //방장이 본인이면서 해당 카드가 본인이 아닐때
          <UserBox>
            <UserImgBox
              src={user?.memberImg}
            />
            <UserNameBox>{user?.memberName}</UserNameBox>
            <BtnBox>
            <ManagerBtn
            onClick={() => {
              managerBtn()
            }}
            >방장</ManagerBtn>
              <ExitBtn
              onClick={() => {
                banBtn()
              }}
            >
              OUT
            </ExitBtn>
            <DeclareBtn onClick={()=>{declareBtn()}}>신고</DeclareBtn>
            </BtnBox>

          </UserBox>
        )
      ) 
      ://다른사람이 방장일때
      ( roomManager == user?.memberId ? 
        (
        user?.memberId == userId 
        ?(
      <UserBox>
          <UserImgBox
            src={user?.memberImg}
          />
          <UserNameBox  >👑{user?.memberName}</UserNameBox>
          <BtnBox>
          <DeclareBtn onClick={()=>{declareBtn()}}>신고</DeclareBtn>
            </BtnBox>
        </UserBox>
        )
        :(
          <UserBox>
          <UserImgBox
            src={user?.memberImg}
          />
          <UserNameBox  >👑{user?.memberName}</UserNameBox>
          <BtnBox>
          <DeclareBtn onClick={()=>{declareBtn()}}>신고</DeclareBtn>
            </BtnBox>
        </UserBox>
        )
  
      ) : (
        //다른사람이 방장이 아닐때
        user?.memberId == userId 
        ?(
          <UserBox>
          <UserImgBox
            src={user?.memberImg}
          />
          <UserNameBox >{user?.memberName}</UserNameBox>
        </UserBox>
        )
        :(
          <UserBox>
          <UserImgBox
            src={user?.memberImg}
          />
          <UserNameBox >{user?.memberName}</UserNameBox>
          <BtnBox>
          <DeclareBtn onClick={()=>{declareBtn()}}>신고</DeclareBtn>
            </BtnBox>
        </UserBox>
        )

      )
      )
      }
    </>

  );
};

export default UserCard;

const UserBox = styled.div`
  height:content-fit;
  width:93%;
  display:flex;
   align-items:center;
  margin:0px 15px 0px 10px;
  padding-top: 5px;
`
const UserImgBox = styled.img`
 border-radius: 10px;
  object-fit:cover;
  width: 50px;
  height: 50px;
  padding: 5px;
`
const UserNameBox = styled.div`
  width: 100%;
`
const BtnBox = styled.div`
  display: flex;
  margin-left:auto;
  padding:5px;
`
const ExitBtn = styled.button`
  margin:0px 10px 0px 10px;
  width:40px;
  height: 30px;
  background: linear-gradient(#f03e3e,#e03131, #c92a2a);
  box-shadow: 2px 2px 2px #a6a7a9;
  color:white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
const ManagerBtn = styled.button`
  width:40px;
  height: 30px;
  background: linear-gradient(#4c6ef5,#3b5bdb,#364fc7);
  box-shadow: 2px 2px 2px #a6a7a9;
  color:white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
const DeclareBtn = styled.button`
  width:40px;
  height: 30px;
  background: linear-gradient(#0ca678,#099268,#087f5b);
  box-shadow: 2px 2px 2px #a6a7a9;
  color:white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
