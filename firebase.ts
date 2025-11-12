// Fix: Add a global declaration for window.firebase to resolve TypeScript errors.
// This is necessary when Firebase is included via a <script> tag instead of npm imports.
declare global {
    interface Window {
        firebase: any;
    }
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDfy3NGKn85zWHHhIMvDziewlB4z5ds5g",
  authDomain: "odontologia-pedro.firebaseapp.com",
  projectId: "odontologia-pedro",
  storageBucket: "odontologia-pedro.appspot.com",
  messagingSenderId: "972081595419",
  appId: "1:972081595419:web:cf3dc43316db08992164be",
  measurementId: "G-WLV988TG9Z"
};

// Initialize Firebase if not already initialized
if (!window.firebase.apps.length) {
  window.firebase.initializeApp(firebaseConfig);
}

// Export services for use in the app
export const db = window.firebase.firestore();
export const auth = window.firebase.auth();
export const storage = window.firebase.storage();