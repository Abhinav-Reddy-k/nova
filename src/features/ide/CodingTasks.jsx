import React from "react";
import { connect } from "react-redux";
import { myCodingTestListener } from "../../app/firebase/firestore/codingCollection";
import useFirestoreCollection from "../../app/hooks/useCollectionListener";
import { selectProfileData } from "../Profile/profileSlice";
import { myCodingTaskesLoaded } from "./codeTasksSlice";
import CodeTestsGrid from "./CodeTestsGrid";

const CodingTasks = ({ profileData, myCodingTaskesLoaded }) => {
  useFirestoreCollection({
    query: () =>
      myCodingTestListener(
        profileData.branch,
        profileData.section,
        profileData.academic_year
      ),
    data: (codingTasks) => myCodingTaskesLoaded(codingTasks),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: true,
  });
  return (
    <div>
      <CodeTestsGrid />
    </div>
  );
};

const mapStateToProps = (state) => ({
  profileData: selectProfileData(state),
});

const mapDispatchToProps = (dispatch) => ({
  myCodingTaskesLoaded: (myCodingTests) =>
    dispatch(myCodingTaskesLoaded(myCodingTests)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodingTasks);
