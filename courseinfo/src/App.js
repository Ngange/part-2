import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

// used .reduce to calculate total number of exercises
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) =>
    sum + part.exercises, 0)
  return(
    <h4>
      Total of {total} exercises
    </h4>
  ) 
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>    
  )
}

const Content = ({parts}) => {
  return(
    <>

      {parts.map(({name, exercises, id}) => (
        <Part name ={name} exercises={exercises} key={id} />
      ))}

    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


export default App