var firebaseConfig = {
  apiKey: "AIzaSyBSdPGhZogrV4wPpmiTyBRnJmL-LIeC78Q",
  authDomain: "train-scheduler-d7046.firebaseapp.com",
  databaseURL: "https://train-scheduler-d7046.firebaseio.com",
  projectId: "train-scheduler-d7046",
  storageBucket: "train-scheduler-d7046.appspot.com",
  messagingSenderId: "119491307948",
  appId: "1:119491307948:web:269f7bf035b016d1887209"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

$("#submit").on("click", function(e) {
  e.preventDefault();
  // console.log("hello!");
  var trainName = $("#train-name")
    .val()
    .trim();
  var trainDestiny = $("#train-desination")
    .val()
    .trim();
  var firstTrain = $("#first-train-time").val();
  var trainFrequency = $("#train-fequency").val();

  var trainObject = {
    name: trainName,
    destiny: trainDestiny,
    first: firstTrain,
    frequency: trainFrequency
  };

  db.ref().push(trainObject);

  var tName = trainObject.name;
  var tDestiny = trainObject.destiny;
  var tFirst = trainObject.first;
  var tFrequency = trainObject.frequency;

  console.log(tName);
  console.log(tDestiny);
  console.log(tFirst);
  console.log(tFrequency);

  $("#trainTable").append(
    "<tr><td>" +
      tName +
      "</td><td>" +
      tDestiny +
      "</td><td>" +
      tFirst +
      "</td><td>" +
      tFrequency +
      "</td></tr>"
  );

  $("#train-name").val("");
  $("#train-desination").val("");
  $("#first-train-time").val("");
  $("#train-fequency").val("");
});

db.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
});

//create variables for each one again.
//append them to table.

//make initial train data in database.
//create a button to add new trains.
//Also updates html and database.
//create a way to retrieve trains from the database.
//create a way to tell the time with moment JS. Parse.

// When adding trains, administrators should be able to submit the following:
// So, if administratior, the submit form appears.

// Code this app to calculate when the next train will arrive; this should be relative to the current time.

// Users from many different machines must be able to view same train times.
