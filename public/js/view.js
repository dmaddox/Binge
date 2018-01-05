$(document).ready(function() {

	console.log("view.js reporting for duty");

var pairsContainer=$("#db-view");

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
    pairsContainer.empty();
    // var postsToAdd = [];
    // for (var i = 0; i < posts.length; i++) {
    //   postsToAdd.push(createNewRow(posts[i]));
    // }
    var pairData=JSON.stringify(pairs);
    console.log(pairData);
         pairsContainer.append("pizza");
     pairsContainer.append(pairData);

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
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    pairsContainer.append(messageh2);
  }

})