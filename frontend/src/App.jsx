import React, { Component, Fragment } from "react";
import NavBar from "./NavBar";
import Content from "./Content";
import { connect } from "react-redux";
import { simpleAction } from "./actions/simpleAction";

class App extends Component {
  simpleAction = event => {
    this.props.simpleAction();
  };
  render() {
    return (
      <Fragment>
        <NavBar />
        <button onClick={this.simpleAction}>Test redux action</button>
        <Content />
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
