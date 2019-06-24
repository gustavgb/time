/* global alert */

import React from 'react'
import styled from 'styled-components'
import { useFetch } from 'utils/fetch'

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid black;
`

const App = () => {
  const [{ data, isLoading, isError }] = useFetch(
    'http://localhost:3000/api/test',
    {
      name: '',
      bio: ''
    }
  )
  const {
    name, bio
  } = data

  return (
    <Wrapper>
      {isLoading && (<span>Loading...</span>)}
      {!isLoading && !isError && (
        <div>
          <div><strong>{name}</strong></div>
          <div><em>{bio}</em></div>
        </div>
      )}
      <a href='https://google.com' onClick={(e) => { e.preventDefault(); alert('Nope') }}>Test</a>
    </Wrapper>
  )
}

export default App
