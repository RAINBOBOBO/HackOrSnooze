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
// TODO: Why does calling this from navCreateNewStory(evt) not refresh the list?
          // storyList now updates in real time
          // $allStoriesList does not update in real time
          // do we need to add a delegate to run this after submit? 
function putStoriesOnPage() {
  console.debug("putStoriesOnPage", "storyList.stories", storyList.stories);

  // empty out that part of the page
  // console.debug("$allStoriesList.empty()", $allStoriesList.empty(), "$allStoriesList.show()", $allStoriesList.show())
  $allStoriesList.empty();
  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    console.log("story", story, "storyList.stories", storyList.stories)
    const markup = generateStoryMarkup(story);
    console.log("markup",markup, "generateStoryMarkup(story)", generateStoryMarkup(story))
    $allStoriesList.append(markup);
  }

  $allStoriesList.show();
}


