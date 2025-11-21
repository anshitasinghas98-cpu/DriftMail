import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes b {
        100% {
          background-position: 50% 0, 60% 50%;
        }
      }
      .screen {
        animation: b 0.2s infinite alternate !important;
      }
      @media only screen and (max-width: 1024px) {
        .screenM {
          display: flex !important;
        }
        .screen {
          display: none !important;
        }
      }
      @media only screen and (min-width: 1025px) {
        .screen {
          display: flex !important;
        }
        .screenM {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.mainWrapper}>
        <div style={styles.main}>
          <div style={styles.antenna}>
            <div style={styles.antennaShadow}></div>
            <div style={styles.a1}></div>
            <div style={styles.a1d}></div>
            <div style={styles.a2}></div>
            <div style={styles.a2d}></div>
          </div>
          <div style={styles.tv}>
            <div style={styles.cruve}>
              <svg
                style={styles.curveSvg}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 189.929 189.929"
                xmlSpace="preserve"
              >
                <path
                  d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
          C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
                ></path>
              </svg>
            </div>
            <div style={styles.displayDiv}>
              <div style={styles.screenOut}>
                <div style={styles.screenOut1}>
                  <div className="screen" style={styles.screen}>
                    <span style={styles.notfoundText}> NOT FOUND</span>
                  </div>
                  <div className="screenM" style={styles.screenM}>
                    <span style={styles.notfoundText}> NOT FOUND</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.lines}>
              <div style={styles.line1}></div>
              <div style={styles.line2}></div>
              <div style={styles.line3}></div>
            </div>
            <div style={styles.buttonsDiv}>
              <div style={styles.b1}>
                <div style={styles.b1Inner}></div>
              </div>
              <div style={styles.b2}></div>
              <div style={styles.speakers}>
                <div style={styles.g1}>
                  <div style={styles.g11}></div>
                  <div style={styles.g12}></div>
                  <div style={styles.g13}></div>
                </div>
                <div style={styles.g}></div>
                <div style={styles.g}></div>
              </div>
            </div>
          </div>
          <div style={styles.bottom}>
            <div style={styles.base1}></div>
            <div style={styles.base2}></div>
            <div style={styles.base3}></div>
          </div>
        </div>
        <div style={styles.text404}>
          <div style={styles.text4041}>4</div>
          <div style={styles.text4042}>0</div>
          <div style={styles.text4043}>4</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#212121", // Dark background color
    margin: 0,
    padding: 0,
    overflow: "hidden",
    position: "relative",
  },
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30em",
    height: "30em",
    position: "relative",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5em",
    position: "relative",
  },
  antenna: {
    width: "5em",
    height: "5em",
    borderRadius: "50%",
    border: "2px solid black",
    backgroundColor: "#f27405",
    marginBottom: "-6em",
    marginLeft: "0em",
    zIndex: 1,
    position: "relative",
  },
  antennaShadow: {
    position: "absolute",
    backgroundColor: "transparent",
    width: "50px",
    height: "56px",
    left: "1.68em",
    borderRadius: "45%",
    transform: "rotate(140deg)",
    border: "4px solid transparent",
    boxShadow: "inset 0px 16px #a85103, inset 0px 16px 1px 1px #a85103",
  },
  a1: {
    position: "absolute",
    top: "-5em",
    left: "-6.5em",
    width: "12em",
    height: "5.5em",
    borderRadius: "50px",
    backgroundImage: "linear-gradient(#171717, #171717, #353535, #353535, #171717)",
    transform: "rotate(-29deg)",
    clipPath: "polygon(50% 0%, 49% 100%, 52% 100%)",
  },
  a1d: {
    position: "absolute",
    top: "-4em",
    left: "0.5em",
    transform: "rotate(45deg)",
    width: "0.5em",
    height: "0.5em",
    borderRadius: "50%",
    border: "2px solid black",
    backgroundColor: "#979797",
    zIndex: 99,
  },
  a2: {
    position: "absolute",
    top: "-5em",
    left: "1.5em",
    width: "12em",
    height: "4em",
    borderRadius: "50px",
    backgroundColor: "#171717",
    backgroundImage: "linear-gradient(#171717, #171717, #353535, #353535, #171717)",
    clipPath: "polygon(47% 0, 47% 0, 34% 34%, 54% 25%, 32% 100%, 29% 96%, 49% 32%, 30% 38%)",
    transform: "rotate(-8deg)",
  },
  a2d: {
    position: "absolute",
    top: "-4em",
    left: "6em",
    width: "0.5em",
    height: "0.5em",
    borderRadius: "50%",
    border: "2px solid black",
    backgroundColor: "#979797",
    zIndex: 99,
  },
  notfoundText: {
    backgroundColor: "black",
    paddingLeft: "0.3em",
    paddingRight: "0.3em",
    fontSize: "0.75em",
    color: "white",
    letterSpacing: "0",
    borderRadius: "5px",
    zIndex: 10,
  },
  tv: {
    width: "17em",
    height: "9em",
    marginTop: "3em",
    borderRadius: "15px",
    backgroundColor: "#d36604",
    display: "flex",
    justifyContent: "center",
    border: "2px solid #1d0e01",
    boxShadow: "inset 0.2em 0.2em #e69635",
    position: "relative",
    zIndex: 2,
  },
  cruve: {
    position: "absolute",
    top: "0.25em",
    left: "-0.25em",
  },
  curveSvg: {
    height: "12px",
    width: "12px",
  },
  displayDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    boxShadow: "3.5px 3.5px 0px #e69635",
    marginTop: "1em",
  },
  screenOut: {
    width: "auto",
    height: "auto",
    borderRadius: "10px",
  },
  screenOut1: {
    width: "11em",
    height: "7.75em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
  },
  screen: {
    width: "13em",
    height: "7.85em",
    fontFamily: "'Montserrat', sans-serif",
    border: "2px solid #1d0e01",
    background: "repeating-radial-gradient(#000 0 0.0001%, #ffffff 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(#000 0 0.0001%, #ffffff 0 0.0002%) 60% 60%/2500px 2500px",
    backgroundBlendMode: "difference",
    borderRadius: "10px",
    zIndex: 99,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#252525",
    letterSpacing: "0.15em",
    textAlign: "center",
  },
  screenM: {
    width: "13em",
    height: "7.85em",
    position: "relative",
    fontFamily: "'Montserrat', sans-serif",
    background: "linear-gradient(to right, #002fc6 0%, #002bb2 14.2857142857%, #3a3a3a 14.2857142857%, #303030 28.5714285714%, #ff0afe 28.5714285714%, #f500f4 42.8571428571%, #6c6c6c 42.8571428571%, #626262 57.1428571429%, #0affd9 57.1428571429%, #00f5ce 71.4285714286%, #3a3a3a 71.4285714286%, #303030 85.7142857143%, white 85.7142857143%, #fafafa 100%)",
    borderRadius: "10px",
    border: "2px solid black",
    zIndex: 99,
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#252525",
    letterSpacing: "0.15em",
    textAlign: "center",
    overflow: "hidden",
  },
  lines: {
    display: "flex",
    columnGap: "0.1em",
    alignSelf: "flex-end",
    marginRight: "1em",
    marginBottom: "0.5em",
  },
  line1: {
    width: "2px",
    height: "0.5em",
    backgroundColor: "black",
    borderRadius: "25px 25px 0px 0px",
    marginTop: "0.5em",
  },
  line2: {
    flexGrow: 1,
    width: "2px",
    height: "1em",
    backgroundColor: "black",
    borderRadius: "25px 25px 0px 0px",
  },
  line3: {
    width: "2px",
    height: "0.5em",
    backgroundColor: "black",
    borderRadius: "25px 25px 0px 0px",
    marginTop: "0.5em",
  },
  buttonsDiv: {
    width: "4.25em",
    height: "8em",
    backgroundColor: "#e69635",
    border: "2px solid #1d0e01",
    padding: "0.6em",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    rowGap: "0.75em",
    boxShadow: "3px 3px 0px #e69635",
    marginLeft: "0.5em",
  },
  b1: {
    width: "1.65em",
    height: "1.65em",
    borderRadius: "50%",
    backgroundColor: "#7f5934",
    border: "2px solid black",
    boxShadow: "inset 2px 2px 1px #b49577, -2px 0px #513721, -2px 0px 0px 1px black",
    position: "relative",
  },
  b1Inner: {
    position: "absolute",
    top: "-0.1em",
    left: "0.65em",
    transform: "rotate(45deg)",
    width: "0.15em",
    height: "1.5em",
    backgroundColor: "#000000",
  },
  b2: {
    width: "1.65em",
    height: "1.65em",
    borderRadius: "50%",
    backgroundColor: "#7f5934",
    border: "2px solid black",
    boxShadow: "inset 2px 2px 1px #b49577, -2px 0px #513721, -2px 0px 0px 1px black",
    position: "relative",
  },
  speakers: {
    display: "flex",
    flexDirection: "column",
    rowGap: "0.5em",
  },
  g1: {
    display: "flex",
    columnGap: "0.25em",
  },
  g11: {
    width: "0.65em",
    height: "0.65em",
    borderRadius: "50%",
    backgroundColor: "#7f5934",
    border: "2px solid black",
    boxShadow: "inset 1.25px 1.25px 1px #b49577",
  },
  g12: {
    width: "0.65em",
    height: "0.65em",
    borderRadius: "50%",
    backgroundColor: "#7f5934",
    border: "2px solid black",
    boxShadow: "inset 1.25px 1.25px 1px #b49577",
  },
  g13: {
    width: "0.65em",
    height: "0.65em",
    borderRadius: "50%",
    backgroundColor: "#7f5934",
    border: "2px solid black",
    boxShadow: "inset 1.25px 1.25px 1px #b49577",
  },
  g: {
    width: "100%",
    height: "2px",
    backgroundColor: "#171717",
  },
  bottom: {
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "8.7em",
    marginTop: "-0.15em",
  },
  base1: {
    height: "1em",
    width: "2em",
    border: "2px solid #171717",
    backgroundColor: "#4d4d4d",
    zIndex: 1,
  },
  base2: {
    height: "1em",
    width: "2em",
    border: "2px solid #171717",
    backgroundColor: "#4d4d4d",
    zIndex: 1,
  },
  base3: {
    position: "absolute",
    height: "0.15em",
    width: "17.5em",
    backgroundColor: "#171717",
    top: "22.5em",
  },
  text404: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    columnGap: "6em",
    zIndex: 0,
    opacity: 0.5,
    fontFamily: "'Montserrat', sans-serif",
  },
  text4041: {
    transform: "scaleY(24.5) scaleX(9)",
  },
  text4042: {
    transform: "scaleY(24.5) scaleX(9)",
  },
  text4043: {
    transform: "scaleY(24.5) scaleX(9)",
  },
};

export default NotFound;