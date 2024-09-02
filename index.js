import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'




document.addEventListener('click', function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like) 
    }
    // console.log(e.target.dataset)
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply){
        console.log(e.target.dataset.reply)
        handleReplyClick(e.target.dataset.reply)
    } 
    else if (e.target.id==='tweet-btn'){
        handleTweetBtnClick();
    }
})

function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
        // targetTweetObj.isLiked = false
    }else{
        targetTweetObj.likes++
        // targetTweetObj.isLiked = true
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    
    render()
}

function handleRetweetClick(tweetId){
    const tweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    console.log(tweetObj)
    if(tweetObj.isRetweeted){
        tweetObj.retweets--
    } else{ 
        tweetObj.retweets++
    }
    
    tweetObj.isRetweeted = !tweetObj.isRetweeted;
    render()
}

function handleReplyClick(tweetId){
    let replyBtn = document.getElementById(`replies-${tweetId}`)
    // console.log(`'replies-${tweetId}'`)
    // console.log(replyBtn.classList)
    if(replyBtn.className == 'hidden'){
        replyBtn.classList.remove('hidden')
        console.log(replyBtn.classList)
    } else{
        replyBtn.classList.add('hidden')
    }
    
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    console.log(tweetInput.value);
    if(tweetInput.value !== ''){
        let newTweet = {
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: `${uuidv4()}`,
        }
        tweetsData.unshift(newTweet);
        tweetInput.value = ''
        render();

    }

    // console.log(newTweet)
}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        let retweetedIConClass = ''
        let replyIconClass = 'hidden'
        if (tweet.isLiked) {
            likeIconClass = "liked"
        }

        if (tweet.isRetweeted) {
            retweetedIConClass = "retweeted"
        }

        let repliesHTML = ''
        if (tweet.replies.length > 0){
            // console.log(tweet.uuid)
            tweet.replies.forEach(reply => {
                repliesHTML += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
                `
            })
        }

        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetedIConClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div  class="${replyIconClass}" id="replies-${tweet.uuid}">
        ${repliesHTML}
    </div>
</div>
`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

