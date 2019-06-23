/* global alert */

import React, { useState } from 'react'
import styled from 'styled-components'
import { useFetch } from 'utils/fetch'

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid black;
`

const App = () => {
  const [username, setUsername] = useState('gustavgb')
  const [{ data, isLoading, isError }, doFetch] = useFetch(
    'https://api.github.com/users/gustavgb',
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
      <form onSubmit={(e) => { e.preventDefault(); doFetch(`https://api.github.com/users/${username}`) }}>
        <input
          type='text'
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <button type='submit'>Get user</button>
      </form>
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
