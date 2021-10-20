import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";
import { myClassesListener } from "../../app/firebase/firestore/classesCollection";
import { selectProfileData } from "../Profile/profileSlice";
import { myClassesLoaded } from "./classesSlice";
import ClassesCardGrid from "./ClassesCardGrid";

const OnlineClass = () => {
  const profileData = useSelector(selectProfileData);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = myClassesListener(
      profileData.branch,
      profileData.section,
      profileData.academic_year
    ).onSnapshot((querySnapshot) => {
      let myClasses = [];
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        myClasses.push({
          ...docData,
          startTime: docData.startTime.toDate().toString(),
        });
      });
      dispatch(myClassesLoaded(myClasses));
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <ClassesCardGrid />
    </>
  );
};

export default OnlineClass;
