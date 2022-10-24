import React, { useEffect } from "react";
import styled from "styled-components";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRoom } from "../../redux/modules/chatroom";
import { useNavigate } from "react-router-dom";
import reload from "../../img/reload.png"
import Swal from "sweetalert2";

const AddRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [studyName, setStudyName] = useState("")
  const [category, setCategory] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const [type, setType] = useState(false)
  const [password, setPassWord] = useState("");
  const videoRef = React.useRef(null); 
  console.log(password)

  const img =["https://cdn.pixabay.com/photo/2022/06/14/19/37/leaves-7262727__340.jpg",
"https://cdn.pixabay.com/photo/2022/07/03/22/00/cat-7300029__340.jpg",
"https://cdn.pixabay.com/photo/2022/04/20/20/23/bee-7146136__340.jpg",
"https://cdn.pixabay.com/photo/2022/07/13/08/06/trees-7318791__340.jpg",
"https://cdn.pixabay.com/photo/2016/11/19/16/56/adventure-1840310__340.jpg",
"https://cdn.pixabay.com/photo/2019/03/27/15/24/animal-4085255__340.jpg"]

const basicImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
const [preview, setPreview] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

  const roomData = {
      roomName : studyName,  
      category : category ,
      maxEnterMember : memberCount,
      lock : type,
      roomPw :password ,
      roomImage:preview,
  }

  const onChangeFalse = () => {
    setType(false)
    setPassWord("")
  }

  const onChangeTrue = () => {
    setType(true)
  }

  //방 만든 후 생성한 방으로 바로 입장
  const createRommhandle = async () => {
    try {
      const response = await dispatch(createRoom(roomData)).unwrap();
      if(response.data.data.roomId !== null) {
        if(response.data.data.category === "캠스터디") {
        navigate("/camchat/" + response.data.data.roomId ,{state:response.data.data})}
        else {
        navigate("/scriptchat/" + response.data.data.roomId ,{state:response.data.data})
        }
      }
    } catch (error) {
      Swal.fire({
        title: '방 만들기에 실패하였습니다!', 
        icon: 'error', 
      });
    }
  };

  useEffect(()=> {
    navigator.mediaDevices.getUserMedia({ video: true ,audio:true })
  },[])

  const makeRoom = () => {
    if (type === true && password === "") {
      Swal.fire({
        title: '비밀번호를 입력하세요.', 
        icon: 'warning', 
      });
    }
    else if(studyName === ""||category === "" || memberCount ===""){
      Swal.fire({
        title: '필수값을 입력하세요.', 
        icon: 'warning', 
      });
    }
   else{
    createRommhandle()
   }
  }

  return (
    <>
    <Bigcontainer>
      <Container 
      // onSubmit={makeRoom}
      >
           <Inputcontainer>
            <NameBox>방제목</NameBox>
            <>
            <InputBox placeholder="Study Name" onChange={(e)=>setStudyName(e.target.value)}/>
            {studyName == "" ?(<div style={{fontSize:"9px", color:"red"}}>필수</div>):(
              <div style={{fontSize:"10px", color:"green"}}>완료</div>
            )}
            </>
          </Inputcontainer>
          
          <Inputcontainer>
            <NameBox>카테고리</NameBox>
            <>
            <SelectBox
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled hidden>
                카테고리를 선택하세요
              </option>
              <option>스크립트</option>
              <option>캠스터디</option>
            </SelectBox>
             {category == "" ?(<div style={{fontSize:"9px", color:"red"}}>필수</div>):(
              <div style={{fontSize:"10px", color:"green"}}>완료</div>
             )}
            </>
          </Inputcontainer>

<Inputcontainer>
<NameBox style={{marginBottom:"auto"}}>대표사진</NameBox>

         <SlideContainer>
        <StyledSlider {...settings}>
        {img.map((img, i)=>{return <CardBox key = {i}>
           <CardImg src={img} onClick={()=>{setPreview(img)}} />
          </CardBox>})}
        </StyledSlider>
                  <div className="preview">
          {/* <h4>미리보기</h4> */}
          <div style={{display:"flex", marginTop:"10%"}}>
           {img && <CardImg src={preview} alt="preview-img" />}
        <ReloadImg src ={reload} onClick={()=>{setPreview(basicImg)}}/>
          </div>
      </div>
          </SlideContainer>
</Inputcontainer>
         
          <Inputcontainer>
          {category === "캠스터디" 
          ?(     
            <>    
          <NameBox>참가인원</NameBox>
          <SelectBox
            value={memberCount}
            onChange={(e) => setMemberCount(e.target.value)}
          >
            <option value="" disabled hidden>
              인원수를 선택하세요
            </option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </SelectBox></> ) 
          :(
            <>
          <NameBox>참가인원</NameBox>
            <SelectBox
              value={memberCount}
              onChange={(e) => setMemberCount(e.target.value)}
            >
              <option value="" disabled hidden>
                인원수를 선택하세요
              </option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </SelectBox></>)
            }
          {memberCount == "" ?(<div style={{fontSize:"10px", color:"red"}}>필수</div>):(
            <div style={{fontSize:"9px", color:"green"}}>완료</div>
          )}
          </Inputcontainer>



          <Inputcontainer>
          <NameBox>방설정</NameBox>
          {type === false 
          
          ?
          <div style={{display:"flex",width:"70%",margin:"auto",alignItems:" center"}}>
           <div>일반방 <input value="일반방" type="radio" name="type" checked="checked" onChange={()=>{onChangeFalse()}}/></div>
           <div>비밀방<input value="비밀방" type="radio" name="type" onChange={()=>{onChangeTrue()}}/></div>
           
           
          </div> 
          :
          <div  style={{display:"flex",width:"70%",margin:"auto",alignItems:" center" }}>
           <div>일반방 <input value="일반방" type="radio" name="type"  onChange={()=>{onChangeFalse()}}/></div>
           <div>비밀방 <input value="비밀방" type="radio" name="type" onChange={()=>{onChangeTrue()}}/></div>
           <PasswordBox value={password ||""}
              onChange={(e) => setPassWord(e.target.value)} type = "password" placeholder="4자리" name = "password" id = "password"/>
           {password == "" ?(<div style={{fontSize:"10px", color:"red"}}>필수</div>):(
            <div style={{fontSize:"9px", color:"green"}}>완료</div>
          )}
          </div> }
          </Inputcontainer>

        <BtnContainer>
            <AddRoomBtn 
            onClick={makeRoom}
            >방만들기</AddRoomBtn>
            <LeaveRoom onClick={()=>navigate("/list")}>뒤로 가기</LeaveRoom>
          </BtnContainer>
      </Container>
      </Bigcontainer>
    </>
  );
};

