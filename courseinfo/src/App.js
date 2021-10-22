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

const Course = ({courses}) => {
  return (
    <div>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )
      })}
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}


export default App