import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import StorageIcon from "@material-ui/icons/Storage";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar
});

class MenuList extends Component {
  render() {
    const { classes, theme } = this.props;

    return (
      <Fragment>
        <div className={classes.appBarSpacer} />
        <Divider />
        <List>
          <ListItem button component={Link} exact to="/MongoForm">
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary={"MongoDB Form"} />
          </ListItem>
          <ListItem button component={Link} exact to="/ReduxTodos">
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={"Redux Todos"} />
          </ListItem>
        </List>
      </Fragment>
    );
  }
}

MenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MenuList);
