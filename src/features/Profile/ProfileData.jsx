import { Avatar, Col, Descriptions, Image, Row, Button, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { deleteUser } from "../../app/firebase/authService";
import { selectProfileData } from "./profileSlice";

function ProfileData() {
  let profileData = useSelector(selectProfileData);
  const { displayName, photoURL } = profileData;
  let profileDataEntries = Object.entries(profileData);
  const privateInfo = ["attendance", "to_year", "from_year", "uid", "photoURL"];

  return (
    <>
      <Row align="middle" justify="space-around">
        <Col
          span={18}
          style={{
            justifyContent: "center",
            display: "flex",
            margin: "30px 0 30px 0",
          }}
        >
          {photoURL ? (
            <Avatar size={300} src={<Image src={photoURL} />} />
          ) : (
            <Avatar
              size={100}
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
              }}
            >
              {displayName}
            </Avatar>
          )}
        </Col>
      </Row>
      <Row justify="center">
        <Descriptions bordered>
          {profileDataEntries.map(
            (entry) =>
              !privateInfo.includes(entry[0]) &&
              !Array.isArray(entry[1]) && (
                <Descriptions.Item
                  key={entry[0]}
                  label={entry[0].toUpperCase()}
                >
                  {entry[1]}
                </Descriptions.Item>
              )
          )}
        </Descriptions>
      </Row>
      <Button
        danger
        onClick={async () => {
          try {
            await deleteUser();
          } catch (error) {
            message.error(error.message);
          }
        }}
      >
        Delete My Account
      </Button>
    </>
  );
}

export default ProfileData;
