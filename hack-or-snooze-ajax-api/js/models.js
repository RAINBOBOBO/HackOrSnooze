"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";
let $submitAuthor = $('#submit-author')
let $submitTitle =  $('#submit-title')
let $submitURL =   $('#submit-url')



/******************************************************************************
 * Class to represent a single story.
 */

class Story {

  /** The constructor takes an object for better readability / flexibility
   * - storyObj: an object that has story properties in it
   */

  constructor(storyObj) {
    this.author = storyObj.author;
    this.title = storyObj.title;
    this.url = storyObj.url;
    this.username = storyObj.username;
    this.storyId = storyObj.storyId;
    this.createdAt = storyObj.createdAt;
    this.updatedAt = storyObj.updatedAt;
  }

  /** Parses hostname out of URL and returns it. */

  getHostName() {
    // console.debug("host name is ", new URL(this.url).hostname)
    return new URL(this.url).hostname;
  }
}


/******************************************************************************
 * This class maintains the list of individual Story instances
 *  It also has some methods for fetching, adding, and removing stories
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /** This method is designed to be called to generate a new StoryList. It:
   *
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.*
   */

  // Note presence of `static` keyword: this indicates that getStories is
  //  **not** an instance method. Rather, it is a method that is called on the
  //  class directly. Why doesn't it make sense for getStories to be an
  //  instance method?

  static async getStories() {
    // query the /stories endpoint (no auth required)
    const response = await axios.get(`${BASE_URL}/stories`);

    // turn plain old story objects from API into instances of Story class
    // Creates an array of Story objects
    const stories = response.data.stories.map(story => new Story(story));

    // build an instance of our own class using the new array of stories
    return new StoryList(stories);
  }

  /** Method to make a POST request to /stories and add the new story to the list
   * - user - the current instance of User who will post the story
   * - newStory - a new story object for the API with title, author, and url
   *
   * Returns the new story object
   */

    // CODEREVIEW: separate concerns, reconsider $ in naming for story parameters DONE
    // why did we choose to call these objs instead of POJO
    // navigators: question logic and refactor as driver coodes
    
  //newStory {
  //    author: authorName
  //    title: titleName
  //    url: url
  // }

  //user {
    // this.username
    // this.name
    // this.createdAt
    // this.updatedAt
    // this.favorites
    // this.ownStories
    // this.loginToken
    // }
  
  async addStory(user, newStory) {
    // console.debug("addStory");
   
    // console.log("currentUser is ", currentUser);
    // console.log("author is ", $('#submit-author').val(), "title ", $('#submit-title').val(), "url", $('#submit-url').val())
    let response = await axios.post(`${BASE_URL}/stories`, {
        "token": user.loginToken, 
        "story": {
          "author": newStory.author,
          "title":  newStory.title,
          "url":    newStory.url
        }
    });
    // console.log("THIS IS RESPONSE", response.data.story);

    let newStoryObject = new Story(response.data.story);
    storyList.stories.unshift(newStoryObject);

    return newStory;
  }
}


/******************************************************************************
 * The User class to primarily represent the current user.
 *  There are helper methods to signup (create), login, and getLoggedInUser
 */

class User {
  /** The constructor receives an object of properties about the new
   * user to create, along with the token.
   */

  constructor(userObj, token) {
    this.username = userObj.username;
    this.name = userObj.name;
    this.createdAt = userObj.createdAt;
    this.updatedAt = userObj.updatedAt;

    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = userObj.favorites.map(s => new Story(s));
    this.ownStories = userObj.stories.map(s => new Story(s));

    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
  }

  /** Register new user in API, make User instance & return it.
   *
   * Makes POST request to API and returns newly-created user.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async signup(username, password, name) {
    const response = await axios.post(`${BASE_URL}/signup`, {
      user: {
        username,
        password,
        name,
      }
    });

    return new User(response.data.user, response.data.token);
  }

  /** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    const response = await axios.post(`${BASE_URL}/login`, {
      user: {
        username,
        password,
      }
    });

    return new User(response.data.user, response.data.token);
  }

  /** When we already have credentials (token & username) for a user,
   *   we can log them in automatically. This function does that.
   */

  static async loginViaStoredCredentials(token, username) {
    // if we don't have user info, can't log them in -- return null
    if (!token || !username) return null;

    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      params: {token}
    });

    return new User(response.data.user, token);
  }
}
