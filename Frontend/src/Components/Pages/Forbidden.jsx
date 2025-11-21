import React from "react";

const Forbidden = () => {
  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: "Roboto Condensed", sans-serif;
          text-transform: uppercase;
          overflow: hidden;
          background-color: #111111;
        }

        .ghost {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .ghost--navbar {
          height: 60px;
          background: linear-gradient(0deg, #27292d 0px, #27292d 10px, transparent 10px);
          border-bottom: 2px solid #111111;
        }

        .ghost--columns {
          display: flex;
          flex-grow: 1;
        }

        .ghost--column {
          flex: 1;
          border-left: 10px solid #27292d;
          background-color: #1f2023;
        }

        .ghost--column .code {
          display: block;
          width: 100px;
          height: 1em;
          background-color: #27292d;
          margin: 1em;
        }

        .ghost--column:nth-child(1) .code:nth-child(1) { margin-left: 1em; }
        .ghost--column:nth-child(1) .code:nth-child(2) { margin-left: 2em; }
        .ghost--column:nth-child(1) .code:nth-child(3) { margin-left: 2.5em; }
        .ghost--column:nth-child(1) .code:nth-child(4) { margin-left: 1.5em; }

        .ghost--column:nth-child(2) .code:nth-child(1) { margin-left: 2.3em; }
        .ghost--column:nth-child(2) .code:nth-child(2) { margin-left: 1.7em; }
        .ghost--column:nth-child(2) .code:nth-child(3) { margin-left: 2em; }
        .ghost--column:nth-child(2) .code:nth-child(4) { margin-left: 2.5em; }

        .ghost--column:nth-child(3) .code:nth-child(1) { margin-left: 2.8em; }
        .ghost--column:nth-child(3) .code:nth-child(2) { margin-left: 1.5em; }
        .ghost--column:nth-child(3) .code:nth-child(3) { margin-left: 2.2em; }
        .ghost--column:nth-child(3) .code:nth-child(4) { margin-left: 2em; }

        .ghost--main {
          background-color: #111111;
          border-top: 15px solid #2e3034;
          flex: 1 0 100px;
        }

        .ghost--main .code {
          height: 2em;
          width: 200px;
          background-color: #27292d;
          margin: 1em;
        }

        .police-tape {
          background: linear-gradient(180deg, #fff799 0%, #e2bb2d 5%, #e2bb2d 90%, #f5cf44 95%, #705a10 100%);
          padding: 0.125em;
          font-size: 3em;
          text-align: center;
          white-space: nowrap;
          position: absolute;
          left: -5%;
          right: -5%;
        }

        .police-tape--1 {
          transform: rotate(10deg);
          top: 40%;
          z-index: 2;
        }

        .police-tape--2 {
          transform: rotate(-8deg);
          top: 50%;
        }
      `}</style>

      <div className="ghost">
        <div className="ghost--navbar"></div>
        <div className="ghost--columns">
          <div className="ghost--column">
            <div className="code"></div>
            <div className="code"></div>
            <div className="code"></div>
            <div className="code"></div>
          </div>
          <div className="ghost--column">
            <div className="code"></div>
            <div className="code"></div>
            <div className="code"></div>
            <div className="code"></div>
          </div>
          <div className="ghost--column">
            <div className="code"></div>
            <div className="code"></div>
            <div className="code"></div>
            <div className="code"></div>
          </div>
        </div>
        <div className="ghost--main">
          <div className="code"></div>
          <div className="code"></div>
        </div>
      </div>

      <h1 className="police-tape police-tape--1">
        &nbsp;&nbsp;&nbsp;&nbsp;Error: 403&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error: 403&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error: 403&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error: 403
      </h1>
      <h1 className="police-tape police-tape--2">
        Forbidden&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forbidden
      </h1>
    </>
  );
};

export default Forbidden;
