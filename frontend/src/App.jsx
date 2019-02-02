import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Menu from "./Menu/Menu";
import { CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import store from "./store";

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline>
            <div className={classes.root}>
              <Header />
              <Menu />
              <Main />
            </div>
          </CssBaseline>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
