

import * as firebase from "firebase";

const config = {

    apiKey: "AIzaSyDaIX_KfCGuoNwvsZkMKZpjRTq9wket-G8",
    authDomain: "react-nativedb-4eb41.firebaseapp.com",
    databaseURL: "https://react-nativedb-4eb41.firebaseio.com",
    projectId: "react-nativedb-4eb41",
    storageBucket: "react-nativedb-4eb41.appspot.com",
    messagingSenderId: "851136914068"
  
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();