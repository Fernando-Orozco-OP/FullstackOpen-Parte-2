const Header = (props) => { return ( <div> <h1>{props.course.name}</h1> </div> ); }; 

const Part = (props) => { 
  return ( 
    <div> 
      <p> {props.part} {props.exercises} </p> 
    </div> 
  ); 
}; 

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Course = (props) => { 
  return ( 
    <div> 
      <Header course={props.course} /> 
      <Content course={props.course} /> 
      <Total course={props.course} /> 
    </div> 
  ); 
}; 

const Total = (props) => {
  const total = props.course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return <p><strong>total of {total} exercises</strong></p>;
};

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
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App;