import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import styles from "./HomePage.module.css";
import { useRouter } from "next/router";
import CanvasDraw from "react-canvas-draw";
import logo from "./logo.json";
import background from "./background5.jpg";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const HomePage = ({}) => {
  const history = useRouter();
  const canvasEl = useRef(null);

  const [urlAppend, setUrlAppend] = useState("");
  const [urlPath, setUrlPath] = useState("");

  const [canvasDimensions, setCanvasDimensions] = useState({
    h: null,
    w: null,
  });

  useEffect(() => {
    setCanvasDimensions({ h: window.innerHeight, w: window.innerWidth });
    setUrlAppend(`${Math.random().toString(36).substring(7)}`);
    setUrlPath(window.location.origin + window.location.pathname);
    setTimeout(() => {
      canvasEl.current &&
        canvasEl.current.loadSaveData(JSON.stringify(logo), false);
    }, 100);
  }, []);

  const canvasProps = {
    ref: canvasEl,
    onChange: () => {
      if (canvasEl) {
        const lines = canvasEl.current.getSaveData();
      }
    },
    loadTimeOffset: 0,
    lazyRadius: 0,
    brushRadius: 1,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: canvasDimensions.w,
    canvasHeight: canvasDimensions.h,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: true,
    className: styles.canvas,
  };

  return (
    <div style={{ height: canvasDimensions.h, width: canvasDimensions.w }}>
      <CanvasDraw {...canvasProps} />
      {/* <img className={styles.clicktionary} src={"/clicktionary.png"} /> */}

      <div className={styles.homePageWrapper}>
        <div className={styles.onlineDrawingGame}>Online drawing game</div>
        <div>
          Get together with your friends and guess what they are drawing before
          the time runs out!
        </div>
        <img className={styles.diagram} src={"/diagram3.svg"}></img>
        <div className={styles.urlTextWrapper}>
          <div className={styles.text}>
            Share this url with your friends and hit PLAY
          </div>

          <div className={styles.urlWrapper}>
            <a className={styles.url} href={urlPath + urlAppend}>
              {urlPath + urlAppend}
            </a>
            {/* <input
              className={styles.urlAppend}
              type="text"
              defaultValue={urlAppend}
              onChange={(e) => {
                setUrlAppend(`${e.target.value}`);
              }}
            /> */}
          </div>
        </div>

        <button
          className={styles.play}
          onClick={() => {
            history.push("/" + urlAppend);
          }}
        >
          PLAY
        </button>
      </div>
    </div>
  );
};

export default HomePage;
