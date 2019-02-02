import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: 2,
    borderRadius: 0
  }
});

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" noWrap>
            Matthew J Whitney
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default connect(({ preferences }) => ({ preferences }))(
  withStyles(styles, { withTheme: true })(Header)
);
