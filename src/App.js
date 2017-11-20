import React from 'react'
import Datastore from './Datastore'
import Homepage from './Homepage'
import Project from './Project'
import {
  BrowserRouter as Router,
  Route, Redirect, Switch
} from 'react-router-dom'

function GetRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const MainRouter = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Redirect from="/random" to={"/p/"+Datastore[GetRandom(0, Datastore.length)]}/>
        <Route path="/p/:author/:project/" component={Project}/>
      </Switch>
    </div>
  </Router>
)


export default MainRouter
