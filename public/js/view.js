$(document).ready(function() {

	console.log("view.js reporting for duty");

var pairsContainer=$("#pair-table");

var pairs;

// document.getElementById("Book").addEventListener("click", function(){window.location.href = "?media_type=book"});

// document.getElementById("Movie").addEventListener("click", function(){window.location.href = "?media_type=movie"});

// document.getElementById("Show").addEventListener("click", function(){window.location.href = "?media_type=book"});

$("input[type='radio']").on("click",function(){window.location.href="?media_type="+this.id});

// The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var media_type;
  if (url.indexOf("?media_type=") !== -1) {
    media_type = url.split("=")[1];
    console.log("media type is "+media_type);
    getPairs(media_type);
  }
  // If there's no media_type we just get all posts as usual
  else {
    getPairs();
  }



  // This function grabs posts from the database and updates the view
  function getPairs(type) {
    media_type = type || "";
    if (media_type) {
      // media_type = "/?media_type=" + media_type;
      media_type;
    }
    $.get("/api/view/" + media_type, function(data) {
      console.log("Pairs", data);
      pairs = data;
      if (!pairs || !pairs.length) {
        displayEmpty(type);
      }
      else {
        initializeRows();
      }
    });
  }


  // InitializeRows handles appending all of our constructed post HTML inside pairsContainer
  function initializeRows() {
    pairsContainer.empty();
    pairsContainer.append("<tr><th>Media Type</th><th>Title</th> <th>Drink</th><th>Meal</th><th>Voting</th><th>Rating</th></tr>");
    var pairsToAdd = [];
    for (var i = 0; i < pairs.length; i++) {
      pairsToAdd.push(createNewRow(pairs[i]));
    }

     pairsContainer.append(pairsToAdd);
     console.log(pairsToAdd);

  }

  function createNewRow(pair){
  	console.log("createNewRow running");
  	// create the row and fields
  	// add classes to the row and fields
  	// put api data into fields
  	//append fields to row
  	var newPairRow=$("<tr>");
  	newPairRow.addClass("pair-row");
  	var newPairMedia=$("<td>");
  	newPairMedia.addClass("pair-row-media");
  	var newPairMediaLink=$("<a>");
  	newPairMediaLink.attr("href","?media_type="+pair.media_type);
  	newPairMediaLink.text(pair.media_type);
  	console.log(pair.media_type);
  	newPairMedia.append(newPairMediaLink);  	
  	newPairRow.append(newPairMedia);

  	var newPairTitle=$("<td>");
  	newPairTitle.addClass("pair-row-title");
  	var newPairTitleLink=$("<a>");
  	if (pair.media_type=="book"||pair.media_type=="Book"){
  	newPairTitleLink.attr("href","https://www.amazon.com/s/?url=search-alias%3Dstripbooks&field-keywords="+pair.media_title);
  	} else {
  	newPairTitleLink.attr("href","https://www.justwatch.com/us/search?q="+pair.media_title);
  	}
  	newPairTitleLink.attr("target","_blank");
  	newPairTitleLink.text(pair.media_title);
  	newPairTitle.append(newPairTitleLink);
  	newPairRow.append(newPairTitle);  	  	
  	
  	var newPairDrink=$("<td>");
  	newPairDrink.addClass("pair-row-drink");
  	var newPairDrinkLink=$("<a>");
  	if (pair.drink_url){
	  	newPairDrinkLink.attr("href",pair.drink_url);
	} else {
		newPairDrinkLink.attr("href","https://www.google.com/search?q="+pair.drink_name+" recipe");
	}
  	newPairDrinkLink.attr("target","_blank");
  	newPairDrinkLink.text(pair.drink_name);
  	newPairDrink.append(newPairDrinkLink);
  	newPairRow.append(newPairDrink);  	  	
  	
  	var newPairMeal=$("<td>");
  	newPairMeal.addClass("pair-row-meal");
  	var newPairMealLink=$("<a>");
  	if (pair.recipe_url){
  		newPairMealLink.attr("href",pair.recipe_url);
  	} else {
  		newPairMealLink.attr("href","https://www.google.com/search?q="+pair.food_name+" recipe");
  	}
  	newPairMealLink.attr("target","_blank");	
  	newPairMealLink.text(pair.food_name);
  	newPairMeal.append(newPairMealLink);
  	newPairRow.append(newPairMeal);

// arrows start
  	var newPairArrows=$("<td>");
  	newPairArrows.addClass("pair-row-arrows");

  	
  	var newPairArrowsUpLink=$("<a>");
  	newPairArrowsUpLink.attr("href","#");

  	 var newPairArrowsUpSpan=$("<span>");
  	 newPairArrowsUpSpan.addClass("glyphicon glyphicon-arrow-up");
  	 newPairArrowsUpSpan.attr("pair-id",pair.pair_id);
  	 newPairArrowsUpSpan.attr("pair-score",pair.pairing_score);

  	newPairArrowsUpLink.append(newPairArrowsUpSpan);

  	var newPairArrowsDownLink=$("<a>");
  	newPairArrowsDownLink.attr("href","#");

  	 var newPairArrowsDownSpan=$("<span>");
  	 newPairArrowsDownSpan.addClass("glyphicon glyphicon-arrow-down");
  	 newPairArrowsDownSpan.attr("pair-id",pair.pair_id);
  	 newPairArrowsDownSpan.attr("pair-score",pair.pairing_score);

  	newPairArrowsDownLink.append(newPairArrowsDownSpan);


  	newPairArrows.append(newPairArrowsUpLink);
   	newPairArrows.append(newPairArrowsDownLink);
  	newPairRow.append(newPairArrows);
// arrows end


	var newPairScore=$("<td>");
  	newPairScore.addClass("pair-row-media");
  	newPairScore.text(pair.pairing_score);
  	console.log(pair.pairing_score); 	
  	newPairRow.append(newPairScore);

  	return newPairRow;

  	//pushing the new row into the list should be handled by initializeRows func

  }


$(document).on("click", "span.glyphicon-arrow-up", handleUpVote);

$(document).on("click", "span.glyphicon-arrow-down", handleDownVote);

function handleUpVote(){
	var score=$(this).attr("pair-score");
	console.log("pair score is "+score);
	var newScore=parseInt(score)+1;
	console.log("new score:"+newScore);
	var id=$(this).attr("pair-id");
	console.log("pair id is "+id);
	vote(id, newScore);
}

function handleDownVote(){
	var score=$(this).attr("pair-score");
	console.log("pair score is "+score);
	var newScore=parseInt(score)-1;
	console.log("new score:"+newScore);
	var id=$(this).attr("pair-id");
	console.log("pair id is "+id);
	vote(id, newScore);
}

function vote(id, newScore){
	var data = {pairing_score:newScore,pair_id:id}
	$.post("/api/view",data)
    .done(function() {
    	console.log("updated");
    	refreshList();
    	// location.reload();
      // getPosts(postCategorySelect.val());
    });
}

  // This function displays a messgae when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Author #" + id;
    }
    pairsContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.addClass ("nothing-found");
    messageh2.css({ "text-align": "center" });
    messageh2.html("No posts yet" + partial + ", navigate <a href='/add" + query +
    "'>here</a> in order to get started.");
    pairsContainer.append(messageh2);
  }

  function refreshList(){
  	  if (url.indexOf("?media_type=") !== -1) {
    media_type = url.split("=")[1];
    console.log("media type is "+media_type);
    getPairs(media_type);
  }
  // If there's no media_type we just get all posts as usual
  else {
    getPairs();
  }
  }

})