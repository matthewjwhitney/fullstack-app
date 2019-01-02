import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import TestForm from "./TestForm";

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={TestForm} />
          {/* <Route path="/Example" component={Example} /> */}
        </Switch>
      </main>
    );
  }
}

export default Main;
