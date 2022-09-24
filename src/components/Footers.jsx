import React from 'react'
import styled from 'styled-components'

const Footers = () => {
  return (
    <Footertxt>
    <ul>
      <li>FE이예솔</li>
      <li>FE김보미</li>
      <li>FE임다은</li>
      <li>BE정동섭</li>
      <li>BE정민우</li>
      <li>BE임소윤</li>
    </ul>
  </Footertxt>
  )
}

export default Footers

const Footertxt = styled.div`
border: none;
font-size: 15px;
  background-color: #ecebebe3;
  height: 100%;
  margin-top:10%;
  width: 100%;
  ul {
    display: flex;
    padding: 3%;
    justify-content: center;
    li {
      list-style: none;
      padding: 3%;
      color: gray;
      min-width: 3%;
      font-size: 1rem;
    }
  }
`;