import React from 'react'
import styled from 'styled-components'

const MypageBox = () => {
  const done = true;
  const name =localStorage.getItem("name")
  const img =localStorage.getItem("userImg")

  return (
    <>
      <UploadSection>
        <BorderSection>
          <Profil>
            <Name>
              <Avatar
                src={img}
                alt="profile"
              />
              <h2>{name}</h2>
            </Name>
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
  min-width: 490px;
  height: 370px;
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
  width: 80%;
  height: 75%;
  list-style: none;
`;

const Avatar = styled.img`
border: none;
  width: 10rem;
  height: 10rem;
  margin: 0.5em 1.5em 0.5em 1em;
  border-radius: 15%;
  height: 80%;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
    cursor: pointer;
  }
`;

const Name = styled.div`
border: none;
margin-top: 6%;
margin-left: 2%;
width: 100%;
height: 80%;
  display: flex;
  align-items: center;
  font-size: 0.8em;
`;

