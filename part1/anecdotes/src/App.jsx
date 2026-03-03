import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
  return (<button onClick={handleClick}>{text}</button>)
}

const Anecdote = ({anecdote, vote}) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {vote} votes</p>
    </div>
  )
}

const Winner = ({total, anecdote, vote}) => {
  if (total == 0) {
    return <p>no votes gievn yet</p>
  } else {
    return (
      <div>
        <p>{anecdote}</p>
        <p>has {vote} votes</p>
      </div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  

  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState(Array(anecdotes.length).fill(0))
  const [total, setTotal] = useState(0)

  const handleNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
    
    console.log(random)
  } // updates selected so this eventHandler is used in displaying both anecdotes and votes

  const handleVote = () => {
    const copy = [...allVotes]
    copy[selected] += 1
    setAllVotes(copy)
    setTotal(total + 1)
    console.log(copy)
  }

  const topVote = Math.max(...allVotes)

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} vote={allVotes[selected]} />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleNext} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Winner total={total} anecdote={anecdotes[topVote]} vote={allVotes[topVote]} />
    </div>
  )
}

export default App