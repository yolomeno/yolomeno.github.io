
//Clock for HTML Page

function updateClock() {

var clock = moment().format("h:mm:ss a");

var c = $("<h2>");
var c2 = c.append(clock);
$("#clock").html(c2);

};

setInterval(updateClock, 1000);


  var config = {
    apiKey: "AIzaSyD3WghImXFq2-VYmaXuceKlTJ2QzYDQu8Y",
    authDomain: "train-scheduler-84329.firebaseapp.com",
    databaseURL: "https://train-scheduler-84329.firebaseio.com",
    projectId: "train-scheduler-84329",
    storageBucket: "",
    messagingSenderId: "880463621733"
  };
  
  firebase.initializeApp(config);

var database = firebase.database();

    // Button for adding new trains
$("#add-train-btn").click(function(event){
    //If an event goes unhandled, its default action should not be taken as it normally would be
  event.preventDefault();
    // Grabs user input and stores them into variables
  var newTrain = $("#train-name-input").val().trim();
  var newDestination = $("#destination-input").val().trim();
  var newFirstTrain = $("#first-train-input").val().trim();
  var newFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data

  newObject = {
    train: newTrain,
    destination: newDestination,
    firstTrain: newFirstTrain,
    frequency: newFrequency
  };
    // Uploads employee data to the database, this will "trigger" the "child_added" event
    database.ref().push(newObject);

      // Logs everything to console
      console.log(newObject.train);
      console.log(newObject.destination);
      console.log(newObject.firstTrain);
      console.log(newObject.frequency);

      alert("Train successfully added!");

      // clears the input boxes
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// "child_added" is a firebase event, such as "child-removed", "child_changed", and "child_moved"

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

   console.log(childSnapshot.val());

     // Store everything into a variable.
      var newTrain = childSnapshot.val().train;
      var newDestination = childSnapshot.val().destination;
      var newFirstTrain = childSnapshot.val().firstTrain;
      var newFrequency = childSnapshot.val().frequency;

       // Train Info
        console.log(newTrain);
        console.log(newDestination);
        console.log("FIRST TRAIN DEPARTED AT: " + newFirstTrain);
        console.log("THE TRAIN ARRIVES EVERY " + newFrequency + " MINUTES");
  

        // Prettify the first train time 
        // var firstTrainPretty = moment.unix(newFirstTrain).format("HH:mm");
        // console.log("THIS SHOULD BE THE FIRST TRAIN TIME FORMAT IN hh:mm: " + firstTrainPretty)
 
        var firstTrainConverted = moment(newFirstTrain, "hh:mm").subtract(1, "days");
        console.log(firstTrainConverted);;
      

        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var timeApart = diffTime % newFrequency;
        console.log("MINUTES TO SUBTRACT FROM FREQUENCY: " + timeApart);

        var minutesAway = newFrequency - timeApart;
        console.log("MINUTES UNTIL TRAIN: " + minutesAway);

        var nextArrival = moment().add(minutesAway, "minutes");
        var nextArrival2 = moment(nextArrival).format("hh:mm");

        console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" + newTrain + "</td> <td>" + newDestination + "</td> <td>" +
        newFrequency + "</td><td>" + nextArrival2 + "</td><td>" + minutesAway + "</td></tr>");


});