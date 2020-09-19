import firebase from "firebase/app";
import "firebase/database";
import {Waypoint,Aerodrome} from '../../../../backend/Classes.js'

var config = {
  apiKey: "AIzaSyAEt3og515ZuYlivFWjrY00_rsgFLdXCuA",
  authDomain: "nav-one-b8410.firebaseapp.com",
  databaseURL: "https://nav-one-b8410.firebaseio.com",
  projectId: "nav-one-b8410",
  storageBucket: "nav-one-b8410.appspot.com",
  messagingSenderId: "1068648920424",
  appId: "1:1068648920424:web:4619d8376aa0eadc7692dd",
  measurementId: "G-00X6NKNK5N"
}
//firebase.analytics();
const fire = firebase.initializeApp(config);
export const db = fire.database();

export var adObjectList = []
export var wptObjectList = []

const dbRefObject = db.ref().child('Aerodromes');
var ad_name = [];
var ad_icao = [];
var ad_iata = [];
var ad_coor = [];
var ad_elev = [];
var ad_type = [];
var ad_country = [];
var data2 = [];
dbRefObject.on('value',snap => {
  var data = snap.val()
  for (var i in data){
    data2 = data[i];
    ad_name.push(data2.name);
    ad_icao.push(data2.icao);
    ad_iata.push(data2.iata);
    ad_elev.push(data2.elevation);
    ad_country.push(data2.country);
    ad_type.push(data2.type);
    ad_coor.push(data2.coor);

    var ad = new Aerodrome(data2.name,data2.coor,data2.icao,data2.country,data2.elevation,data2.iata,data2.type);
    adObjectList.push(ad);
    
    }
    console.log('adobj',adObjectList)
  // console.log(icao)
});
const dbRefObject_wpt = db.ref().child('Waypoints');
var wpt_name = [];
var wpt_to_ad_icao = [];
var wpt_coor = [];
var wpt_country = [];
data2 = [];

dbRefObject_wpt.on('value',snap => {
  var data = snap.val()
  for (var i in data){
    data2 = data[i];
    wpt_name.push(data2.name);
    wpt_to_ad_icao.push(data2.to_ad_icao);
    wpt_country.push(data2.country);
    wpt_coor.push(data2.coor);
    var wpt = new Waypoint(data2.name,data2.coor,data2.country,data2.to_ad_icao);
    wptObjectList.push(wpt);
    }
  // console.log(wpt_name)
  // console.log('data',data)
  // console.log('wpt name',wpt_name)
  //this.selectionWaypoints = name;

});