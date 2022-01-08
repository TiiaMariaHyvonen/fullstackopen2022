import React, { useState } from 'react'

const Display = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => {
  return(
    <>
      <button onClick={handleClick}>
        {text}
      </button>
    </>
  )
}

const Anecdote = ({anecdote}) => <div> {anecdote} </div>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const len = anecdotes.length

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0 ,0, 0])

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * len))
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Display text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} />
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <Button handleClick={handleVote} text="vote" />
        <Button handleClick={handleNext} text="next anecdote" />
      </div>
      <Display text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} />
    </div>
  )
}

export default App