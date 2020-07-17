"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;


/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const hostName = story.getHostName();

  // render all the rest of the story markup
  return $(`
      <li id="${story.storyId}">
        <i class="far fa-star"></i>
        <a class="story-link" href="${story.url}" target="a_blank">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}


/** Gets list of stories from server, generates their HTML, and puts on page. */

// CODEREVIEW: optimize & refactor to avoid clearing full list DONE
function putStoriesOnPage() {
  console.debug("putStoriesOnPage", "storyList.stories", storyList.stories);
  // console.debug("$allStoriesList.empty()", $allStoriesList.empty(), "$allStoriesList.show()", $allStoriesList.show())

  // empty out that part of the page
  $allStoriesList.empty();
  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    putOneStoryOnPage(story, $allStoriesList);
  }

  $allStoriesList.show();
}

function putOneStoryOnPage(story, $thisStoryList) {
  // console.log("story", story, "storyList.stories", storyList.stories);
  const markup = generateStoryMarkup(story);
  // console.log("markup",markup, "generateStoryMarkup(story)", generateStoryMarkup(story))
  $thisStoryList.append(markup);
}

// CODEREVIEW: Consider giving different name and moving into stories.js DONE
  //UNDER THE HOOD, navbar does not change during this part
    // user fills out form & clicks submit button ??is there another function for this? 
    // send POST request to API
async function createNewStory(evt) {
  console.debug("createNewStory", evt);
  evt.preventDefault();

  // // TODO-WouldBeNice: throw error if user not logged in

  // send POST request to API and save response as a new object 
  let newStoryInfo = {
    author: $("#submit-author").val(),
    title:  $("#submit-title").val(),
    url:    $("#submit-url").val(),
  };
  await storyList.addStory(currentUser, newStoryInfo);
  // updates story list on page without refreshing
  putStoriesOnPage();  
  // hide the form
  $submitForm.hide();
}

$("#submit-form").on("submit", createNewStory);

