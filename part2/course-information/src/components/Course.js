import React from "react";

const Course = (props) => {
  return (
    <div>
      {props.courses.map((course) => (
        <div key={course.id}>
          <Header headName={course.name}></Header>
          <Content parts={course.parts}></Content>
          <Total parts={course.parts}></Total>
        </div>
      ))}
    </div>
  );
};

export default Course;

const Header = (props) => {
  return <h1>{props.headName}</h1>;
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, i) => (
        <div key={i}>
          <Part name={part.name} exercises={part.exercises}></Part>
        </div>
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  const totalExercises = props.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return <div>Total of {totalExercises} exercises</div>;
};

