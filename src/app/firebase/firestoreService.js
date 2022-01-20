import firebase from "./firebaseConfig";

const db = firebase.firestore();

export const getTimeStamp = () => {
  return firebase.firestore.Timestamp.now();
};

export const dataFromSnapshot = (snapshot) => {
  const data = snapshot.data();
  data.id = snapshot.id;
  for (const prop in data) {
    if (data[prop] instanceof firebase.firestore.Timestamp) {
      data[prop] = Date(data[prop].toDate()).toString();
    }
  }
  return data;
};

export const studentProfileConverter = {
  toFirestore: function (studentProfile) {
    studentProfile.rollno = studentProfile.rollno.toLowerCase();
    studentProfile.section = studentProfile.section.toUpperCase();
    return studentProfile;
  },
  fromFirestore: function (snapshot, options) {
    const studentProfile = snapshot.data(options);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const from_year = studentProfile.from_year;
    const academic_year = month <= 4 ? year - from_year : year - from_year + 1;
    return {
      ...studentProfile,
      academic_year,
    };
  },
};

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

export function setStudentProfileData(student, id) {
  return db
    .collection("students")
    .doc(id)
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
