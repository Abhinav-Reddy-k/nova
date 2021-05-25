import db from "./firestoreService";

export const setTeacherProfileData = async ({
  photoURL,
  uid,
  displayName,
  classes, //[{"cse",1,"B"}]
  address,
  phone,
  email,
}) => {
  const teacherDoc = db.collection("teachers").doc(uid);
  const batch = db.batch();
  classes.map((classData) => {
    const branch = classData[0];
    const year = classData[1];
    const section = classData[2];
    const subject = classData[3];
    batch.set(
      db.collection(branch).doc(year),
      { [section]: { [subject]: uid } },
      { merge: true }
    );
  });
  batch.set(
    teacherDoc,
    { address, phone, photoURL, displayName, email },
    { merge: true }
  );
  return batch.commit();
};

// db.collection(branch)
//   .doc(year)
//   .set({ [section]: { [subject]: uid } })
//   .then(() => {
//     console.log("Document successfully updated!");
//   });

// try {
//   await teacherDoc.set(
//     { address, phone, photoURL, displayName, email },
//     { merge: true }
//   );
// } catch (error) {
//   console.log(error);
//   throw error;
// }
