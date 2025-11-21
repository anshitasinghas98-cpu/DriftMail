import React, { useState } from "react";
import SocialButtons from "./Social";
import { useNavigate } from "react-router";
import Logo from '../../public/solos2.png'
const navItems = [
  { label: "Home", id: "home" },
  { label: "Contact", id: "contact" },
  { label: "Logout", id: "logout" },
];

const NavBar = () => {
  const navigate=useNavigate();
  const [hovered, setHovered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [dropdown,setDropdown]=useState(false);

  const handleMouseEnter = () => {
    setLeaving(false);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setLeaving(true);
    setTimeout(() => {
      setHovered(false);
      setLeaving(false);
    }, 300); 
  };

  return (
    <>
      <style>{`
        .product-wrapper {
          height:3.5vh;
          position: relative;
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 1.2em;
          color: #fff;
          padding: 0.5em 1.5em;
          border-radius: 10px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.2s ease;
          margin-top:0.71vh;
        }

        .product-wrapper:hover {
          transform: scale(1.08) translateY(-2px);
        }

        .product-bg {
          position: absolute;
          inset: 0;
          background-color: #6499E9;
          border-radius: 14px;
          z-index: 0;
          opacity: 1;
          transition: transform 0.3s ease;
          transform-origin: left;
          transform: scaleX(0);
        }

        /* When hovered: scaleX 1, origin left */
        .product-wrapper.hovered .product-bg {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* When leaving: scaleX 0, origin right */
        .product-wrapper.leaving .product-bg {
          transform: scaleX(0);
          transform-origin: right;
        }

        .product-content {
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .logo-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-right: 10px;
          transition: transform 0.3s ease;
        }
        .logo-img{
        width:100%;
        height:100%;
        object-fit: scale-down;
          }

        .product-wrapper.hovered .logo-circle {
          transform: scale(1.1);
        }
      `}</style>

      <div
        style={{
          backgroundColor: "#212121",
          padding: "1em 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            height: "60px",
            borderRadius: "40px",
            overflow: "hidden",
            backgroundColor: "#212121",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 1.5em",
              background: "rgba(16, 16, 16, 0.4)",
              borderRadius: "40px",
            }}
          >
            {/* Product Logo + Name with animated box */}
            <div
              className={`product-wrapper ${hovered ? "hovered" : ""} ${
                leaving ? "leaving" : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="product-bg"></div>
              <div className="product-content">
                <div className="logo-circle">
                  <img className="logo-img" src={Logo} alt="my-logo" />
                </div>
                Drift Mail
              </div>
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: "flex", gap: "1em" }}>
              {navItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "0.5em 1.5em",
                    color: "#fff",
                    cursor: "pointer",
                    borderRadius: "10px",
                    transition: "transform 0.2s ease, background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "scale(1.08) translateY(-2px)";
                    e.currentTarget.style.backgroundColor = "#6499E9";
                  }}
                  onMouseLeave={(e) => {
                    if(item.label=="Contact" && dropdown==true ) return;
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onClick={(e)=>{
                    if(item.label=="Contact" ){
                      setDropdown((prev)=>!prev)
                      if(dropdown==false){
                        e.currentTarget.style.transform =
                      "scale(1.08) translateY(-2px)";
                    e.currentTarget.style.backgroundColor = "#6499E9";
                      }
                      else{
                        e.currentTarget.style.transform = "scale(1) translateY(0)";
                    e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }
                    else if(item.label=="Home"){
                      navigate('/');
                    }
                    else if(item.label=="Logout"){
                      localStorage.removeItem('token');
                      navigate('/login');
                    }
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
            {dropdown?<SocialButtons/>:null}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
