import React from "react";

export default function RuleCard({
  ruleName = "Default Rule",
  createdAt = new Date(),
}) {
  console.log("car detailed are ------->", ruleName, createdAt);

  const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).replace(',', '');
};


  return (
    <>
      <style>{`
        .card {
          width: 250px;
          height: 200px;
          border-radius: 15px;
          background: rgba(100, 153, 233, 0.9); 
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: "";
          height: 100px;
          width: 100px;
          position: absolute;
          top: -40%;
          left: -20%;
          border-radius: 50%;
          border: 35px solid rgba(120, 104, 230, 0.1); 
          transition: all 0.8s ease;
          filter: blur(0.5rem);
        }

        .card:hover::before {
          width: 140px;
          height: 140px;
          top: -30%;
          left: 50%;
          filter: blur(0);
          border: 35px solid rgba(120, 104, 230, 0.4); 
        }

        .text {
          flex-grow: 1;
          padding: 30px 20px 10px; /* Moved text a bit lower */
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Left-align the text */
          color: #ffffff;
          font-weight: 900;
          font-size: 1.2em;
        }

        .subtitle {
          font-size: 0.7em;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 4px;
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #7868E6;
          width: 100%;
          height: 35px;
          border-radius: 0 0 15px 15px;
          color: #ffffff;
          font-size: 0.9em;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .footer:hover {
          background-color: #6758d9;
        }
      `}</style>

      <div className="card" role="region" aria-label={`Rule card for ${ruleName}`}>
        <div className="text">
          <span>{ruleName}</span>
          <p className="subtitle">{formatDate(createdAt)}</p>
        </div>
        <div className="footer">Click to Open Rule</div>
      </div>
    </>
  );
}
