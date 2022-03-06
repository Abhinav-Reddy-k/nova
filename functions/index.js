const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp();
const firestore = admin.firestore();
exports.deleteProgress = functions.firestore
  .document("coding tests/{progressId}")
  .onDelete((snap, context) => {
    const progressRef = firestore
      .collection("coding tests")
      .doc(context.params.progressId)
      .collection("progress");
    return firestore.recursiveDelete(progressRef);
  });
