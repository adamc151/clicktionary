import React, { Component } from "react";
import styles from "./GameSettings.module.css";

class GameSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ open: true });
    }, 200);
  }

  render() {
    return (
      <>
        {
          <img
            className={`${styles.open2} ${
              !this.state.open ? styles.animateOpen : ""
            }`}
            onClick={() => {
              this.setState({ open: true });
            }}
            src={"/gear.svg"}
          />
        }
        {
          <div className={styles.modalWrapper}>
            <div
              className={`${styles.modal} ${
                this.state.open ? styles.openStyle : ""
              }`}
            >
              <div
                className={styles.close}
                onClick={() => {
                  this.setState({
                    open: false,
                  });
                }}
              />
              <div className={styles.title}>GAME SETTINGS</div>
              <div className={styles.timerWrapper}>
                Time (seconds):
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
              <div className={styles.startSwitchWrapper}>
                <img
                  onClick={() => {
                    location.reload();
                  }}
                  className={styles.switchUser}
                  src={"/switch_user.png"}
                />
                <button
                  onClick={() => {
                    this.props.onStart(
                      this.timerValue.value,
                      this.difficulty.value
                    );
                  }}
                  className={styles.start}
                >
                  DRAW
                </button>

                {/* <button
                onClick={() => {
                  location.reload();
                }}
                className={styles.start}
              >
                <img
                  onClick={() => {
                    location.reload();
                  }}
                  className={styles.switchUser}
                  src={"/switch_user.png"}
                />
              </button> */}
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}

export default GameSettings;
