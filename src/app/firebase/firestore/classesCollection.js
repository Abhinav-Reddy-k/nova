import { year_map } from "../../common/yearMap";
import db from "../firestoreService";

export const myClassesListener = (branch, section, year) => {
  return db
    .collection("online classes")
    .where("branch", "==", branch)
    .where("section", "==", section)
    .where("year", "==", year_map[year]);
};
