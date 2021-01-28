/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  for (let i = 0; i < tweets.length; i++) {
    let $tweet =  createTweetElement(tweets[i]);
    // console.log($tweet)
    $('.main-container').prepend($tweet);
  }
}

const renderNewTweets = function(tweets) {
  // just for new tweets
  let $tweet =  createTweetElement(tweets);
  $('.main-container').prepend($tweet);
}

const createTweetElement = function(tweet) {
  let $tweet = 
    
    `<article>
      <header class="tweet-header">
        <div><img class="profile-picture" src=${tweet.user.avatars}></div>
        <div class="username">${tweet.user.name}</div>
        <div class="handle">${tweet.user.handle}</div>
      </header>
      <main class="actual-tweet">${tweet.content.text}</main>
      <footer>
        <div class="time">${tweet.created_at}</div>
        <div class="flag-share-like">FLAG SHARE LIKE</div>
      </footer>
    </article>`;
  
  return $tweet;
};

$(document).ready(function(){

  const loadTweets = $.get('/tweets', function (data){
    renderTweets(data);
  })
  
  $('button').click(function(event) {
    event.preventDefault();
    // console.log($('form'))
    const formInput = $('form').serialize()
    if (formInput.length === 5) {
      alert('Your tweet is empty.... doh')
    } else if (formInput.length > 145) {
      alert('Your tweet is longer than 140 characters.... doh')
    } else {
      const newPost = $.post('/tweets', formInput, function() {
        $.get('/tweets', function (data){
          let newTweet = data[data.length - 1];
          console.log(newTweet)
          renderNewTweets(newTweet);
        })
        $('textarea').val('');
        $('output').text('140');
      })
    }
    // console.log(formInput)
  })
})

