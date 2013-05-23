var gps = {
    startWatch:function(){
        //Récuperation de la position GPS
        var options = { timeout: 5000,enableHighAccuracy: true,maximumAge:3000 };
        watchID = navigator.geolocation.watchPosition(gps.onSuccess, gps.onError, options);
    },
    //Position relevé avec success et mise a jour toutes les 5sec
    onSuccess:function(position){
        positionGps = position;
        //console.log('Latitude: '+positionGps.coords.latitude+' '+'Longitude: '+positionGps.coords.longitude);
    },
    // onError Callback receives a PositionError object
    //
    onError:function(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    },
    clearWatch:function(){
        if(watchID != null){
            navigator.geolocation.clearWatch(watchID);
            watchID=null;
        }
    }
}