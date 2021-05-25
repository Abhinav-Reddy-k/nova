import firebase from "../firebaseConfig";

const db = firebase.firestore();

export const getUserProfile = async (uid) => {
  const teacherProfileDoc = db.collection("teachers").doc(uid);
  const studentPrfileDoc = db.collection("students").doc(uid);
  try {
    let doc = await teacherProfileDoc.get();
    if (doc.exists) {
      return { ...doc.data(), isTeacher: true };
    }
    doc = await studentPrfileDoc.get();
    if (doc.exists) {
      return doc.data();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default db;

// teacherProfileDoc
//   .get()
//   .then((doc) =>
//     doc.exists
//       ? (profileDoc = { ...doc.data(), isTeacher: true })
//       : studentPrfileDoc
//           .get()
//           .then((doc) => (profileDoc = doc.data()))
//           .catch((err) => console.log(err))
//   )
//   .catch((err) => console.log(err));
