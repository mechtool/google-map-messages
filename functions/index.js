const fireAdmin = require('firebase-admin');
const functions = require("firebase-functions") ;
const express = require("express") ;
const cors = require('cors');

fireAdmin.initializeApp({
  credential : fireAdmin.credential.applicationDefault(),
  apiKey: "AIzaSyANdoXC0pXgwavYarGIt_E2ptScC-QsulU",
  authDomain: "gis-message-bdccb.firebaseapp.com",
  databaseURL: "https://gis-message-bdccb.firebaseio.com",
  projectId: "gis-message-bdccb",
  storageBucket: "gis-message-bdccb.appspot.com",
  messagingSenderId: "226145250276",
});

const jsonData = JSON.parse(JSON.stringify(require('./lib/messageDate-21-06-17.json')));
/* Express */
const app = express() ;

app.use(cors({ origin: true }));
//app.use(express.static('lib'));
app.get("/messageDate-21-06-17.json", (request, response) => {
  let collection = fireAdmin.database().ref('messages');
  jsonData.forEach(doc => {
      doc.id = doc._id.id;
      delete doc._id;
      collection.child(doc.id).set(doc, (err)=>{
        if(err){
          response.send(err);
        }
        else{
          response.send('Выполнено!')
        }
      });
  });
});

exports.app = functions.https.onRequest(app);

//  https://us-central1-gis-message-bdccb.cloudfunctions.net/app


