import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content list={course.parts} />
      <Total list={course.parts} />
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
  return (<p>{obj.name} {obj.exercises}</p>)
}

const Total = (props) => {
  let total_exercises = 0
  for (const obj of props.list){
    total_exercises += obj.exercises
  }
  return (
    <p>
      Number of exercises {total_exercises}
    </p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))