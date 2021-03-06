const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.id
      console.log('VOTED')
      const votedAnecdote = state.find(n => n.id === id)
      let votes = votedAnecdote.votes + 1
      
      const anecdoteToBeVoted = {content: votedAnecdote.content, id: votedAnecdote.id, votes: votes}
      console.log(votedAnecdote)
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : anecdoteToBeVoted
      )
    case 'NEW':
      const content = action.content
      var newAnecdote = {
        content: content,
        id: getId(),
        votes: 0
      }
      return state.concat(newAnecdote)        
    default:
      return state
  }
}
export const voteAnecdote = (id) => {
  console.log('voted')
  return {
    type: 'VOTE',
    id: id
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'NEW',
    content: content
  }
}

export default reducer