import { Switch } from "antd";
import React, { useState } from "react";

import StudentProfile from "../Profile/StudentProfileForm";
import TeachersProfile from "../Profile/TeachersProfileForm";
import ReistrationSteps from "./ReistrationSteps";

function Profile() {
  let [isTeacher, setIsTeacher] = useState(false);
  return (
    <>
      <ReistrationSteps currentStep={2} />

      <Switch
      style={{margin:"20px"}}
        checkedChildren="Teacher"
        unCheckedChildren="Student"
        onChange={(bool) => setIsTeacher(bool)}
      />
      {isTeacher ? <TeachersProfile /> : <StudentProfile />}
    </>
  );
}

export default Profile;
