import React from "react";
import Logo from '../../public/solos1.png'
const SimpleHeader = () => {
  return (
    <>
      <style>{`
        .header-container {
          display: flex;
          align-items: center;
          background-color: #212121;
          padding: 2rem;
          max-width: 900px;
          margin: 0 auto;
          border-radius: 12px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .logo-large {
          flex-shrink: 0;
          width: 45vh;
          height: 45vh;
          border-radius: 50%;
          margin-right: 2rem;
          overflow:hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top:6vh;
        }
        .logo-img{
        width:100%;
        height:100%;
        object-fit: scale-down
          }
        

        .text-block {
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: white;
        }

        .line-one {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.2rem; 
        }

        .drift-mail {
          font-size: 3rem;
          font-weight: 700;
          color: #7868E6;
          line-height: 1;
        }

        .for-mails {
          font-size: 2.1rem;
          color: white;
        }

        .line-two {
          font-size: 2.1rem;
          margin-top: -5vh;
          color: white;
        }

        .subheading {
          font-size: 1.1rem;
          margin-top: 0.6rem;
          margin-left:0.4vh;
          display:flex;
          gap:5px;
        }

        .subheading .highlight {
          color: #6499E9;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .header-container {
            flex-direction: column;
            // align-items: flex-start;
          }

          .logo-large {
            width: 100px;
            height: 100px;
            margin-bottom: 1rem;
            overflow:hidden;
            display: flex;
          align-items: center;
          justify-content: center;
          margin-top:6vh;
          }
          .logo-img{
        width:100%;
        height:100%;
        object-fit: scale-down
          }
          
          .drift-mail {
            font-size: 2.2rem;
          }

          .for-mails,
          .line-two {
            font-size: 2.2rem;
          }

          .subheading {
            font-size: 1rem;
          }
        }
      `}</style>

      <header className="header-container" role="banner">
        <div className="logo-large" aria-label="Drift Mail Logo" >
          <img className="logo-img" src={Logo} alt="my-logo" />
        </div>
        <div className="text-block">
          <div className="line-one">
            <h1 className="drift-mail">Drift Mail</h1>
            <span className="for-mails">For mails that</span>
          </div>
          <div className="line-two">drift away unnoticed</div>
          <div className="subheading">
            <span>Because no mail deserves to be </span>
            <span className="highlight">lost at the sea</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default SimpleHeader;
