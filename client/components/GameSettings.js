import React, { Component } from "react";
import styles from "./GameSettings.module.css";

class GameSettings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.modal}>
        Time in seconds:
        <input
          className={styles.timerValue}
          type="number"
          ref={(node) => (this.timerValue = node)}
          defaultValue={this.props.duration}
        />
        Difficulty:
        <select
          className={styles.difficulty}
          ref={(node) => {
            this.difficulty = node;
          }}
          defaultValue={this.props.difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={() => {
            this.props.onStart(this.timerValue.value, this.difficulty.value);
          }}
          className={styles.start}
        >
          START
        </button>
        <button
          onClick={() => {
            location.reload();
          }}
          className={styles.start}
        >
          Switch user
        </button>
      </div>
    );
  }
}

export default GameSettings;
