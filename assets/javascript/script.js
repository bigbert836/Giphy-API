// starting array of food strings
var topics = ["hot dog", "pizza", "ice cream", "salad", "soda", "cake", "potato"];

// variable to store new button information
var buttonTopics;

// variable to store button text for search function
var buttonText;

// set global variable for integer
var i;

// global variable for button text
var searchText;

// global variable for each gif rating
var rating;

// function to create buttons based on the array strings
function setButtons(){
	// loop through topics array
	for(i = 0; i < topics.length; i++){
		createButton();
	}
}

function createButton(){
	// create a button with the id equal to the index number in the array
	buttonTopics = "<button id='" + i  + "'>";
	$("#buttons").append(buttonTopics);
	// set the button class to "buttonStyle"
	$("#" + i).attr("class", "buttonStyle");
	// set the button text equal to the array string
	$("#" + i).text(topics[i]);
}

// sets buttons from array when page loads
setButtons()

// when any element with the buttonStyle is clicked, the searchText function is called
// this includes new buttons that were created
$(document).on("click", ".buttonStyle", getGif);

// this function grabs the text value from the element that was clicked
function getGif(){
	searchText = $(this).text();
	callGiphy(searchText)
}

// call the newButton function when the search button is clicked
$("#search").click(function(event){
	event.preventDefault();
	checkInput();
});

// this function makes sure there is text in the input field
// if there is no text, no button is generated
function checkInput(){
	if($("input").val() === ""){
	}
	else{
		newButton();
		$("input").val("");
	}	
}

// the newButton function adds the input value to the end of the topics array and then calls the createButton function
function newButton(){
	i = topics.length;
	topics.push($("input").val().trim());
	createButton();
}

// ajax call to giphy api
function callGiphy(a){
	var url = "https://api.giphy.com/v1/gifs/search?q=" + a + "&rating=pg&api_key=dc6zaTOxFJmzC&limit=10";
	$.ajax({
  	url: url,
  	method: 'GET',
	}).done(function(result) {
		$("#gifs").empty();
		for(i = 0; i < 10; i ++){
			rating = result.data[i].rating;
			$("#gifs").append("<div id='gif" + i +"' >");
			// creating image elements for each giph with still source
			$("#gif" + i).append("<img class='newGif" + i + "' src='" + result.data[i].images.fixed_height_still.url + "' />");
			$(".newGif" + i).attr({
				// creating "animated" attribute with the animated gif source
				"animated": result.data[i].images.fixed_height_still.url,
				// creating "still" attribute with the still gif source
				"still": result.data[i].images.fixed_height.url,
				// creating "state" attribute which will start as "still" but can be changed to "animated"
				"state": "still",
				// creating "rating" attribute for the gif rating
				"rating": result.data[i].rating
			});
			$("#gif" +i).append("<span class = 'rating'>Rating: " + rating.toUpperCase() + "</span>");
		}
	})
}

// this function changes the state of the gif, either still or animated
function changeState(){
	if($(this).attr("state") === "still"){
		$(this).attr("src", $(this).attr("still"));
		$(this).attr("state", "animated");
		}
	else{
		$(this).attr("src", $(this).attr("animated"));
		$(this).attr("state", "still");
	}
}

// call the changeState function when any image is clicked
$(document).on("click", "img", changeState);