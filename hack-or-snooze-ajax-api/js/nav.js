"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
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
  $navMainLinks.show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** When user clicks on a create story link, show a (hidden) form to create story */
/**Building The UI for New Story Form/Add New Story */

function navShowSubmitForm(evt) {
  // console.debug("navShowSubmitForm", evt);
  evt.preventDefault();
  // on click, show() the hidden stories form
  $submitForm.show()
}
//TODO-WouldBeNice: add click listener to toggle showing/hiding form
$("nav").on("click", navShowSubmitForm)