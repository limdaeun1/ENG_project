import React from 'react'
import styled from 'styled-components'

const SCScriptlist = () => {
  return (
    <Box>
        <Listbox>
           <p>#연애,#미드,#영화</p>
        </Listbox>
        <Listbox>
        <p>#연애,#미드,#영화</p>
        </Listbox>
        <Listbox>
        <p>#연애,#미드,#영화</p>
        </Listbox>
    </Box>
  )
}

export default SCScriptlist

const Box = styled.div`
width: 100%;
min-width: 360px;
height: 65px;
padding-left:10px;
padding-top: 30px;
`

const Listbox = styled.div`
    background-color: white;
    width: 80%;
    min-width: 260px;
    margin-left: 20px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
    transition: all 0.5s;
    &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 1px, rgb(51, 51, 51) 0px 0px 0px 1.7px;
    }
    border-radius: 10px;
    margin-top: 10px;
`