/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        $('.received').css('display','none');
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
        $('.listening').html('Check database');
        console.log('Check database');
        app.initiateDataBase();
        //tmp
        $('.received').css('display','block');
        console.log('All check !');
        $('.received').html('All check !');
        /*if(errorCheck=false){
         $('.listening').css('display','none');
         $('.received').css('display','block');
         console.log('All check !');
         $('.received').html('All check !');
        }*/
        app.loadPictures();
    },
    //initialize database
    initiateDataBase:function(){
        var db = window.openDatabase("Database", "1.0", "Gallery", 1000000);
        db.transaction(app.populateDB, app.errorCB, app.successCB);
    },
    populateDB:function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS Pictures (id unique, data,lat,long,status)');
    },
    errorCB:function(tx, err){
        $('.listening').html('Database error');
        console.log('Database error');
        alert("Error processing SQL: "+err);
        //errorCheck=true;
    },
    successCB:function(){
        console.log('Database OK');
        $('.listening').html('Database OK');
        //errorCheck=false;
    },
    loadPictures:function(){
        var db = window.openDatabase("Database", "1.0", "Gallery", 1000000);
        db.transaction(app.loadDB, app.errorCB, app.successCB);
    },
    loadDB:function(tx){
        var sql = "SELECT * FROM Pictures";
        tx.executeSql(sql,[],app.displayRows,app.errorCB);
    },
    displayRows:function(tx,results){
        var len = results.rows.length;
        var html="";
        for(i=0;i<len;i++){
            html+="<div class='picture'><a onclick='loadImage("+results.rows.item(i).id+")'><img src="+results.rows.item(i).data+"></a></div>";
        }
        $('#pictures').html(html);
    },
    loadImage:function(id){

    },

    /*
        Suppression d'une image
     */
    onDelete:function(URI){
        var db = window.openDatabase("Database", "1.0", "Gallery", 1000000);
        db.transaction(app.deletePicture, app.errorCB, app.successCB);
        imageURI = URI;
    },
    deletePicture:function(tx){
        var sql = 'DELETE FROM Pictures WHERE data = '+imageURI;
        tx.executeSql(sql);
    }
};