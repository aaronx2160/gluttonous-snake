import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCsOFQZJmSTE4fBUlvbVWU63KTxhVGhDYo",
    authDomain: "snake-c8432.firebaseapp.com",
    projectId: "snake-c8432",
    storageBucket: "snake-c8432.appspot.com",
    messagingSenderId: "885566490556",
    appId: "1:885566490556:web:a3040d0c085c810f268db9"
};
firebase.initializeApp(config);

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
const timeStamp = firebase.firestore.FieldValue.serverTimestamp

export {projectFirestore,projectStorage,timeStamp,config}


