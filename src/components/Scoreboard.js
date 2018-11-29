import React, { useState, useEffect } from "react";
import axios from "axios";
import { DASHBOARD_URL } from "../urls";
import "./Scoreboard.css";
import Spinner from "react-spinkit";

export default class ScoreboardList extends React.Component {
  state = {
    data: [],
    selectedDifficulty: "EASY",
    loading: true
  };

  queryDifficulty = difficulty => `?difficulty=${difficulty}`;

  async fetch(difficulty) {
    this.setState({ loading: true });
    const { data } = await axios(
      DASHBOARD_URL + this.queryDifficulty(difficulty)
    );
    this.setState({
      data,
      loading: false
    });
  }

  componentDidMount() {
    this.fetch(this.state.selectedDifficulty);
  }

  handleButtonClick = difficulty => () => {
    this.fetch(difficulty);
    console.log(difficulty);
  };

  render() {
    const { easy, medium, hard, brutal } = this.state;

    return (
      <div className="scoreboard-wrapper">
        <div className="scoreboard-modal-wrapper" onClick={this.props.toggle} />
        <div className="card scoreboard-card-wrapper">
          <div className="card-content">
            <span className="card-title scoreboard-title">Scoreboard</span>
            <div className="scoreboard-button-wrapper">
              <button
                className="btn blue"
                onClick={this.handleButtonClick("EASY")}
              >
                Easy
              </button>
              <button
                className="btn green"
                onClick={this.handleButtonClick("MEDIUM")}
              >
                Medium
              </button>
              <button
                className="btn yellow"
                onClick={this.handleButtonClick("HARD")}
              >
                Hard
              </button>
              <button
                className="btn red"
                onClick={this.handleButtonClick("BRUTAL")}
              >
                Brutal
              </button>
            </div>
            <div
              className={
                this.state.loading
                  ? "result-wrapper custom-spinner"
                  : "result-wrapper"
              }
            >
              {this.state.loading && (
                <Spinner
                  name="circle"
                  color="#795548"
                  className="custom-spinner"
                  style={{ justifyContent: "center" }}
                />
              )}
              {!this.state.loading && (
                <table>
                  <thead>
                    <tr>
                      <td>Rank</td>
                      <td>Score</td>
                      <td>Name</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((datum, idx) => (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{datum.score}</td>
                        <td>{datum.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
