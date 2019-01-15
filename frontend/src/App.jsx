import React, { Component } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Menu from "./Menu/Menu";
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
      <CssBaseline>
        <div className={classes.root}>
          <Header />
          <Menu />
          <Main />
        </div>
      </CssBaseline>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
