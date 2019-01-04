import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { TextField, Button, Paper } from "@material-ui/core";

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

  // when component mounts, first thing it does is fetch all existing data in the db
  // then we incorporate a polling logic so that we can easily see if the db has
  // changed and implement those changes into the UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of the data object
  // in order to identify which we want to Update or delete.
  // for the back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // the first get method that uses the backend api to
  // fetch data from the data base
  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // the put method that uses the backend api
  // to create new query into the data base
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

  // the delete method that uses the backend api
  // to remove existing database information
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

  // the update method that uses the backend api
  // to overwrite existing data base information
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
          <ul>
            {data.length <= 0
              ? "NO DB ENTRIES YET"
              : data.map(dat => (
                  <li style={{ padding: "10px" }} key={data.message}>
                    <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                    <span style={{ color: "gray" }}> data: </span>
                    {dat.message}
                  </li>
                ))}
          </ul>
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
