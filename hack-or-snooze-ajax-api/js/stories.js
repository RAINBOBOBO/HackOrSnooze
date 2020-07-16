"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
// why do we need to declare a storyList object in main.js AND in stories.js



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

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  // empty out that part of the page
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const markup = generateStoryMarkup(story);
    $allStoriesList.append(markup);
  }

  $allStoriesList.show();
}


// From Prompt

// only allow logged in users to create a story 
    // check for loggin / user credentials. if !logged send error, if logged in continue
    // Once user logged in
        // info would we have here: username, loginToken
        // userInfo will be passed while adding story to storiesList
// POST request to API
    // send in header, content-type app/JSON
    // add this info as a object in the body
          // this.author = storyObj.author; // author of story (not user who submitted)
          // this.title = storyObj.title;   // title of story
          // this.url = storyObj.url;       // hostname.com - domain of 
          // this.username = storyObj.username;
          // this.storyId = storyObj.storyId;
          // this.createdAt = storyObj.createdAt;
          // this.updatedAt = storyObj.updatedAt;

    //  expected response: newly created story
// append to DOM with function with addStory() (in models.js)

