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
  var firstTrain = moment(
    $("#first-train-time")
      .val()
      .trim(),
    "HH:mm"
  ).format("HH:mm");
  var trainFrequency = $("#train-fequency")
    .val()
    .trim();

  var trainObject = {
    name: trainName,
    destiny: trainDestiny,
    first: firstTrain,
    frequency: trainFrequency
  };

  db.ref().push(trainObject);

  $("#train-name").val("");
  $("#train-desination").val("");
  $("#first-train-time").val("");
  $("#train-fequency").val("");
});

db.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var tName = childSnapshot.val().name;
  var tDestiny = childSnapshot.val().destiny;
  var tFirst = childSnapshot.val().first;
  var tFrequency = childSnapshot.val().frequency;

  var firstTrainTime = moment(tFirst, "HH:mm");

  var difference = moment().diff(moment(firstTrainTime), "minutes");

  var tDifference = difference % tFrequency;

  var minutesUntil = tFrequency - tDifference;

  var nextTrain = moment()
    .add(minutesUntil, "minutes")
    .format("HH:mm");

  $("#trainTable").append(
    "<tr><td>" +
      tName +
      "</td><td>" +
      tDestiny +
      "</td><td>" +
      tFrequency +
      "</td><td>" +
      nextTrain +
      "</td><td>" +
      minutesUntil +
      "</td></tr>"
  );
});
