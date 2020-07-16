"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage(); //TODO: make this function
}

$body.on("click", "#nav-all", navAllStories);


/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);


/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// create conductor with button, Storylist.addstory

/** When user clicks on a create story link, show a (hidden) form to create story */

function navShowSubmitForm(evt) {
  console.debug("navShowSubmitForm", evt);
  // on click, show() the hidden stories form
  // TODO create jQuery objects in main
  $navCreateNewStoryForm.show() // TODO
}
  //UNDER THE HOOD, navbar does not change during this part
    // user fills out form & clicks submit button ??is there another function for this? 
    // send POST request to API
function navCreateNewStory() {
    // listen for submit button click
    // after the user submits new story, reset form and hide form
    $navCreateNewStoryForm.hide() // TODO
    // refresh the stories list after sending POST request to show new list containing newstory
    putStoriesOnPage()
}