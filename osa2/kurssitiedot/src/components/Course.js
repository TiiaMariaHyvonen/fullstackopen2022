import React from 'react'

const Header = ({course}) => {
    return (
      <>
        <h1> {course} </h1>
      </>
    )
  }
  
  const Part = ({part}) => {
    return (
      <>
        <p> {part.name} {part.exercises}</p>
      </>
    )
  }
  
  const Content = ({parts}) => {
    const result = parts.map(part => <Part key={part.id} part={part} />)
    return (
      <div>
        {result}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const exercises  = parts.map(part => part.exercises)
    const sum = exercises.reduce(reducer)
    
    return(
      <div>
        <h4>Number of exercises {sum}</h4>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }

export default Course