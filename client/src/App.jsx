import React, { Component, Fragment } from "react";
import TestForm from "./TestForm";
import NavBar from "./NavBar";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <TestForm />
      </Fragment>
    );
  }
}

export default App;
