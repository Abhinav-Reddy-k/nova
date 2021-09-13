import firebase from "./firebaseConfig";

const db = firebase.firestore();
if (location.hostname === "localhost") {
  db.useEmulator("localhost", 8080);
}

export const getUserProfile = async (uid) => {
  const studentPrfileDoc = db.collection("students").doc(uid);
  try {
    let doc = await studentPrfileDoc
      .withConverter(studentProfileConverter)
      .get();
    if (doc.exists) {
      return doc.data();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteStudentProfileData = async (uid) => {
  const studentPrfileDoc = db.collection("students").doc(uid);
  try {
    let doc = await studentPrfileDoc.get();
    if (doc.exists) {
      studentPrfileDoc.delete();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const studentProfileConverter = {
  toFirestore: function (studentProfile) {
    studentProfile.rollno = studentProfile.rollno.toLowerCase();
    studentProfile.section = studentProfile.section.toUpperCase();
    const attendance = `/attendance/${studentProfile.uid}`;
    return {
      ...studentProfile,
      attendance,
    };
  },
  fromFirestore: function (snapshot, options) {
    const studentProfile = snapshot.data(options);
    const date = new Date();
    const year = date.getFullYear();
    const from_year = studentProfile.from_year;
    return {
      ...studentProfile,
      academic_year: year - from_year,
    };
  },
};

export function setStudentProfileData(student) {
  return db
    .collection("students")
    .doc(student.uid)
    .withConverter(studentProfileConverter)
    .set(student, { merge: true });
}

export function studentTasksListener(year, branch, section) {
  return db
    .collection("tasks")
    .doc(year.toString())
    .collection(branch)
    .where("sections", "array-contains", section);
}

export default db;
