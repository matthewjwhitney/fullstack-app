import React, { Component } from "react";
import Header from "./Header";
import Main from "./Main";
import { CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class App extends Component {
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

export default withStyles(styles, { withTheme: true })(App);
