import {Waypoint} from './Classes.js'
import {adObjectList,wptObjectList} from "./index.js";
import {distance_nm} from "./Functions.js";

// var route = ['TANGO','RUPEL','KONTI']
// var ad_dep = 'EBAW'
// var ad_arr = 'EBOS'
// var ad_altn = 'EBKT'
var route_obj = []
var ad_dep_obj = []
var ad_arr_obj = []
var ad_altn_obj = []
// console.log('ad',adObjectList)
// console.log('wpt',wptObjectList)
export default function calcRoute(ad_dep,ad_arr,ad_altn,route){
    route_obj = []
    getRoute(ad_dep,ad_arr,ad_altn,route)
    var wpt1 = []
    var wpt2 = []
    for (var i = 0; i < route_obj.length; i++){
        wpt1 = new Waypoint(route_obj[i].name, route_obj[i].coordinate,route_obj[i].country,route_obj[i].to_ad_icao)
        wpt2 = new Waypoint(route_obj[i+1].name, route_obj[i+1].coordinate,route_obj[i+1].country,route_obj[i+1].to_ad_icao)
        var dist = distance_nm(wpt1,wpt2)
    }
    console.log(wpt1)
    console.log(dist)

}

function getRoute(ad_dep,ad_arr,ad_altn,route){
    for (var n in adObjectList){
        var icao = adObjectList[n].icao;
        if (icao == ad_dep){
            ad_dep_obj = adObjectList[n];
        }
        if (icao == ad_arr){
            ad_arr_obj = adObjectList[n];
        }
        if (icao == ad_altn){
            ad_altn_obj = adObjectList[n];
        }
    }

    for (var i in wptObjectList){
        var name = wptObjectList[i].name
        for (var j = 0; j < route.length; j++){
            if (route[j] == name){
                route_obj.push(wptObjectList[i])}
            else {continue}
        }
    }
    route_obj.unshift(ad_dep_obj);
    route_obj.push(ad_arr_obj)
    console.log('route obj',route_obj)
    console.log('test',ad_dep_obj,ad_arr_obj,ad_altn_obj)

}




export var niks = []
