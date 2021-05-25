import db from "./firestoreService";

export const getSubjects = (branch) => {
  return db.collection("subjects").doc(branch).get();
};
