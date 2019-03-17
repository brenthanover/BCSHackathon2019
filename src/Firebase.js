const firebase = require('firebase/app');
require('firebase/database');

const config = {
    apiKey: "AIzaSyCNmaSPCktKr5T-Stq6mL3wlnIuJ9xD-Ss",
    authDomain: "bcs-hackathon-2019.firebaseapp.com",
    databaseURL: "https://bcs-hackathon-2019.firebaseio.com",
    projectId: "bcs-hackathon-2019",
    storageBucket: "bcs-hackathon-2019.appspot.com",
    messagingSenderId: "473934570743"
};

firebase.initializeApp(config);

export default firebase;

