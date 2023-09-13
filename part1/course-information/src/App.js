/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-09-13 22:40:27
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-09-13 23:43:55
 * @FilePath: \Fullstack2023\part1\course-information\src\App.js
 * @Description: 
 * 
 * Copyright (c) 2023 by zihao, All Rights Reserved. 
 */

import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.headName}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
        {props.parts.map((part, i) =>
          <div key={i}>
            <Part name = {part.name} exercises = {part.exercises}></Part>
          </div>
        )}
    </div>
  
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Total = (props) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>Total of {totalExercises} exercises</div>
  )
}

const Course = (props) => {
  return (
    <div>
      {props.courses.map((course) => 
        <div key={course.id}>
          <Header headName = {course.name}></Header>
          <Content parts = {course.parts}></Content>
          <Total parts = {course.parts}></Total>
        </div>
      )}
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

  return <div>
      <Course courses = {courses}></Course>
  </div>
}

export default App