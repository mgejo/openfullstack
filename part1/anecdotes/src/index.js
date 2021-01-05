import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const anecdotes = props.anecdotes
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const select_quote = () => {
    const get_rand = () => Math.floor(Math.random() * anecdotes.length)
    let rand
    do{
      rand = get_rand()
    }
    while(rand === selected)
    setSelected(rand)
  }
  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  const mostVoted = votes.indexOf(Math.max(...votes))
  return (
    <div>
      <Display anecdote={anecdotes[selected]} votes={votes[selected]} text="Anecdote of the day" />
      <button onClick={() => select_quote()}>next anecdote</button>
      <button onClick={() => vote()}>vote</button>
      <Display anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} text="Anecdote with most votes" />
    </div>

  )
}


const Display = ({anecdote, votes, text}) => (
  <div>
    <h1>{text}</h1>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)