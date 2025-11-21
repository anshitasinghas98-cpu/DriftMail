import React from "react";

const CreateButton = () => {
  const handleClick = function () {
    const token = localStorage.getItem("token");
    const safeToken = encodeURIComponent(token);
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/google?userId=${safeToken}`;
  };

  return (
    <>
      <style>{`
        .container {
          --transition: 350ms;
          --folder-W: 120px;
          --folder-H: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 10px;
          background: #6499E9;
          border-radius: 15px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          height: calc(var(--folder-H) * 1.7);
          position: relative;
          width: 30vw;
          margin: 20vh auto;
          font-family: 'Segoe UI', sans-serif;
        }

        .folder {
          position: absolute;
          top: -4vh;
          left: calc(50% - 60px);
          animation: float 2.5s infinite ease-in-out;
          transition: transform var(--transition) ease;
          width: var(--folder-W);
          height: var(--folder-H);
          border-radius: 15px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
          z-index: 0;
        }

        .folder:hover {
          transform: scale(1.05);
        }

        .folder .front-side,
        .folder .back-side {
          position: absolute;
          transition: transform var(--transition);
          transform-origin: bottom center;
        }

        .folder .back-side::before,
        .folder .back-side::after {
          content: "";
          display: block;
          background-color: #EDEEF7;
          opacity: 0.5;
          width: var(--folder-W);
          height: var(--folder-H);
          position: absolute;
          transform-origin: bottom center;
          border-radius: 15px;
          transition: transform 350ms;
          z-index: 0;
        }

        .container:hover .back-side::before {
          transform: rotateX(-5deg) skewX(5deg);
        }

        .container:hover .back-side::after {
          transform: rotateX(-15deg) skewX(12deg);
        }

        .folder .front-side {
          z-index: 1;
        }

        .container:hover .front-side {
          transform: rotateX(-40deg) skewX(15deg);
        }

        .folder .tip {
          background: linear-gradient(135deg, #7868E6, #7868E6); /* purple tip */
          width: 80px;
          height: 20px;
          border-radius: 12px 12px 0 0;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          position: absolute;
          top: -10px;
          z-index: 2;
        }

        .folder .cover {
          background: #EDEEF7; 
          width: var(--folder-W);
          height: var(--folder-H);
          box-shadow: none;
          border-radius: 10px;
        }

        .custom-file-upload {
          font-size: 1.1em;
          color: #ffffff;
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 10px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: background var(--transition) ease
          width: 20vw;
          padding: 10px 35px;
          margin-top: 20px;
          user-select: none;
        }

        .custom-file-upload:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .custom-file-upload input[type="file"] {
          display: none;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>

      <div onClick={handleClick} className="container">
        <div className="folder">
          <div className="front-side">
            <div className="tip"></div>
            <div className="cover"></div>
          </div>
          <div className="back-side cover"></div>
        </div>
        <label className="custom-file-upload">
          <input className="title" type="file" />
          Create New Profile
        </label>
      </div>
    </>
  );
};

export default CreateButton;
