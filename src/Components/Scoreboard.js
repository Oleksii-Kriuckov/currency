import React from 'react'

const scoreboard = ({ children, cc }) => { //Перейменувати сс
  return (
    <div className='d-flex'>
      <span>1 {cc} = </span>
      <div className='rate mx-2'>{children} </div>
      <span>UAH</span>
    </div>
  )
}

export default scoreboard