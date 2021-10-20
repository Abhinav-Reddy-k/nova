import db from "../firestoreService";
const year_map = {
  1: "first",
  2: "second",
  3: "third",
  4: "fourth",
};
export const myClassesListener = (branch, section, year) => {
  return db
    .collection("online classes")
    .where("branch", "==", branch)
    .where("section", "==", section)
    .where("year", "==", year_map[year]);
};
