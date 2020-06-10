import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import socketIOClient from "socket.io-client";
import words from "./words.json";
import styles from "./Canvas.module.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import GameSettings from "./GameSettings.js";
import Status from "./Status.tsx";

const ENDPOINT = `/`;

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sending: false,
      player2ready: false,
      word: null,
      timer: "00:30",
      isPlaying: false,
      notification: null,
      duration: 30,
      difficulty: "easy",
      timesUp: false,
      score: 0,
    };

    this.clearCanvas = this.clearCanvas.bind(this);
    this.setWord = this.setWord.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.setNotification = this.setNotification.bind(this);
  }

  setNotification(notification) {
    this.setState({ notification });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 1500);
  }

  clearCanvas() {
    this.canvas.clear();
    this.socket.send(JSON.stringify('{"lines":[],"width":400,"height":400}'));
  }
  setWord() {
    this.clearCanvas();
    console.log(
      "yoooo words[this.state.difficulty]",
      words[this.state.difficulty].length
    );
    const randomIndex = Math.floor(
      Math.random() * words[this.state.difficulty].length
    );
    const randomElement = words[this.state.difficulty][randomIndex];
    this.setState({ word: randomElement });
    words[this.state.difficulty].splice(randomIndex, 1);
  }

  startTimer(duration) {
    var timer = duration;

    const getTime = (duration) => {
      let minutes = parseInt(timer / 60, 10);
      let seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return minutes + ":" + seconds;
    };
    const time = getTime(timer);
    --timer;

    this.interval && clearInterval(this.interval);
    this.state.sending ? this.setWord() : this.setState({ word: "" });
    this.setState({
      duration,
      isPlaying: true,
      timerKey: `${Math.random().toString(36).substring(7)}`,
      timesUp: false,
      timer: time,
    });

    this.interval = setInterval(() => {
      const time = getTime(timer);
      this.setState({ timer: time });

      if (--timer < 0) {
        timer = duration;
        clearInterval(this.interval);
        this.setState({ isPlaying: false, playing: false });
        this.setState({ word: "Time's Up!" });
      }
    }, 1000);
  }

  componentDidMount() {
    this.setState({ h: window.innerHeight, w: window.innerWidth });
    console.log("yoooo ENDPOINT", ENDPOINT);
    this.socket = socketIOClient(ENDPOINT);

    this.socket.on("message", (data) => {
      if (!this.state.sending && this.canvas) {
        this.canvas.loadSaveData(JSON.parse(data), true);
      }
    });

    this.socket.on("setactive", (data) => {
      this.setState({ sending: JSON.parse(data) });
    });

    this.socket.on("startTimer", (data) => {
      this.startTimer(parseInt(data, 10));
      if (!this.state.playing) {
        this.setState({
          playing: true,
        });
        this.setNotification("Go!");
      }
    });
    this.socket.on("addPoint", (data) => {
      clearInterval(this.interval);
      this.setState({ isPlaying: false, playing: false });
      if (!this.state.sending) {
        this.setNotification("/tick.png");
        this.setState({ word: "Correct!" });
      }
    });

    this.socket.on("setplayer2ready", (data) => {
      this.setState({ player2ready: JSON.parse(data) });
    });

    this.socket.on("connect", () => {
      console.log("connected!", window.location.pathname);
      this.socket.emit("joinroom", window.location.pathname);
    });
  }
  render() {
    const canvasProps = {
      ref: (node) => {
        this.canvas = node;
      },
      onChange: () => {
        if (this.canvas && this.socket.connected && this.state.sending) {
          const lines = this.canvas.getSaveData();
          this.socket.send(JSON.stringify(lines));
        }
      },
      loadTimeOffset: 5,
      lazyRadius: 0,
      brushRadius: 1,
      brushColor: "#444",
      catenaryColor: "#0a0302",
      gridColor: "rgba(150,150,150,0.17)",
      hideGrid: false,
      canvasWidth: this.state.w,
      canvasHeight: this.state.h,
      disabled: false,
      imgSrc: "",
      saveData: null,
      immediateLoading: false,
      hideInterface: true,
      className: styles.canvas,
    };

    return (
      <div
        className={styles.myWrapper}
        style={{ height: this.state.h, width: this.state.w }}
      >
        <CanvasDraw {...canvasProps} />

        <div className={styles.timer}>
          <CountdownCircleTimer
            key={`${this.state.timerKey}`}
            size={60}
            strokeWidth={5}
            isPlaying={this.state.isPlaying}
            duration={this.state.duration}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => [true, 1000]}
          >
            {() => this.state.timer}
          </CountdownCircleTimer>
        </div>

        {this.state.word && (
          <div className={styles.word}>{this.state.word}</div>
        )}

        {this.state.sending && (
          <>
            <div className={styles.buttons}>
              <img
                onClick={() => {
                  this.socket.emit("addPoint", true);
                }}
                className={styles.newWord}
                src={"/tick.png"}
              />
              <img
                onClick={this.clearCanvas}
                className={styles.clear}
                src={"/trash.png"}
              />
            </div>
            {!this.state.playing && (
              <GameSettings
                duration={this.state.duration}
                difficulty={this.state.difficulty}
                onStart={(duration, difficulty) => {
                  this.setState({ duration, difficulty });
                  this.socket.emit("startTimer", duration);
                }}
              />
            )}
          </>
        )}

        {this.state.notification ? (
          this.state.notification[0] === "/" ? (
            <img
              className={styles.notification}
              src={this.state.notification}
            />
          ) : (
            <div className={styles.notification}>{this.state.notification}</div>
          )
        ) : null}

        <Status player2ready={this.state.player2ready} />
      </div>
    );
  }
}

export default Canvas;
