// Initial Topics
var topics = ["Dogs", "Cats", "Frogs", "Dinosaurs"];

// Button Creation Function
function createButtons() {

  $("#buttonsDiv").empty();

  for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");

    a.addClass("topicButton");
    a.addClass("btn");
    a.addClass("btn-secondary");


    a.attr("topic-name", topics[i]);
    a.text(topics[i]);
    $("#buttonsDiv").prepend(a);
  }
}

// Topic Submit Button Function
$("#add-button").on("click", function (event) {
  event.preventDefault();

  var topic = $("#topics-input").val().trim();
  topic = topic.charAt(0).toUpperCase() + topic.slice(1);
  topics.push(topic);

  createButtons();
  document.getElementById("topics-input").value = "";
});

//___________________________________________________________________________________________

// topic button on-click
$(document).on("click", ".topicButton", function () {
  var topicName = $(this).attr("topic-name");

  // clear current gifs
  document.getElementById("gifContainer").innerHTML = "";

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topicName + "&api_key=ExfKwuHyNN6LpRCVcGKYsqWFPgojmJ4g&limit=10";

  // AJAX get function
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        // rating pull/display
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          // gif pull/display
          var gifFrame = $("<img>");
          gifFrame.attr("src", results[i].images.fixed_height.url);

          // append to HTML
          gifDiv.append(p);
          gifDiv.append(gifFrame);
          $("#gifContainer").prepend(gifDiv);
        }
      }
    });
});





createButtons();