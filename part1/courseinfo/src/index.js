import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const part_exercise_list = [
    {
      name:part1,
      excercises:exercises1
    },
    {
      name:part2,
      excercises:exercises2
    },
    {
      name:part3,
      excercises:exercises3
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content list={part_exercise_list} />
      <Total list={part_exercise_list} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Content = (props) => {
  let items = []
  for (const [index, obj] of props.list.entries()){
    items.push(<Part key={index} obj={obj}/>)
  }
  return (
    <div>
      {items}
    </div>
    )
}

const Part = (props) => {
  const obj = props.obj
  return (<p>{obj.name} {obj.excercises}</p>)
}

const Total = (props) => {
  let total_exercises = 0
  for (const obj of props.list){
    total_exercises += obj.excercises
  }
  return (
    <p>
      Number of exercises {total_exercises}
    </p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))