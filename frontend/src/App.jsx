import React, { Component, Fragment } from "react";
import Header from "./Header";
import Main from "./Main";
import { connect } from "react-redux";
import { simpleAction } from "./actions/simpleAction";

class App extends Component {
  simpleAction = event => {
    this.props.simpleAction();
  };
  render() {
    return (
      <Fragment>
        <Header />
        <Main />
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
