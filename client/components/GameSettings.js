import React, { Component } from "react";
import styles from "./GameSettings.module.css";

class GameSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      openIcon: true,
      animateIcon: false,
    };
  }

  render() {
    return (
      <>
        {!this.state.openIcon && (
          <img
            className={`${styles.open} ${
              this.state.animateIcon ? styles.animateOpen : ""
            }`}
            onClick={() => {
              this.setState({ open: true, animateIcon: true });
              setTimeout(() => {
                this.setState({ openIcon: true });
              }, 500);
            }}
            src={"/gear.svg"}
          />
        )}
        {this.state.open && (
          <div className={styles.modalWrapper}>
            <div className={styles.modal}>
              <div
                className={styles.close}
                onClick={() => {
                  this.setState({
                    open: false,
                    openIcon: false,
                    animateIcon: false,
                  });
                }}
              />
              <div className={styles.timerWrapper}>
                Time in seconds:
                <input
                  className={styles.timerValue}
                  type="number"
                  ref={(node) => (this.timerValue = node)}
                  defaultValue={this.props.duration}
                />
              </div>
              <div className={styles.difficultyWrapper}>
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
              </div>
              <button
                onClick={() => {
                  this.props.onStart(
                    this.timerValue.value,
                    this.difficulty.value
                  );
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
          </div>
        )}
      </>
    );
  }
}

export default GameSettings;
