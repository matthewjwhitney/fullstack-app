import React, { Component } from "react";
import Header from "./Header";
import Main from "./Main";
import { connect } from "react-redux";
import { simpleAction } from "./actions/simpleAction";
import { CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class App extends Component {
  simpleAction = event => {
    this.props.simpleAction();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <Main />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default withStyles(
  styles,
  { withTheme: true },
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);
