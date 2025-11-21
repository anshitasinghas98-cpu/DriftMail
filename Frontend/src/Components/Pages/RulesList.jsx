import React, { useEffect, useState } from "react";
import RuleCard from "../RuleCard";
import { useParams, useNavigate } from "react-router";
import Forbidden from "./Forbidden";
import CreateRuleButton from "../CreateRuleButton";

export default function RulesList() {
  const [rulesList, setRuleList] = useState([]);
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState("loading");

  const fetchdetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${profileId}/rule/rule-list`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      const data = await res.json();
      console.log("fetched card list is ",data);
      if (res.ok) {
        console.log("response is ok");
        setRuleList(data.rules);
        setIsAuthorized(true);
      }
      else{
        console.log("unable to load ", e);
      setIsAuthorized(false);
      }
    }
    catch (e) {
      console.log("unable to load rules ", e);
      setIsAuthorized(false);
    }
  };

  const styles = {
    wrapper: {
      width: "100vw",
      minHeight: "100vh",
      backgroundColor: "#212121",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "5vh 0"
    },

    createButtonContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "10vh"
    },

    ruleContainer: {
      width: "90%",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "2rem",
    },

    ruleCardWrapper: {
      cursor: "pointer"
    }
  };

  useEffect(() => {
    fetchdetail();
  }, []);

  if (!isAuthorized) return <Forbidden/> ;

  if (!rulesList.length) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.createButtonContainer}>
          <CreateRuleButton />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.createButtonContainer}>
        <CreateRuleButton />
      </div>

      <div style={styles.ruleContainer}>
        {rulesList.map((ele, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/profile/${profileId}/${ele._id}`);
            }}
            style={styles.ruleCardWrapper}
          >
            <RuleCard  
ruleName={ele.
ruleName
}
createdAt={ele.createdAt}
 />
          </div>
        ))}
      </div>
    </div>
  );
}
