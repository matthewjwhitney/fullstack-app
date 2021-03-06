import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MongoForm from "./MongoForm";
import ReduxTodos from "./ReduxTodos";

const styles = theme => ({
  appBarSpacer: {
    height: 48
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    height: "100vh",
    overflow: "auto"
  }
});
class Main extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route exact path="/MongoForm" component={MongoForm} />
          <Route exact path="/ReduxTodos" component={ReduxTodos} />
        </Switch>
      </main>
    );
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);
