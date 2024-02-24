/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-14 01:48:23
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-14 04:03:10
 * @FilePath: \Fullstack2023\part5\bloglist-frontend\src\components\Togglable.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
