/**
 * UI KIT
 * 
 * main.js
 * webpack entry file
 */

// styles
import css from './scss/index.scss'

// js
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

import configureStore from './store/configureStore'
import routes from './routes'

const store = configureStore()

render(
  <Root store={store} routes={routes}/>,
  document.getElementById('root')
)
