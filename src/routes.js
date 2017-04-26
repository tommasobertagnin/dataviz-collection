import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PageA from './components/PageA'
import PageB from './components/PageB'
import Menu from './components/Menu'

export default <div>
  <Menu />
  <Switch>
    <Route exact path="/" component={PageA} />
    <Route path="/page-b" component={PageB} />
    <Route render={() => (
      // 404 page...
      <div className="page">
        <p className="header L">
          Sorry... What were you looking for? :-)
        </p>
      </div>
    )} />
  </Switch>
</div>
