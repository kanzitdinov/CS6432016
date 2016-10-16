import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAnFjJxCy3SyP4a6R4FbFlvK7IZfGqofxQ",
  authDomain: "twilioeducation.firebaseapp.com",
  databaseURL: "https://twilioeducation.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "369475800090"
};

let firebaseApp = firebase.initializeApp(config);
let database = firebase.database().ref();
let solutionsRefs = database.child('solutions');

let exportData = {
  App: firebaseApp,
  Database: database,
  SolutionsRefs: solutionsRefs,
}

export default exportData
