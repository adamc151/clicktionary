import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import styles from "./HomePage.module.css";
import { useRouter } from "next/router";
// import CanvasDraw from "react-canvas-draw";
// import logo from "./logo.json";
// import background from "./background7.png";

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

const HomePage = ({}) => {
  const history = useRouter();
  // const canvasEl = useRef(null);

  const [urlAppend, setUrlAppend] = useState("");
  const [urlPath, setUrlPath] = useState("");

  // const [canvasDimensions, setCanvasDimensions] = useState({
  //   h: null,
  //   w: null,
  // });

  useEffect(() => {
    // setCanvasDimensions({ h: window.innerHeight, w: window.innerWidth });
    setUrlAppend(`${Math.random().toString(36).substring(7)}`);
    setUrlPath(window.location.origin + window.location.pathname);
    // setTimeout(() => {
    //   canvasEl.current &&
    //     canvasEl.current.loadSaveData(JSON.stringify(logo), true);
    // }, 100);
  }, []);

  return (
    <div className={styles.wrapper}>
      <img src={"/background7.png"} className={styles.backgroundImage} />

      <div className={styles.homePageWrapper}>
        <div className={styles.title}>Clicktionary</div>
        <div className={styles.onlineDrawingGame}>Online drawing game</div>
        <img className={styles.diagram} src={"/diagram4.svg"}></img>
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
