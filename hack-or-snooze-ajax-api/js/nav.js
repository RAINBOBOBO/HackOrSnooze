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
  // console.debug("navShowSubmitForm", evt);
  evt.preventDefault();
  // on click, show() the hidden stories form
  $submitForm.show()

}
//TODO-WouldBeNice: add click listener to toggle showing/hiding
$("nav").on("click", navShowSubmitForm)


  //UNDER THE HOOD, navbar does not change during this part
    // user fills out form & clicks submit button ??is there another function for this? 
    // send POST request to API
async function navCreateNewStory(evt) {
  console.debug("navCreateNewStory", evt);
  evt.preventDefault();
  // listen for submit button click
  // check if the user is logged in
  // if user is not logged in, display error message and do nothing
  // if user is logged in: 
    // 1. call addStory()
    // 2. hide the form
    // 3. refresh the page to reflect the change
  await storyList.addStory(); 
  putStoriesOnPage();  // BUG: returns an object? should it?
  $submitForm.hide();
}
//TODO: make sure you dont need to refresh to update the story list

$("#submit-form").on("submit", navCreateNewStory);
// create story obj and add to story list? 