import React from "react";
import styled from "styled-components";

const CSUserCard = ({user, Authorization,roomId,client,userId,roomManager,}) => {
  console.log(roomManager);
  console.log(userId);
  console.log(user.memberId);

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

  return (
    <>
      {roomManager == userId ? (
        user?.memberId == userId ? (
          <UserBox>
            <UserImgBox
              src={user?.memberImg}
            />
            <UserNameBox>👑{user?.memberName}</UserNameBox>
          </UserBox>
        ) : (
          <UserBox>
            <UserImgBox
              src={user?.memberImg}
            />
            <UserNameBox>{user?.memberName}</UserNameBox>
            <BtnBox>
              <ManagerBtn>방장</ManagerBtn>
              <ExitBtn
              onClick={() => {
                if (window.confirm("강퇴 오키?") === true) {
                  return onSubmitBan();
                } else {
                  return alert("강퇴 취소");
                }
              }}
            >
              OUT
            </ExitBtn>
            </BtnBox>
            
          </UserBox>
        )
      ) : roomManager == user?.memberId ? (
        <UserBox>
          <UserImgBox
            src={user?.memberImg}
          />
          <UserNameBox>👑{user?.memberName}</UserNameBox>
        </UserBox>
      ) : (
        <UserBox>
          <UserImgBox
            src={user?.memberImg}
          />
          <UserNameBox>{user?.memberName}</UserNameBox>
        </UserBox>
      )}
    </>
  );
};

export default CSUserCard;
const UserBox = styled.div`
  /* border: 1px solid black; */
  height: content-fit;
  width: 93%;
  display: flex;
  align-items: center;
  margin: 0px 15px 0px 10px;
  padding-top: 5px;
`;
const UserImgBox = styled.img`
  border-radius: 10px;
  object-fit: cover;
  width: 50px;
  height: 50px;
  padding: 5px;
`;
const UserNameBox = styled.div`
  width: 30%;
`;
const BtnBox = styled.div`
  display: flex;
  margin-left:auto;
  padding:5px;
`
const ExitBtn = styled.button`
  margin-left:10px;
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
  /* margin-left:auto; */
  width:40px;
  height: 30px;
  background: linear-gradient(#4c6ef5,#3b5bdb,#364fc7);
  box-shadow: 2px 2px 2px #a6a7a9;
  color:white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
