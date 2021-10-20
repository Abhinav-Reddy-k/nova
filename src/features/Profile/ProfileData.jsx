import { message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { deleteUser } from "../../app/firebase/authService";
import { selectProfileData } from "./profileSlice";
import "./ProfileData.css";

function ProfileData() {
  let profileData = useSelector(selectProfileData);
  const { displayName, photoURL } = profileData;
  let profileDataEntries = Object.entries(profileData);
  const privateInfo = ["attendance", "to_year", "from_year", "uid", "photoURL"];

  return (
    <>
      <div className="wrapper">
        <div className="profile-card js-profile-card">
          <div className="profile-card__img">
            <img src={photoURL} alt="profile card" />
          </div>

          <div className="profile-card__cnt js-profile-cnt">
            <div className="profile-card__name">{displayName}</div>
            <div className="profile-card__txt">
              Student at <strong>KMIT</strong>
            </div>

            <div className="profile-card-inf">
              {profileDataEntries.map(
                (entry, index) =>
                  !privateInfo.includes(entry[0]) &&
                  !Array.isArray(entry[1]) && (
                    <div key={index} className="profile-card-inf__item">
                      <div className="profile-card-inf__title">
                        {entry[0].toUpperCase()}
                      </div>
                      <div className="profile-card-inf__txt">
                        <pre>{entry[1]}</pre>
                      </div>
                    </div>
                  )
              )}
            </div>

            <div className="profile-card-ctr">
              <button
                onClick={async () => {
                  try {
                    await deleteUser();
                  } catch (error) {
                    message.error(error.message);
                  }
                }}
                className="profile-card__button button--orange"
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileData;
