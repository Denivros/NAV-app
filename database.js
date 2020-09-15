(function() {
  // Set the configuration for your app
  // TODO: Replace with your project's config object
  const config = {
    apiKey: "AIzaSyAEt3og515ZuYlivFWjrY00_rsgFLdXCuA",
    authDomain: "nav-one-b8410.firebaseapp.com",
    databaseURL: "https://nav-one-b8410.firebaseio.com/",
    storageBucket: "nav-one-b8410.appspot.com"
  };
  firebase.initializeApp(config);

  const preObject = document.getElementById('object');
  const ulList = document.getElementById('list');
  // Get a reference to the database service
  const dbRefObject = firebase.database().ref().child('Aerodromes');
  const dbRefList = dbRefObject.child('Aerodromes');


  //var database = firebase.database();
  dbRefObject.on('value', snap => {
      preObject.innerText = JSON.stringify(snap.val(),null,3);
      data = snap.val();
      console.log('aaaaa',data);
      var ad_name = [];
      var icao = [];
      var iata = [];
      var coor = [];
      var elev = [];
      var type = [];
      var country = [];
      var data2 = [];

      for (i in data){
        data2 = data[i];
        ad_name.push(data2.name);
        icao.push(data2.icao)
        iata.push(data2.iata)
        elev.push(data2.elevation)
        country.push(data2.country)
        type.push(data2.type)
        coor.push(data2.coor)
      }
      console.log('ad',ad_name);
      console.log('coor',coor);
 
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

  

}());