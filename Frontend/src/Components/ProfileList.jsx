import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import ProfileCard from "../Components/Profile";

export default function ProfileList() {
  const navigate = useNavigate();

  const avatarURLs = [
    "https://cdn.pixabay.com/photo/2024/02/02/04/20/ai-generated-8547231_1280.png",
    "https://cdn.pixabay.com/photo/2024/02/02/04/20/ai-generated-8547221_1280.png",
    "https://cdn.pixabay.com/photo/2024/07/31/23/13/ai-generated-8935730_1280.png",
    "https://media.istockphoto.com/id/1454009457/vector/portrait-of-a-farmer-in-a-hat-logo-agriculture-farm-emblem-color-vector-illustration.jpg?s=612x612&w=0&k=20&c=Z6oehDIYKXO26Wkwc3ZtLjCwr5WWJRXDTM19iPSpaDw=",
    "https://cdn.pixabay.com/photo/2022/04/01/23/47/face-7105935_1280.png",
    "https://media.istockphoto.com/id/1275857176/vector/young-african-american-woman-smiling-with-closed-her-eyes.jpg?s=612x612&w=0&k=20&c=zOC_zBfoKftby9zV3vX_ibvmDosshy5R2N7lp-wMsOY=",
    "https://cdn.pixabay.com/photo/2024/02/14/05/34/ai-generated-8572403_1280.png",
    "https://cdn.pixabay.com/photo/2022/06/06/20/38/woman-7246936_1280.png",
    "https://cdn.pixabay.com/photo/2025/06/27/08/20/woman-9683377_1280.png",
    "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_1280.png",
    
  ];

  const [profiles, setProfiles] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/profile/profileslist`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("fteched profile list is ", data);
    if (res.ok) setProfiles(data.profiles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      {profiles.length > 0 &&
        profiles.map((profile, index) => {
          const randomURL =
            avatarURLs[Math.floor(Math.random() * avatarURLs.length)];
          return (
            <ProfileCard
              onClickHandler={() => {
                navigate(`/profile/${profile.profileId}`);
              }}
              key={index}
              Name={profile.displayName}
              Email={profile.emailAddress}
              Profile={randomURL}
              profileId={profile.profileId}
            />
          );
        })}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    justifyContent: "center",
  },
};
