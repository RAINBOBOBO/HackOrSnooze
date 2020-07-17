"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;


/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */

async function login(evt) {
  // console.debug("login", evt);
  evt.preventDefault();

  // grab the username and password
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  // User.login retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.login(username, password);

  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
  // console.log("currentUser: ",currentUser,"saveUserCredentialsInLocalStorage(): ", saveUserCredentialsInLocalStorage(), "updateUIOnUserLogin(): ", updateUIOnUserLogin())

}

$loginForm.on("submit", login);

/** Handle signup form submission. */

async function signup(evt) {
  // console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  // User.signup retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.signup(username, password, name);

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();

  $signupForm.trigger("reset");
}

$signupForm.on("submit", signup);

/** Handle click of logout button
 *
 * Remove their credentials from localStorage and refresh page
 */

function logout(evt) {
  // console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}

$navLogOut.on("click", logout);


/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */

async function checkForRememberedUser() {
  // console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // if there is a token in localStorage, call User.getLoggedInUser
  //  to get an instance of User with the right details
  currentUser = await User.loginViaStoredCredentials(token, username);
  if (!currentUser) return;

  updateNavOnLogin();
}

/** Sync current user information to localStorage.
 * ?? : Is this syncing user info stored on API to user info stored in localStorage
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */

function saveUserCredentialsInLocalStorage() {
  // console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}


/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

function updateUIOnUserLogin() {
  // console.debug("updateUIOnUserLogin");

  hidePageComponents();
  $allStoriesList.show();
  updateNavOnLogin();
}


/******************************************************************************
 * General UI stuff about favorites
 */

/* Favorites:

- Add a favorite by clicking on an empty star next to a story title 
  - add eventlistener to stars to track which story being used
  - send a POST request to add story into the user's favorites list in server
  - rewrite local currentUser with server's info
  - change empty star to solid star

- Deleting a favorite by clicking on a full star next to a story title 
 - send a DELETE request to server
      - same URL but with parameters: userToken, and story ID
 - local currentUser with server's info (just in case)

- Clicking favorites button on the nav bar 
  - hide all components DONE
  - if no favorites, show message that there are no faves DONE
  - populate the page with latest user's favorites list in server

  * function to make a get req. for the favorites list
  * function for changing the screen to show the favorites
  * function to listen for click on a star and make a post req. based on the star's class (far/fas)
 
*/

// POST response contain user.favorites
// FURTHER STUDY: POST response contain user.stories to account for stories added by user

// function to make a get req. for the favorites list
function updateUserFavorites() {
  console.log("currentUser is ", currentUser);
  // send a POST request to add story into the user's favorites list in server
  // - rewrite local currentUser with server's info
}
