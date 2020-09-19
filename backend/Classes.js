export default class Aerodrome {
    constructor(name, coordinate,icao) {
      this.name = name;
      this.coordinate = coordinate;
      this.icao = icao;
    }
    get decimal_lat (){
        return this.Calc_decimal_lat();
    }
    Calc_decimal_lat (){
        var lat_deg = this.coordinate.substring(0,2);
        var lat_min = this.coordinate.substring(2,4);
        var lat_sec = this.coordinate.substring(4,6);
        return parseInt(lat_deg) + parseInt(lat_min) / 60 +  parseInt(lat_sec) / 3600
    }

    get decimal_long (){
        return this.Calc_decimal_long();
    }
    Calc_decimal_long (){
        var long_deg = this.coordinate.substring(7,10);
        var long_min = this.coordinate.substring(10,12);
        var long_sec = this.coordinate.substring(12,14);
        return parseInt(long_deg) + parseInt(long_min) / 60 +  parseInt(long_sec) / 3600
    }
    get gps_coor (){
        return this.Calc_gps_coor();
    }
    Calc_gps_coor (){
        var lat_deg = this.coordinate.substring(0,2);
        var lat_min = this.coordinate.substring(2,4);
        var lat_sec = this.coordinate.substring(4,6);
        var long_deg = this.coordinate.substring(7,10);
        var long_min = this.coordinate.substring(10,12);
        var long_sec = this.coordinate.substring(12,14);
        var N_S = this.coordinate[6];
        var E_W = this.coordinate[14];
        return lat_deg + '°' + lat_min + "'" + lat_sec + "\"" + N_S + " " + long_deg + "°" + long_min + "'" + long_sec + "\"" + E_W
    }
  }

export default class Waypoint {
    constructor(name, coordinate) {
      this.name = name;
      this.coordinate = coordinate;
    }
    get decimal_lat (){
        return this.Calc_decimal_lat();
    }
    Calc_decimal_lat (){
        var lat_deg = this.coordinate.substring(0,2);
        var lat_min = this.coordinate.substring(2,4);
        var lat_sec = this.coordinate.substring(4,6);
        return parseInt(lat_deg) + parseInt(lat_min) / 60 +  parseInt(lat_sec) / 3600
    }

    get decimal_long (){
        return this.Calc_decimal_long();
    }
    Calc_decimal_long (){
        var long_deg = this.coordinate.substring(7,10);
        var long_min = this.coordinate.substring(10,12);
        var long_sec = this.coordinate.substring(12,14);
        return parseInt(long_deg) + parseInt(long_min) / 60 +  parseInt(long_sec) / 3600
    }
    get gps_coor (){
        return this.Calc_gps_coor();
    }
    Calc_gps_coor (){
        var lat_deg = this.coordinate.substring(0,2);
        var lat_min = this.coordinate.substring(2,4);
        var lat_sec = this.coordinate.substring(4,6);
        var long_deg = this.coordinate.substring(7,10);
        var long_min = this.coordinate.substring(10,12);
        var long_sec = this.coordinate.substring(12,14);
        var N_S = this.coordinate[6];
        var E_W = this.coordinate[14];
        return lat_deg + '°' + lat_min + "'" + lat_sec + "\"" + N_S + " " + long_deg + "°" + long_min + "'" + long_sec + "\"" + E_W
    }
  }

var coordinate = "505900N0034000E"
//console.log(coordinate.substring(0,2));
var AD = new Aerodrome("Antwerpen Airport",coordinate,"EBAW");
//console.log(AD.decimal_long)
//console.log(AD.gps_coor)

//exports
