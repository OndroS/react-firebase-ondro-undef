import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBq8isPkxr4mKaqbKDB0waXI-eHf6MG5vU",
  authDomain: "airdrop-cf2c8.firebaseapp.com",
  databaseURL: "https://airdrop-cf2c8.firebaseio.com",
  projectId: "airdrop-cf2c8",
  storageBucket: "airdrop-cf2c8.appspot.com",
  messagingSenderId: "187865787606"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth