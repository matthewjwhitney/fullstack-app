import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class TestForm extends Component {
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
      if (dat.id == idTodelete) {
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
      if (dat.id == idToUpdate) {
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
    return (
      <Fragment>
        <Paper className={this.props.root} elevation={1}>
          <div>
            <ul>
              {data.length <= 0
                ? "NO DB ENTRIES YET"
                : data.map(dat => (
                    <li style={{ padding: "10px" }} key={data.message}>
                      <span style={{ color: "gray" }}> id: </span> {dat.id}{" "}
                      <br />
                      <span style={{ color: "gray" }}> data: </span>
                      {dat.message}
                    </li>
                  ))}
            </ul>
            <div style={{ padding: "10px" }}>
              <input
                type="text"
                onChange={e => this.setState({ message: e.target.value })}
                placeholder="add something in the database"
                style={{ width: "200px" }}
              />
              <button onClick={() => this.putDataToDB(this.state.message)}>
                ADD
              </button>
            </div>
            <div style={{ padding: "10px" }}>
              <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ idToDelete: e.target.value })}
                placeholder="put id of item to delete here"
              />
              <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                DELETE
              </button>
            </div>
            <div style={{ padding: "10px" }}>
              <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ idToUpdate: e.target.value })}
                placeholder="id of item to update here"
              />
              <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ updateToApply: e.target.value })}
                placeholder="put new value of the item here"
              />
              <button
                onClick={() =>
                  this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                }
              >
                UPDATE
              </button>
            </div>
          </div>
        </Paper>
      </Fragment>
    );
  }
}

TestForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TestForm);
