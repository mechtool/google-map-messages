const functions = require("firebase-functions") ;
const fireAdmin = require('firebase-admin');
fireAdmin.initializeApp({
  credential : fireAdmin.credential.applicationDefault(),
  apiKey: "AIzaSyANdoXC0pXgwavYarGIt_E2ptScC-QsulU",
  authDomain: "gis-message-bdccb.firebaseapp.com",
  databaseURL: "https://gis-message-bdccb.firebaseio.com",
  projectId: "gis-message-bdccb",
  storageBucket: "",
  messagingSenderId: "226145250276",
});
const express = require("express") ;
const cors = require('cors');
const jsonData = JSON.parse(JSON.stringify([{"_id" : { "$oid" : "5770f18dec2c5aec10d81a0c" }, "date" : "01.08.2013", "body" : "Что за #дебил придумал устраивать ипподром на главной площади страны?", "lat" : "55.7542645", "long" : "37.62019157", "name" : "Aleksey S.", "center" : 1, "dateNumber" : 1375315200000 }
]));//JSON.parse(require('./lib/messageDate-21-06-17.json'));
/* Express */
const app = express() ;

app.use(cors({ origin: true }));
//app.use(express.static('lib'));
app.get("/messageDate-21-06-17.json", (request, response) => {
  let collection = fireAdmin.firestore().collection('messages');
  jsonData.forEach(doc => {
      collection.doc(doc._id.$oid).set(doc).then(()=> {
          response.send('Выполнено!')
        }
      ).catch((err) => {
        response(err);
      }) ;
  });
});

exports.app = functions.https.onRequest(app);

//  https://us-central1-gis-message.cloudfunctions.net/app


