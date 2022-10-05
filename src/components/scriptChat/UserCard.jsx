import React from "react";

const UserCard = ({ user, Authorization, roomId, client, userId, roomManager }) => {
console.log(roomManager)
console.log(userId)
console.log(user.memberId)

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
{ 
roomManager == userId 
 ? (
  user?.memberId == userId
?    
<div style={{height:"content-fit",width:"90%",display:"flex", alignItems:"center", padding:"10px"}}>
      <img
      style={{objectFit:"cover", width:"50px", height:"50px"}}
        src={user?.memberImg}
      />
      👑{user?.memberName}
    </div> 
    :
    <div style={{height:"content-fit",width:"90%",display:"flex", alignItems:"center", padding:"10px"}}>
      <img
      style={{objectFit:"cover", width:"50px", height:"50px"}}
        src={user?.memberImg}
      />
      {user?.memberName}
       <button style={{marginLeft:"auto"}}
        onClick={() => {
          if (window.confirm("강퇴 오키?") === true) {
            return onSubmitBan()
          } else {
            return alert("강퇴 취소")
          }
        }}
      >강퇴
      </button>
    </div>
 )
 : 
 (roomManager == user?.memberId ? 
  <div style={{height:"content-fit",width:"90%",display:"flex", alignItems:"center", padding:"10px"}}>
  <img
  style={{objectFit:"cover", width:"50px", height:"50px"}}
    src={user?.memberImg}
  />
  👑{user?.memberName}
 </div>
 :
 <div style={{height:"content-fit",width:"90%",display:"flex", alignItems:"center", padding:"10px"}}>
 <img
 style={{objectFit:"cover", width:"50px", height:"50px"}}
   src={user?.memberImg}
 />
 {user?.memberName}
</div>
)

    }
    </>

  );
};

export default UserCard;
