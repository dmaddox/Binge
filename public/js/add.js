// Wrapping all in document.ready to wait for page to load
$(document).ready(function() {

  // Setting up variables for input
  var mediaTypeSelect = "book";

  // Sets a flag for whether or not we're updating a pair to be false initially
  var updating = false;


  // Adding an event listener for when the form is submitted
  $(".form_input").on("submit", handleFormSubmit);
 
  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();

    // Identify which media type the user input data into
    // ==================================================
    // store the collapsible attribute number in a variable
    var mediaTypeInput = $("[aria-expanded=true]").attr("href");
    // options are: #collapseOne, #collapseTwo, #collapseThree
    switch(mediaTypeInput) {
        case "#collapseOne":
            mediaTypeSelect = "book";
            break;
        case "#collapseTwo":
            mediaTypeSelect = "show";
            break;
        case "#collapseThree":
            mediaTypeSelect = "movie";
            break;
        default:
          mediaTypeSelect = "book";
    }
    console.log(mediaTypeInput);
    console.log(mediaTypeSelect);
    // identify & store the submitter's name, the media title, the paired meal & bevereage
    nameInput = $("#" + mediaTypeSelect + "-your_name").val().trim();
    drinkInput = $("#" + mediaTypeSelect + "-drink_name").val().trim();
    mealInput = $("#" + mediaTypeSelect + "-meal_name").val().trim();
    titleInput = $("#" + mediaTypeSelect + "-title").val().trim();
    drinkUrlInput = $("#" + mediaTypeSelect + "-drink_url").val().trim();
    mealUrlInput = $("#" + mediaTypeSelect + "-meal_url").val().trim();
    
    console.log(nameInput);
    console.log(titleInput);
    console.log(mealInput);
    console.log(drinkInput);
    console.log(drinkUrlInput);
    console.log(mealUrlInput);

    // Wont submit the post if we are missing a nameInput or titleInput
    if (!nameInput || !titleInput) {
      console.log("User must input an id or title!");
      return;
    }

    // Constructing a newPair object to hand to the database w/ submitted info
    var newPair = {
      media_type: mediaTypeSelect,
      media_title: titleInput,
      food_name: mealInput,
      drink_name: drinkInput,
      recipe_url: mealUrlInput,
      drink_url: drinkUrlInput,
      user_name: nameInput,
    };

    // Run submitPair to create a whole new pairing
      submitPair(newPair);
  }

  // Submits a new pairing and brings user to view upon completion
  function submitPair(post) {
    $.post("/api/pairing", post, function() {
      window.location.href = "/view";
    });
  }

});