export default AddRoom;

const Bigcontainer = styled.div`
border: none;
width:100%;
min-width:900px;
min-height:1210px;
`;


const Container = styled.div`
border: none;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width:73%;
  height: 1000px;
  min-width: 600px;
  margin:auto;
  margin-top:120px;
  background-color: #e9ecef;
  align-items: center;
  box-shadow: 4px 4px 4px #dee2e6;
`;


const Inputcontainer = styled.div`
  display: flex;
  width: 70%;
  height: 100%;
  margin: 3% auto 3%  auto;
  align-items:center;
  justify-content: center;
  border: none;
`;
const SlideContainer = styled.div`
  width: 70%;
  height: 100%;
  margin: 0px auto 0px auto;
  align-items:center;
  border: none;
  justify-content: center;
`;

const LeaveRoom = styled.button`
  display :block;
  margin : 0 auto;
  margin-bottom : 15px;
  font-size : 15px;
  text-decoration:underline;
  color :  #929292;
  cursor: pointer;
  background : none;
  border : none;
`;

const NameBox = styled.div`
  width: 80px;
  height: 30px;
  font-size: 14px;
  border-radius: 5px;
  text-align: center;
  font-weight: 600;
  line-height: 30px;
  margin-right: 40px;
`;

const InputBox = styled.input`
  width: 70%;
  height: 25px;
  border-radius: 5px;
  text-align: center;
  margin: 0 auto 0 auto;
  border:none;
  outline:none;
  &:focus {
    border: solid 1px #8ce99a;
  }
`;

const PasswordBox = styled.input`
  width: 90px;
  height: 20px;
  border-radius: 5px;
  text-align: center;
  margin: 0 20px 0 20px;
  border:none;
  outline:none;
  transition: border-color 300ms ease-in-out;
  outline: none;
  &:focus {
    border: solid 1px #8ce99a;
  }
`;

const BtnContainer = styled.div`
  margin-top: auto;
  width: 30%;
  text-align: center;
  border: none;
`;

const AddRoomBtn = styled.button`
  margin: 0 auto 10% auto;
  padding: 10px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  width: 100px;
  background: #fcc419;
  outline: none;
  border-radius: 10px;
  border:none;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
`;

const SelectBox = styled.select`
  width: 70%;
  height: 30px;
  border-radius: 5px;
  margin: 0 auto 0 auto;
  outline: none;
  border:none;
  &:focus {
    border: solid 1px #8ce99a;
  }
  
`;


const StyledSlider = styled(Slider)`
  .slick-list {
    width: 100%;
    min-width: 300px;
    height: 100%;
    align-items: center;
  }
  .slick-slide img {
    display: block;
    width: 95%;
    
}
  .slick-slide div {
    cursor: pointer;
    outline: none;
  }

  .slick-dots {
  }
  .slick-arrow {
  }

  .slick-track {
    overflow-x: hidden;
    min-width: 400px;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;
const CardBox = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CardImg = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  object-fit:cover;
  margin: 0px;
  box-shadow: 2px 2px 2px #a6a7a9;
  &:hover {
    transform: scale(0.9);
    transition: all 0.2s linear;
    overflow:hidden ;
  }
`;
const ReloadImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 0 0 auto 2%;
  &:hover {
    transform: scale(1.2);
    transition: all 0.2s linear;
  }
`;