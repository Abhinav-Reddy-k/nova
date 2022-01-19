import React from "react";
import { connect } from "react-redux";
import { myClassesListener } from "../../app/firebase/firestore/classesCollection";
import { selectProfileData } from "../Profile/profileSlice";
import { myClassesLoaded } from "./classesSlice";
import ClassesCardGrid from "./ClassesCardGrid";
import useCollectionListener from "../../app/hooks/useCollectionListener";

const OnlineClass = ({ profileData, myClassesLoaded }) => {
  useCollectionListener({
    query: () =>
      myClassesListener(
        profileData.branch,
        profileData.section,
        profileData.academic_year
      ),
    data: (myClasses) => myClassesLoaded(myClasses),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: true,
  });
  return (
    <>
      <ClassesCardGrid />
    </>
  );
};

const mapStateToProps = (state) => ({
  profileData: selectProfileData(state),
});

const mapDispatchToProps = (dispatch) => ({
  myClassesLoaded: (myClasses) => dispatch(myClassesLoaded(myClasses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnlineClass);
