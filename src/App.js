import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Generator from "./views/Generator"
import Survey from "./views/Survey"
import Answer from "./views/Answer"

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Generator />
          </Route>
          <Route exact path="/survey/:id">
            <Survey />
          </Route>
          <Route path="/survey/:id/answer">
            <Answer />
          </Route>
        </Switch>
    </Router>
  )
}