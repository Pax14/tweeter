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

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const errorMessage = function(str) {
  if (str === 'too many chars') {
    // console.log('too many chars')
    $('.error').hide();
    $('.error').empty();
    $('.error').append('Error: Your tweet is longer than 140 characters');
    $('.error').slideDown("slow");
  }
  if (str === 'no chars') {
    // console.log('no chars')
    $('.error').hide();
    $('.error').empty();
    $('.error').append('Error: Your tweet is empty..');
    $('.error').slideDown("slow");
  }
}

const createTweetElement = function(tweet) {
  let $tweet = 
    
    `<article>
      <header class="tweet-header">
        <div><img class="profile-picture" src=${tweet.user.avatars}></div>
        <div class="username">${tweet.user.name}</div>
        <div class="handle">${tweet.user.handle}</div>
      </header>
      <main class="actual-tweet">${escape(tweet.content.text)}</main>
      <footer>
        <div class="time">${moment(tweet.created_at).fromNow()}</div>
        <div class="flag-share-like"><i class="far fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div>
      </footer>
    </article>`;
  
  return $tweet;
};

$(document).ready(function(){

  // https://www.geeksforgeeks.org/how-to-create-auto-resize-textarea-using-javascript-jquery/
  $('textarea').on('input', function() {
    this.style.height = '30px';
    this.style.height = this.scrollHeight + 'px';
  });

  const loadTweets = $.get('/tweets', function (data){
    renderTweets(data);
  })

  $('button').click(function(event) {
    event.preventDefault();
    // console.log($('form'))
    
    const formInput = $('form').serialize()
    const safeInput = $('form')
    console.log(formInput.length)
    console.log(formInput)
    if (formInput.length === 5) {
      errorMessage('no chars');
    } else if (formInput.length > 145) {
      errorMessage('too many chars');
    } else {
      $('.error').hide();
      $('.error').empty();
      const newPost = $.post('/tweets', formInput, function() {
        $.get('/tweets', function (data) {
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

/* known bugs:
 * counter is kinda fucked up, current code replaces spaces with '%20' making 1 space = 3 characters.
*/