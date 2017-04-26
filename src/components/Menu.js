import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = ({ children }) => (
  <div className="menu">
    <ul>
      <NavLink exact to="/" activeClassName="active">
        page A
      </NavLink>
      {'  '}
      <NavLink to="/page-b" activeClassName="active">
        page B
      </NavLink>
    </ul>
  </div>
)

export default Menu
