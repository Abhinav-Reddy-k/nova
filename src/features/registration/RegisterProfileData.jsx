import React from "react";

import StudentProfileForm from "../Profile/StudentProfileForm";
import ReistrationSteps from "./ReistrationSteps";

function Profile() {
  return (
    <>
      <ReistrationSteps currentStep={2} />

      <StudentProfileForm />
    </>
  );
}

export default Profile;
