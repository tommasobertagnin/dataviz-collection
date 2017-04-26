import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = ({ children }) => (
  <div className="menu">
    <ul>
      <NavLink exact to="/" activeClassName="active">
        BAR CHART
      </NavLink>
      {'  '}
      <NavLink to="/scatterplot" activeClassName="active">
        SCATTERPLOT
      </NavLink>
    </ul>
  </div>
)

export default Menu
