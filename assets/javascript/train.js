$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyCTqt7istsQux7zoeIS9fMgevAb-biWD6Q",
        authDomain: "trainschedule-23575.firebaseapp.com",
        databaseURL: "https://trainschedule-23575.firebaseio.com",
        projectId: "trainschedule-23575",
        storageBucket: "trainschedule-23575.appspot.com",
        messagingSenderId: "341966667267"
    };

    firebase.initializeApp(config);
    
    var database = firebase.database();

    var employeeName = "";
    var role = "";
    var startDate = 0;
    var monthlyRate = "";

    $("#submit").on("click", function(event) {
        console.log("clicked")
        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#first-train").val().trim();
        var frequency = $("#frequency").val().trim();

        lastPushed = database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });


    });

    database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

        var sv = snapshot.val();

        console.log(sv.trainName);
        console.log(sv.destination);
        console.log(sv.firstTrain);
        console.log(sv.frequency);

        
        var tfrequency = snapshot.val().frequency;
        var convertedDate = moment(snapshot.val().firstTrain, 'hh:mm');
        var trainTime = moment(convertedDate).format('HH:mm');
        var currentTime = moment();
        var firstTimeConverted = moment(trainTime,'hh:mm');
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tfrequency;
        var tMinutesTillTrain = tfrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('HH:mm');

        $("#train-table").append(`<tr><td>${sv.trainName}</td><td>${sv.destination}</td><td>${sv.frequency}</td><td>${sv.firstTrain}</td><td>${tMinutesTillTrain}</td></tr>`);

        }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
        });
});
    
    