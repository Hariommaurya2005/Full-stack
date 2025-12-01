const reels = [
    {
        username: "codewithayush",
        likeCount: 14820,
        isLiked: false,
        commentCount: 423,
        shareCount: 92,
        isFollowed: false,
        caption: "Dark mode > light mode. Change my mind.",
        video: "3704195-uhd_2160_4096_25fps.mp4",
        userprofile: "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=930"
    },
    {
        username: "designbysan",
        likeCount: 9820,
        isLiked: true,
        commentCount: 184,
        shareCount: 41,
        isFollowed: false,
        caption: "UI tip: Padding is personality. Give your elements some space.",
        video: "14779396_2160_3840_60fps.mp4",
        userprofile: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79"
    },
    {
        username: "frontend.ninja",
        likeCount: 22150,
        isLiked: false,
        commentCount: 612,
        shareCount: 138,
        isFollowed: true,
        caption: "When flexbox finally aligns the way you wanted 😭🔥",
        video: "17844988-uhd_2160_3840_30fps.mp4",
        userprofile: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126"
    },
    {
        username: "travelwithriya",
        likeCount: 54200,
        isLiked: false,
        commentCount: 822,
        shareCount: 201,
        isFollowed: false,
        caption: "My solo Bali trip changed everything 🌴",
        video: "17844988-uhd_2160_3840_30fps.mp4",
        userprofile: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
    }
];


// =============================
//   RENDER FUNCTION
// =============================
function render() {
    var sum = '';

    reels.forEach(function (elem, index) {

        sum += `
        <div class="reel">
            <video class="reel-video" data-index="${index}" autoplay loop muted src="${elem.video}"></video>

            <div class="bottom">
                <div class="user">
                    <img src="${elem.userprofile}" alt="">
                    <h4>${elem.username}</h4>

                    <button class="follow-btn" data-index="${index}">
                        ${elem.isFollowed ? "Unfollow" : "Follow"}
                    </button>
                </div>
                <h3>${elem.caption}</h3>
            </div>

            <div class="right">

                <div class="like">
                    <h4 class="like-btn icon" data-index="${index}">
                        ${elem.isLiked 
                            ? '<i class="love ri-heart-3-fill"></i>' 
                            : '<i class="ri-heart-3-line"></i>'}
                    </h4>
                    <h6>${elem.likeCount}</h6>
                </div>

                <div class="comment">
                    <h4><i class="ri-chat-3-line"></i></h4>
                    <h6>${elem.commentCount}</h6>
                </div>

                <div class="share">
                    <h4><i class="ri-share-forward-line"></i></h4>
                    <h6>${elem.shareCount}</h6>
                </div>

                <div class="menu">
                    <h4><i class="ri-more-2-fill"></i></h4>
                </div>

            </div>
        </div>`;
    });

    document.querySelector(".all-reels").innerHTML = sum;

    attachEvents(); // buttons activate
}

render();


// =============================
//   EVENT HANDLERS
// =============================
function attachEvents() {

    // ❤️ LIKE
    document.querySelectorAll(".like-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            let index = this.getAttribute("data-index");

            if (reels[index].isLiked) {
                reels[index].isLiked = false;
                reels[index].likeCount--;
            } else {
                reels[index].isLiked = true;
                reels[index].likeCount++;
            }

            render(); // UI update
        });
    });

    // ➕ FOLLOW
    document.querySelectorAll(".follow-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            let index = this.getAttribute("data-index");

            reels[index].isFollowed = !reels[index].isFollowed;

            render();
        });
    });

    const videos = document.querySelectorAll(".reel-video");

videos.forEach(video => {
    video.addEventListener("click", function () {
        if (this.paused) {
            this.muted = false;   
            this.play();          
        } else {
            this.muted = !this.muted; 
        }
    });
});

}
