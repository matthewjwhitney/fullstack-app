import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";

class Main extends Component {
  render() {
    return (
      <main>
        <Paper>
          <Typography>
            <button onClick={this.simpleAction}>Test redux action</button>
          </Typography>
        </Paper>
      </main>
    );
  }
}

export default Main;
