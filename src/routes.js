import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './components/Menu'
import BarChart from './containers/BarChart'
import Scatterplot from './containers/Scatterplot'

export default <div>
  <Menu />
  <div className="page">
    <Switch>
      <Route exact path="/" component={BarChart} />
      <Route path="/scatterplot" component={Scatterplot} />
      <Route render={() => (
        // 404 page...
          <p className="header L">
            Sorry... What were you looking for? :-)
          </p>
      )} />
    </Switch>
  </div>
</div>
