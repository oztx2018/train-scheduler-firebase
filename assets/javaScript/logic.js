var config = {
  apiKey: "AIzaSyC3-aEXxk3jjUCF20XrroTva3iJgXFWCDU",
  authDomain: "train-f0e34.firebaseapp.com",
  databaseURL: "//train-f0e34.firebaseio.com",
  projectId: "train-f0e34",
  storageBucket: "train-f0e34.appspot.com",
  messagingSenderId: "1050097015778"
};
firebase.initializeApp(config);
  var trainData = firebase.database();
  $("#addTrainBtn").on ("click", function(){
      alert("Train Added!");
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(),"HH : mm").subtract(10,"years").format("x");
      var frequency = $("#frequencyInput").val().trim(); 
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);
    alert("Train successfully added");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

  })

  trainData.ref().on("child_added", function(snapshot){
    var name=snapshot.val().name;
    var destination = snapshot.val().destination; 
    var frequency = snapshot.val().frequency; 
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival= moment().add(minutes, "m").format("hh:mm A"); 

    console.log(remainder); 
    console.log(minutes);
    console.log(arrival); 

    $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes +"</td></tr>"); 

  })
