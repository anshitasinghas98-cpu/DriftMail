import React from "react";

export default function ProfileCard({
  Name = "New User",
  Email = "newuser@gmail.com",
  Profile = "",
  onClickHandler,
  profileId
}) {
  const handledelete=async (e)=>{
    e.stopPropagation();

    console.log("handle delete");
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/profile/${profileId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
  }

  return (
    <>
      <style>{`
        .card {
          width: 190px;
          height: 254px;
          background: #6499E9;
          border-radius: 15px;
          box-shadow: 1px 5px 60px 0px rgba(16, 9, 136, 0.42);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .card-border-top {
          width: 60%;
          height: 3%;
          background: #7868E6;
          margin: 0 auto;
          border-radius: 0 0 15px 15px;
        }

        .img {
          width: 70px;
          height: 80px;
          background: #7F8CAA;
          border-radius: 15px;
          margin-top: 25px;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 15px;
        }

        span {
          font-weight: 600;
          color: white;
          font-size: 16px;
          text-align: center;
          display: block;
        }

        .job {
          font-weight: 400;
          color: white;
          font-size: 12px;
          text-align: center;
          margin-top: 3px;
          margin-bottom: 0;
        }

        button {
          padding: 8px 25px;
          margin-top: auto;
          margin-bottom: -16px;
          border-radius: 8px;
          border: none;
          background: #7868E6;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          display: block;
        }

        button:hover {
          background: #5f4ecf;
        }


      .button {
      height:20px;
      margin-bottom:1vh;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition-duration: .3s ease;
    overflow: hidden;
    position: relative;
  }

  .svgIcon {
    width: 12px;
    transition-duration: .3s;
  }

  .svgIcon path {
    fill: white;
  }

  .button:hover {
    display:flex;
    border-radius: 8px;
    transition-duration: .3s ease;
    background-color: rgb(255, 69, 69);
    align-items: center;
  }

  .button:hover .svgIcon {
    transition-duration: .3s;
    transform: translateY(60%);
    display:none;
  }

  .button::before {
    position: absolute;
    top: -20px;
    content: "Delete";
    color: white;
    transition-duration: .3s;
    font-size: 2px;
  }

  .button:hover::before {
    font-size: 13px;
    opacity: 1;
    transform: translateY(23px);
    transition-duration: .3s ease;
  }




      `}</style>

      <div
        onClick={onClickHandler}
        className="card"
        role="region"
        aria-label="Person card"
      >
        <div className="card-border-top" />
        <div className="img" aria-label="Profile picture">
          {Profile ? <img src={Profile} alt="Profile" /> : null}
        </div>
        <span>{Name}</span>
        <p className="job">{Email}</p>
        <button>Open Profile</button>

        <button className="button" onClick={handledelete}>
        <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
      </button>

      </div>
    </>
  );
}
