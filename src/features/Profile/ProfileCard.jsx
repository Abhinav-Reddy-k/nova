import React from "react";
import { useSelector } from "react-redux";

import { selectProfileData } from "./profileSlice";

import "./ProfileCard.css";

function ProfileCard() {
  let profileData = useSelector(selectProfileData);
  let x = Object.entries(profileData);
  console.log(x);
  console.log(profileData);
  return (
    <div className="body">
      <aside className="profile-card">
        <header>
          <a target="_blank">
            <img
              src="https://lh3.googleusercontent.com/a-/AOh14Gj24jFHK4oq5Fkb09tbURh3xlMkmeYV8-XfNVukYA=s96-c"
              className="hoverZoomLink"
            />
          </a>

          <h1>{profileData.displayName}</h1>

          <h2>{profileData.isTeacher ? "Teacher" : "Student"}</h2>
        </header>

        <div className="profile-bio">
          {x.map((entry) =>
            entry[0] !== "uid" ? (
              <p key={entry[0]}>{`${entry[0]} : ${entry[1]}`}</p>
            ) : (
              ""
            )
          )}
        </div>
      </aside>
    </div>
  );
}

export default ProfileCard;
