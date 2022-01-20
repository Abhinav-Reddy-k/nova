import db from "../firestoreService";
import { year_map } from "../../common/yearMap";

export const myCodingTestListener = (branch, section, year) => {
  return db
    .collection("coding tests")
    .where("branch", "==", branch)
    .where("section", "==", section)
    .where("year", "==", year_map[year])
    .where("isStarted", "==", true);
};

export const myCodeTestDocListener = (id) => {
  return db.collection("coding tests").doc(id);
};

export const myCodeTestProgressListener = (testId, uid) => {
  return db
    .collection("coding tests")
    .doc(testId)
    .collection("progress")
    .doc(uid);
};

export const updateCodeTestProgress = (testId, uid, data) => {
  return db
    .collection("coding tests")
    .doc(testId)
    .collection("progress")
    .doc(uid)
    .update(data);
};

export const setCodeTestProgress = (testId, uid, data) => {
  return db
    .collection("coding tests")
    .doc(testId)
    .collection("progress")
    .doc(uid)
    .set(data, { merge: true });
};
