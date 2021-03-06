"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");


const $favoriteStoriesList = $("#favorite-stories-list");
const $favoritesEmptyMsg = $("#favorites-empty-msg");

const $myStoriesList = $("#my-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $submitForm = $("#submit-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $navSubmit = $("#nav-submit");
const $navMainLinks = $(".main-nav-links");
const $navFavorites = $("#nav-favorites");


/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $submitForm,
    $favoriteStoriesList
  ];
  components.forEach(c => c.hide());
}


/** Overall function to kick off the app. */

async function start() {
  // console.debug("start");
  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();

  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  // do we need to pass in an argument to putStoriesOnPage();
    // if given arg, won't need to declare storyList again in stories.js
    // will we see a bug here?
  putStoriesOnPage();
}


// Once the DOM is entirely loaded, begin the app
$(start);