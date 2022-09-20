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
  background-color: #ecebebe3;
  height: 200px;
  margin-top: 10px;
  width: 100%;
  ul {
    display: flex;
    padding: 50px;
    justify-content: center;
    li {
      list-style: none;
      padding: 20px;
      color: gray;
      min-width: 70px;
    }
  }
`;