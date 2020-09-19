//  import firebase from "firebase/app";
//  import "firebase/database";

var fire = firebase.initializeApp({
  apiKey: "AIzaSyAEt3og515ZuYlivFWjrY00_rsgFLdXCuA",
  authDomain: "nav-one-b8410.firebaseapp.com",
  databaseURL: "https://nav-one-b8410.firebaseio.com",
  projectId: "nav-one-b8410",
  storageBucket: "nav-one-b8410.appspot.com",
  messagingSenderId: "1068648920424",
  appId: "1:1068648920424:web:4619d8376aa0eadc7692dd",
  measurementId: "G-00X6NKNK5N"
});
//firebase.analytics();

// export default fire;

const preObject = document.getElementById('object');
const ulList = document.getElementById('list');
// Get a reference to the database service
const dbRefObject = fire.database().ref().child('Aerodromes');
const dbRefList = dbRefObject.child('Aerodromes');


var ad_name = [];
var icao = [];
var iata = [];
var coor = [];
var elev = [];
var type = [];
var country = [];
var data2 = [];

dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(),null,3);
    var data = snap.val();
    // console.log('aaaaa',data);


    for (var i in data){
      data2 = data[i];
      ad_name.push(data2.name);
      icao.push(data2.icao)
      iata.push(data2.iata)
      elev.push(data2.elevation)
      country.push(data2.country)
      type.push(data2.type)
      coor.push(data2.coor)
    }
    // console.log('ad',ad_name);
    // console.log('coor',coor);

});

dbRefList.on('child_added', snap => {
    const li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key;
    ulList.appendChild(li);
}); // checkt als er iets bijkomt in de aerodromes lijst op firebase db
dbRefList.on('child_changed',snap => {
  const liChanged = document.getElementById(snap.key);
  liChanged.innerText = snap.val();
});
dbRefList.on('child_removed',snap => {
  const liToRemove = document.getElementById(snap.key);
  liToRemove.remove();
});

// export default icao;
