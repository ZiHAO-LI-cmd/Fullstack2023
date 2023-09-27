/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-09-21 00:09:34
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-09-22 00:54:46
 * @FilePath: \Fullstack2023\part1\course-information\src\App.jsx
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const App = () => {
  // const course = "Half Stack application development";
  // const part1 = "Fundamentals of React";
  // const exercises1 = 10;
  // const part2 = "Using props to pass data";
  // const exercises2 = 7;
  // const part3 = "State of a component";
  // const exercises3 = 14;

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = (props) => {
    return <h1>{props.header}</h1>;
  };

  const Content = (props) => {
    return (
      <div>
        <Part part_name={props.parts[0][0]} exercises={props.parts[0][1]} />
        <Part part_name={props.parts[1][0]} exercises={props.parts[1][1]} />
        <Part part_name={props.parts[2][0]} exercises={props.parts[2][1]} />
      </div>
    );
  };

  const Part = (props) => {
    return (
      <p>
        {props.part_name} {props.exercises}
      </p>
    );
  };

  const Total = (props) => {
    let sum = props.exercises.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    return <p>Number of exercises {sum}</p>;
  };

  return (
    <div>
      <Header header={course.name} />
      <Content
        parts={[
          [course.parts[0].name, course.parts[0].exercises],
          [course.parts[1].name, course.parts[1].exercises],
          [course.parts[2].name, course.parts[2].exercises],
        ]}
      />
      <Total
        exercises={[
          course.parts[0].exercises,
          course.parts[1].exercises,
          course.parts[2].exercises,
        ]}
      />
    </div>
  );
};

export default App;
