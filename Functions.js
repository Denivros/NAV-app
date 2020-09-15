import Waypoint from './Classes.js'
import turf from '@turf/turf'

function distance_nm(wpt1,wpt2) {
	if ((wpt1.decimal_lat == wpt2.decimal_lat) && (wpt1.decimal_long == wpt2.decimal_long)) {
		return 0;
	}
	else {
		var data1 = wpt1.decimal_lat
        var data2 = wpt1.decimal_long
        var data3 = wpt2.decimal_lat
        var data4 = wpt2.decimal_long
        var from = turf.point([data2,data1]);
        var to = turf.point([data4,data3]);
        var options = {units: 'kilometers'};
        var d = turf.distance(from, to, options);

		return Math.round(km_to_nm(d))
	}
}

function bearing(wpt1,wpt2) {
	if ((wpt1.decimal_lat == wpt2.decimal_lat) && (wpt1.decimal_long == wpt2.decimal_long)) {
		return 0;
	}
	else {
		var data1 = wpt1.decimal_lat
        var data2 = wpt1.decimal_long
        var data3 = wpt2.decimal_lat
        var data4 = wpt2.decimal_long
        var from = turf.point([data2,data1]);
        var to = turf.point([data4,data3]);
        var options = {units: 'kilometers'};
        var b = turf.bearing(from,to);
        if (b<0){
            b += 360
        }
        return Math.round(b)
    }
}

function km_to_nm(d) {
    return d*0.539957
}

function wind_calc(wind){
    var wind_dir = wind.substring(0,3);
    var wind_v = wind.substring(4,6);
    return [parseInt(wind_dir),parseInt(wind_v)]
}

function vector_point_calc(angle,size){
    const pi = Math.PI;
    angle = ((-1) * angle ) + 90
    var angle_rad = angle * (pi/180);
    var x = 0;
    var y = 0;
    x = Math.cos(angle_rad) * size;
    y = Math.sin(angle_rad) * size;
    return [x,y]
}

function vector_length(vector) {
    var x = vector[0]
    var y = vector[1]
    var length = 0
    length = Math.sqrt(x*x + y*y)
    return length
}

function hwc_xwc(course,wind) {
    var wind_angle = 0
    var wind_v = 0
    var data = 0
    data = wind_calc(wind);
    wind_angle = data[0]
    wind_v = data[1]
    var diff = wind_angle - course;
    if (diff >= 180){
        diff -= 360
    }
    const pi = Math.PI;

    var diff_rad = diff * (pi/180);
    var hwc = 0;
    var xwc = 0;
    hwc = Math.cos(diff_rad) * wind_v *(-1); // hwc geeft - aan bij tailwind maar moet dus opgeteld worden
    xwc = Math.sin(diff_rad) * wind_v;
    return [hwc,xwc]

}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function wind_triangle(tas,wind,course) {
    var hwc = hwc_xwc(course,wind)[0];
    var xwc = hwc_xwc(course,wind)[1];
    var wind_dir = 0;
    var wind_v = 0
    var data = 0;
    data = wind_calc(wind)
    wind_dir = data[0];
    wind_v = wind_calc(wind)[1];
    var gs = tas + hwc;
    var gs_vect = [0,0];
    var w_vect = [0,0];
    gs_vect = vector_point_calc(course,gs);
    w_vect = vector_point_calc(wind_dir,wind_v);
    var tas_vect = [0,0]
    tas_vect[0] = w_vect[0] + gs_vect[0]
    tas_vect[1] = w_vect[1] + gs_vect[1]
    var angle = 0
    var heading = 0
    angle = Math.acos((tas_vect[0] * gs_vect[0] + tas_vect[1] * gs_vect[1])/(vector_length(tas_vect)*vector_length(gs_vect)));
    angle = radians_to_degrees(angle);
    if (xwc > 0) {
        heading = course + angle;
    }
    if (xwc < 0) {
        heading = course - angle;
    }
    return [tas,Math.round(heading),Math.round(gs),course,wind_dir,wind_v]
}

function time_calc(dist,gs){
    return dist/gs
}

function format_time(time) {
    var min = 0
    var sec = 0
    min = time * 60;
    sec = min % 1;
    min = min - sec;
    sec = sec *60
    sec = Math.round(sec)

    if (min < 10){
        min = "0" + min.toString()
    }
    else{
        min = min.toString()
    }
    if (sec < 10){
        sec = "0" + sec.toString()
    }
    else {
        sec = sec.toString()
    }
    
    return min + ":" + sec.toString()
}



function time_sum(time1,time2){
    var min1 = ''
    var min2 = ''
    var sec1 = ''
    var sec2 = ''
    var min = 0
    var sec = 0

    min1 = parseInt(time1.substring(0,2));
    min2 = parseInt(time2.substring(0,2));
    sec1 = parseInt(time1.substring(3,5));
    sec2 = parseInt(time2.substring(3,5));
    min = min1 +min2;
    sec = sec1 + sec2
    if (sec >= 60){
        min += 1;
        sec -= 60;
    }
    if (sec < 10){sec = "0" + sec.toString()}
    else {sec = sec.toString()}
    if (min < 10){min = "0" + min.toString()}
    else { min = min.toString() }
    console.log(min1,min2,sec1,sec2,min,sec)
    return min + ":" + sec
}

var coor1 = '510714N0041308E'; // depinte
var coor2 = '505900N0034000E'; //tango
var coor2 = '505428N0040820E'; // AFI
var wpt1 = new Waypoint('DEPINTE',coor1);
var wpt2 = new Waypoint('TANGO',coor2);
console.log('dist',distance_nm(wpt1,wpt2))
console.log('hdg',bearing(wpt1,wpt2))
console.log(wind_triangle(100,"020/10",193));
console.log(wind_triangle(100,"020/10",259));
console.log('time',time_calc(13,110));
console.log('timeformat',format_time(time_calc(13,110)));
console.log('time sum',time_sum(format_time(time_calc(13,110)),"07:55"))
