import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  Divider,
  ListItemText
} from "@material-ui/core";

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class MongoForm extends Component {
  // initialize the state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  componentWillMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("/api/putData", {
      id: idToBeAdded,
      message: message
    });
  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };

  render() {
    const { data } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper className={this.props.paper} elevation={1}>
          <List>
            {data.length <= 0 ? (
              <ListItem>
                <ListItemText>No Database Entries Yet</ListItemText>
              </ListItem>
            ) : (
              data.map(dat => (
                <Fragment>
                  <ListItem key={data.message}>
                    <ListItemText primary={`id: ${dat.id}`} />
                  </ListItem>
                  <ListItem key={data.message}>
                    <ListItemText primary={`data: ${dat.message}`} />
                  </ListItem>
                  <Divider />
                </Fragment>
              ))
            )}
          </List>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              type="text"
              onChange={e => this.setState({ message: e.target.value })}
              placeholder="item to add"
              className={classes.textField}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.putDataToDB(this.state.message)}
            >
              ADD
            </Button>

            <TextField
              type="text"
              className={classes.textField}
              margin="normal"
              onChange={e => this.setState({ idToDelete: e.target.value })}
              placeholder="id of item to delete"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.deleteFromDB(this.state.idToDelete)}
            >
              DELETE
            </Button>

            <TextField
              type="text"
              className={classes.textField}
              margin="normal"
              onChange={e => this.setState({ idToUpdate: e.target.value })}
              placeholder="id of item to update"
            />
            <TextField
              type="text"
              className={classes.textField}
              margin="normal"
              onChange={e => this.setState({ updateToApply: e.target.value })}
              placeholder="new value of item"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() =>
                this.updateDB(this.state.idToUpdate, this.state.updateToApply)
              }
            >
              UPDATE
            </Button>
          </form>
        </Paper>
      </Fragment>
    );
  }
}

MongoForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MongoForm);
