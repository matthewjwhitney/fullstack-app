import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";

import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";

import MenuList from "./MenuList";

const drawerWidth = 184;

const styles = theme => ({
  appBarSpacer: {
    minHeight: 48
  },
  drawer: {
    width: drawerWidth,
    whiteSpace: "nowrap"
  },
  drawerClose: {
    width: 48,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowY: "auto"
  },
  paper: {
    boxShadow:
      " 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    border: "none"
  }
});

class Menu extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: this.props.preferences.expandedMenu,
          [classes.drawerClose]: !this.props.preferences.expandedMenu
        })}
        classes={{
          paper: classNames(classes.paper, {
            [classes.drawerOpen]: this.props.preferences.expandedMenu,
            [classes.drawerClose]: !this.props.preferences.expandedMenu
          })
        }}
        open={this.props.preferences.expandedMenu}
      >
        <div className={classes.appBarSpacer} />
        <MenuList {...this.props} />
      </Drawer>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default connect(({ preferences }) => ({ preferences }))(
  withStyles(styles, { withTheme: true })(Menu)
);
