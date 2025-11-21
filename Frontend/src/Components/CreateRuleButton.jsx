import React from 'react';
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function CreateRuleButton() {

    const { profileId } = useParams();
      const naviagte = useNavigate();

  const styles = {
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: 'fit-content',
      height: '45px',
      border: 'none',
      padding: '0px 15px',
      borderRadius: '5px',
      backgroundColor: 'rgb(49, 49, 83)',
      gap: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    folderContainer: {
      width: '40px',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'relative',
    },
    fileBack: {
      zIndex: 1,
      width: '80%',
      height: 'auto',
    },
    filePage: {
      width: '50%',
      height: 'auto',
      position: 'absolute',
      zIndex: 2,
      transition: 'all 0.3s ease-out',
    },
    fileFront: {
      width: '85%',
      height: 'auto',
      position: 'absolute',
      zIndex: 3,
      opacity: 0.95,
      transformOrigin: 'bottom',
      transition: 'all 0.3s ease-out',
    },
    text: {
      color: 'white',
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
  };

  const handleMouseEnter = (e) => {
    const page = e.currentTarget.querySelector('.filePage');
    const front = e.currentTarget.querySelector('.fileFront');
    if (page) page.style.transform = 'translateY(-5px)';
    if (front) front.style.transform = 'rotateX(30deg)';
    e.currentTarget.style.backgroundColor = 'rgb(58, 58, 94)';
  };

  const handleMouseLeave = (e) => {
    const page = e.currentTarget.querySelector('.filePage');
    const front = e.currentTarget.querySelector('.fileFront');
    if (page) page.style.transform = 'none';
    if (front) front.style.transform = 'none';
    e.currentTarget.style.backgroundColor = 'rgb(49, 49, 83)';
  };

  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = 'scale(0.95)';
  };

  const handleMouseUp = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <button
      style={styles.button}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={()=>{
        naviagte(`/profile/${profileId}/newrule`)
      }}
    >
      <span style={styles.folderContainer}>
        <svg className="fileBack" viewBox="0 0 146 113" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.fileBack}>
          <path
            d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
            fill="url(#fileBackGradient)"
          />
          <defs>
            <linearGradient id="fileBackGradient" x1="0" y1="0" x2="72.93" y2="95.4804" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8F88C2" />
              <stop offset="1" stopColor="#5C52A2" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="filePage" viewBox="0 0 88 99" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.filePage}>
          <rect width="88" height="99" fill="url(#filePageGradient)" />
          <defs>
            <linearGradient id="filePageGradient" x1="0" y1="0" x2="81" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#686868" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="fileFront" viewBox="0 0 160 79" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.fileFront}>
          <path
            d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
            fill="url(#fileFrontGradient)"
          />
          <defs>
            <linearGradient id="fileFrontGradient" x1="38.7619" y1="8.71323" x2="66.9106" y2="82.8317" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C3BBFF" />
              <stop offset="1" stopColor="#51469A" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <p  style={styles.text}>Create New Rule</p>
    </button>
  );
}
