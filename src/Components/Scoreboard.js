import React from 'react'

const scoreboard = ({children, cc, ...props}) => {
  return (
    <div>
        <span>{cc}</span>
        <div>{children}</div>
    </div>
  )
}

export default scoreboard