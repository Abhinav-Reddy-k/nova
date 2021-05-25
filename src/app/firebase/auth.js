import firebase from "./firebaseConfig";

export function authStateListener(observer) {
  return firebase.auth().onAuthStateChanged(observer);
}

export function signOut() {
  return firebase.auth().signOut();
}

export function signInWithEmailPassword({ email, password }) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function signUpWithEmail(creds) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    await result.user.updateProfile({
      displayName: creds.username,
    });
  } catch (error) {
    throw error;
  }
}

export function sendEmailVerification() {
    return firebase.auth().currentUser.sendEmailVerification({
      url: "http://localhost:3000/registration/profile",
    });  
  }

export function sendPasswordReset(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  
}

export const getCurrentUserInfo = () => {
  return firebase.auth().currentUser;
};

//   Other auth providers

export function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === "github") {
    provider = new firebase.auth.GithubAuthProvider();
  }
  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  return firebase.auth().signInWithPopup(provider);
}
