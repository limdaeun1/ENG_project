import React from 'react'
import styled from 'styled-components'

const MypageBox = () => {
  const done = true;
  const name =localStorage.getItem("name")

  return (
    <>
      <UploadSection>
        <BorderSection>
          <Profil>
            <Name>
              <Avatar
                src="https://innertrip.co.kr/wp-content/uploads/2022/02/Try-gather-for-free-avatar.png"
                alt="profile"
              />
              <h2>{name}</h2>
            </Name>
            {/* <Hr /> */}
          </Profil>
        </BorderSection>
      </UploadSection>
  </>
  )
}

export default MypageBox

const UploadSection = styled.section`
border: none;
  width: 100%;
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 20px;
  padding: 1em;
`;

const BorderSection = styled.div`
border: none;
  max-width: 500px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* box-shadow: 0 2px 7px 1px rgb(64 60 67 / 16%); */
  margin-top: 1rem;
  border-radius: 15px;
  padding-bottom: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const Profil = styled.li`
border: none;
list-style:none;
  align-items: center;
  margin-bottom: 0.5em;
  border-radius: 15px;
  padding: 0.5em 3em;
  box-shadow: 6px 6px 8px 8px rgb(64 60 67 / 16%);
  max-width: 30rem;
  width: 80%;
  height: 75%;
  list-style: none;
`;

const Avatar = styled.img`
border: none;
  width: 10rem;
  height: 10rem;
  margin: 0.5em 1.5em 0.5em 1em;
  border-radius: 50%;
  height: 80%;
`;

const Name = styled.div`
border: none;
margin-top: 6%;
margin-left: 4%;
width: 100%;
height: 80%;
  display: flex;
  align-items: center;
  font-size: 0.8em;
`;

// const Hr = styled.hr`
//   border: none; 
//   border-top: solid 1px #ddd;
// `;

// const Menu = styled.div`
// border: solid purple;
//   display: flex;
//   padding: 10px;
//   align-items: center;
//   justify-content: center;
//   justify-content: space-between;


//   div {
//     border: solid purple;
//     border-radius: 1em;
//     box-shadow: 0 2px 7px 1px rgb(64 60 67 / 16%);
//     width: 150px;
//     height: 100px;
//     text-align: center;
//   }
//   button {
//     cursor: pointer;
//     transition: all 0.5s;
//     background-color: white;
//     border: 0;
//     color: gray;
//     font-size: medium;
//     &:hover {
//       color: black;
//     }
//   }
// `;

// const Div = styled.div`
//   border-radius: 1em;
//   box-shadow: 0 2px 7px 1px rgb(64 60 67 / 16%);
//   width: 150px;
//   height: 100px;
//   text-align: center;
//   line-height: 100px;
  
// `;

// const Input =styled.input`
//   width: 100px;
//   height: 17px;
//   position : relative;
//   bottom:70px;
//   border-radius: 10px;
//   border: solid 1px #ddd;
//   transition: border-color 300ms ease-in-out;
//   outline: none;
//   @media screen and (max-width: 700px) {
//     width: 77%;
//   }
//   &:focus {
//     border: solid 2px black;
//   }
//    `
