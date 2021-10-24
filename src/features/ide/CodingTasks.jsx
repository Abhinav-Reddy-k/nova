import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myCodingTestListener } from "../../app/firebase/firestore/codingCollection";
import { selectProfileData } from "../Profile/profileSlice";
import { myCodingTaskesLoaded } from "./codeTasksSlice";
import CodeTestsGrid from "./CodeTestsGrid";

const CodingTasks = () => {
  const profileData = useSelector(selectProfileData);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = myCodingTestListener(
      profileData.branch,
      profileData.section,
      profileData.academic_year
    ).onSnapshot((querySnapshot) => {
      let myCodingTests = [];
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        myCodingTests.push({
          ...docData,
          startTime: docData.startTime.toDate().toString(),
        });
      });
      dispatch(myCodingTaskesLoaded(myCodingTests));
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <CodeTestsGrid />
    </div>
  );
};

export default CodingTasks;
