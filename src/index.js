import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    const [votes, setVotes] = useState(new Array(7).fill(0));
    const [selected, setSelected] = useState({ id: anecdotes[0].id, anecdote: anecdotes[0].anecdote});
    const [mostVoted, setMostVoted] = useState(null);
    const [votesOfMostVoted, setVotesOfMostVoted] = useState(null);

    const handleNext = () => {
        const mappedAnecdotes = anecdotes.map((anecdote) => anecdote.anecdote);
        const randomAnecdote = mappedAnecdotes[Math.floor(Math.random() * anecdotes.length)];
        const randomAnecdoteObject = anecdotes.find((anecdote) => anecdote.anecdote === randomAnecdote);
        setSelected(randomAnecdoteObject);
    }

    const handleVote = () => {
        let copyArr = [...votes];
        const selectedIndex = selected.id;
        const oldVotes = copyArr[selectedIndex];
        copyArr[selectedIndex] = oldVotes + 1;
        setVotes(copyArr);

        const indexOfMax = copyArr.indexOf(Math.max(...copyArr));
        const mostVotedAnecdote = anecdotes[indexOfMax];
        setMostVoted(mostVotedAnecdote);

        const mostVotedVotes = Math.max.apply(Math, copyArr);
        setVotesOfMostVoted(mostVotedVotes);
    }

    return (
        <div>
            <h3>Anecdote of the day</h3>
            {`"${selected.anecdote}"`}
            <br />
            {`Votes: ${votes[selected.id]}`}
            <br />
            <br />
            <h3>Anecdote with the most votes</h3>
            {mostVoted !== null ? `"${mostVoted.anecdote}" Has ${votesOfMostVoted} votes.` : "Not votes yet"}
            <br />
            <br />
            <button onClick={() => handleVote()}>Vote</button>
            <button onClick={() => handleNext()}>Next anecdote</button>
        </div>
    )
}

const anecdotes = [
    { id: 0, anecdote: 'If it hurts, do it more often.'},
    { id: 1, anecdote: 'Adding manpower to a late software project makes it later!'},
    { id: 2, anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'},
    { id: 3, anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'},
    { id: 4, anecdote: 'Well, that was easy!'},
    { id: 5, anecdote: 'Premature optimization is the root of all evil.'},
    { id: 6, anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'}
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)