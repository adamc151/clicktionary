import React from "react";
import styles from "./Status.module.css";

type StatusProps = {
  player2ready: boolean;
};

const Status: React.FC<StatusProps> = ({ player2ready = false }) => {
  return (
    <div className={styles.playerReadyWrapper}>
      <div className={styles.status}>
        <div
          className={player2ready ? styles.statusGreen : styles.statusOrange}
        ></div>
      </div>
      <div className={styles.playerReady}>
        {player2ready ? "Connected!" : "Waiting for Player 2..."}
      </div>
    </div>
  );
};

export default Status;
