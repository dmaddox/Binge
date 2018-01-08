$(document).ready(function() {

	console.log("view.js reporting for duty");

var pairsContainer=$("#pair-table");

var pairs;


// The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var authorId;
  if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
    getPairs(authorId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getPairs();
  }



  // This function grabs posts from the database and updates the view
  function getPairs(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/view" + authorId, function(data) {
      console.log("Posts", data);
      pairs = data;
      if (!pairs || !pairs.length) {
        displayEmpty(author);
      }
      else {
        initializeRows();
      }
    });
  }


  // InitializeRows handles appending all of our constructed post HTML inside pairsContainer
  function initializeRows() {
    // pairsContainer.empty();
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
  	newPairMedia.text(pair.media_type);
  	console.log(pair.media_type);  	
  	newPairRow.append(newPairMedia);

  	var newPairTitle=$("<td>");
  	newPairTitle.addClass("pair-row-title");
  	var newPairTitleLink=$("<a>");
  	if (pair.media_type=="book"){
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

  	return newPairRow;

  	//pushing the new row into the list should be handled by initializeRows func

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

})