/**
 * Created with JetBrains PhpStorm.
 * User: Bilou
 * Date: 22/05/13
 * Time: 00:29
 * To change this template use File | Settings | File Templates.
 */
var importe = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        //Récuperation de la position GPS
        gps.startWatch();
    },

    /*

     */

    // A button will call this function
    //
    getPhoto:function(source) {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(importe.onPhotoURISuccess, importe.onFail, { quality: 100,
            destinationType: destinationType.FILE_URI,
            sourceType: source });
    },
    onPhotoURISuccess:function(imageURI){
        var smallImage = document.getElementById('importedPicture');
        pictureData = imageURI;
        //console.log(pictureData);
        smallImage.src = pictureData;
        $('.captureSave').css('display','block');
    },
    onFail:function(message){
        alert('Failed because: ' + message);
    }
}