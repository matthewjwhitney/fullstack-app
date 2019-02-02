import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";
import { toggleExpandedMenu } from "../actions/preferences";

const styles = theme => ({
  icon: {
    textAlign: "center",
    marginLeft: 11
  },
  listItemText: {
    paddingLeft: 0
  }
});

class MenuList extends Component {
  render() {
    const { classes, theme } = this.props;

    return (
      <Fragment>
        <List disablePadding>
          <ListItem
            button
            disableGutters
            divider
            onClick={() => {
              this.props.onToggleExpandedMenu();
            }}
          >
            {this.props.preferences.expandedMenu ? (
              <Fragment>
                <ListItemIcon>
                  <Icon
                    className={classNames(
                      classes.icon,
                      `fa fa-angle-double-left`
                    )}
                  />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary={"Collapse Menu"}
                />
              </Fragment>
            ) : (
              <ListItemIcon>
                <Icon
                  className={classNames(
                    classes.icon,
                    `fa fa-angle-double-right`
                  )}
                />
              </ListItemIcon>
            )}
          </ListItem>
          <ListItem
            button
            disableGutters
            component={NavLink}
            exact
            to="/MongoForm"
            divider
          >
            <ListItemIcon>
              <Icon className={classNames(classes.icon, `fas fa-database`)} />
            </ListItemIcon>
            <ListItemText
              className={classes.listItemText}
              primary={"MongoDB Form"}
            />
          </ListItem>
          <ListItem
            disableGutters
            button
            component={NavLink}
            exact
            to="/ReduxTodos"
            divider
          >
            <ListItemIcon>
              <Icon
                className={classNames(classes.icon, `fas fa-clipboard-list`)}
              />
            </ListItemIcon>
            <ListItemText
              className={classes.listItemText}
              primary={"Redux Todos"}
            />
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

const mapDispatchToProps = dispatch => ({
  onToggleExpandedMenu: () => {
    dispatch(toggleExpandedMenu());
  }
});

export default connect(
  ({ preferences }) => ({ preferences }),
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MenuList));
