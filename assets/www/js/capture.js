/**
 * Created with JetBrains PhpStorm.
 * User: Bilou
 * Date: 21/05/13
 * Time: 14:49
 * To change this template use File | Settings | File Templates.
 */
var capture = {
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
        document.addEventListener("backbutton", this.onBackButton, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        gps.startWatch();
    },

    /*
        Gestion de la prise de photo
     */
    // A button will call this function
    //
    capturePhoto:function() {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(capture.onPhotoURISuccess, capture.onFail, { quality: 100,
        destinationType: navigator.camera.DestinationType.FILE_URI });
    },
    // Called when a photo is successfully retrieved
    //
    onPhotoURISuccess:function(imageURI) {
        // Uncomment to view the image file URI
        // console.log(imageURI);

        // Get image handle
        //
        var smallImage = document.getElementById('smallImage');

        // Unhide image elements
        //
        smallImage.style.display = 'block';

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //
        smallImage.src = imageURI;

        pictureData = imageURI;

        //Change capture photo button
        $('.capturePhoto').html('Changer photo');
        $('.captureSave').css('display','block');
    },
    // Called if something bad happens.
    //
    onFail:function(message) {
        console.log('Failed because: ' + message);
    },
    /*
        Gestion de la sauvegarde de la photo
     */

    //save picture on database
    onSave:function(){
        //insertion de la photo et de sa position GPS dans la base de données.
        var db = window.openDatabase("Database", "1.0", "Gallery", 1000000);
        db.transaction(capture.populateDB, capture.errorCB, capture.successCB);
    },

    populateDB:function(tx){
        var pictureURI = pictureData;
        var latitude = positionGps.coords.latitude;
        var longitude = positionGps.coords.longitude;
        var sql = 'INSERT INTO Pictures (data,lat,long,status) VALUES ("'+pictureURI+'",'+latitude+','+longitude+',"local")';
        tx.executeSql(sql);
    },
    //A delete
    onDisplaySql:function(){
        var db = window.openDatabase("Database", "1.0", "Gallery", 1000000);
        db.transaction(capture.displayDB, capture.errorCB, capture.successCB);
    },
    //A delete
    displayDB:function(tx){
        tx.executeSql('SELECT * FROM Pictures',[],capture.displayRows,capture.errorCB);
    },
    //A delete
    displayRows:function(tx,results){
        console.log("Affiche pictures");
        var len = results.rows.length;
        var html="";
        html+="Il y a "+len+" lignes dans la table Pictures";
        for(i=0;i<len;i++){
            html+="<br>Row = "+i+" ID = "+results.rows.item(i).id+" Data = "+results.rows.item(i).data+" Lat = "+results.rows.item(i).lat+" Long = "+results.rows.item(i).long;
        }
        $('#turnMe').html(html);
    },
    // Transaction error callback
    //
    errorCB:function(tx, err) {
        alert("Error processing SQL: "+err);
    },

    // Transaction success callback
    //
    successCB:function() {
        alert("success! Picture save in database");
    },

    /*
        Others
     */
    //Sur appui du bonton back
    onBackButton:function(){
        gps.clearWatch();
        window.location = 'index.html';
    }
}