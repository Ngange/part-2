import React from 'react'

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

  
  export default Course