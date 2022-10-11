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
  height: 200px;
  margin-top:10%;
  width: 100%;
  ul {
    display: flex;
    height: 100%;
    /* width:100%; */
    justify-content: center;
    /* border: solid 1px; */
    border: none;
    li {
      /* border: solid 1px; */
      border: none;
      list-style: none;
      width: 10%;
      color: gray;
      min-width: 60px;
      padding-top: 6%;
      font-size: 0.9rem;
      text-align : center;
      justify-content : center;
      align-items : center;
    }
  }
`;