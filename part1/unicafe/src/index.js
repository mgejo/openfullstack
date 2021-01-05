import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const state_good = {count:good, setter:setGood}
  const state_neutral = {count:neutral, setter:setNeutral}

  const state_bad = {count:bad, setter:setBad}

  const increment = ({count, setter}) => {
    setter(count+1)
  }


  const stats = {
    good:good,
    neutral:neutral,
    bad:bad
  }


  return (
    <div>
      <Title text="give feedback"/>
      <Button text="good" handler={() => increment(state_good)}/>
      <Button text="neutral" handler={() => increment(state_neutral)}/>
      <Button text="bad" handler={() => increment(state_bad)}/>
      <Title text="statistics"/>
      <Statistics stats={stats}/>

    </div>
  )
}

const Button = ({text, handler}) => (
  <button onClick={handler}>{text}</button>
)

const Title = ({text}) => (
  <h1>{text}</h1>
)

const Statistic = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({stats}) =>{
  const good = stats.good
  const bad = stats.bad
  const neutral = stats.neutral
  const total = good + neutral + bad
  const average = (good - bad)/total
  const positive = good/total

  if (total === 0){
    return(<p>No feedback given</p>)
  }
  return(
    <table>
      <tbody>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={total}/>
        <Statistic text="average" value={average}/>
        <Statistic text="positive" value={(positive * 100).toString() + " %"}/>
      </tbody>
    </table>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)