let reelsData = [
    {
        video: "3704195-uhd_2160_4096_25fps.mp4",
        profile: "https://i.pravatar.cc/150?img=8",
        username: "sarthack.sharma",
        caption: "E-commerce Changes: Adapting to the Future #shorts",
        likes: 2875,
        comments: 320,
        shares: 42,
        isLiked: false,
        isFollowed: false
    },

    {
        video: "14779396_2160_3840_60fps.mp4",
        profile: "https://i.pravatar.cc/150?img=15",
        username: "frontend.dev",
        caption: "When flexbox finally aligns 😭🔥",
        likes: 1200,
        comments: 210,
        shares: 30,
        isLiked: false,
        isFollowed: false
    },
     {
        video: "17844988-uhd_2160_3840_30fps.mp4",
        profile: "https://i.pravatar.cc/150?img=15",
        username: "frontend.dev",
        caption: "When flexbox finally aligns 😭🔥",
        likes: 1200,
        comments: 210,
        shares: 30,
        isLiked: false,
        isFollowed: false
    }
];


let parent = document.querySelector("#reels");
let html = "";


// ==============================
//  GENERATE REELS USING FOREACH
// ==============================
reelsData.forEach(function(elem, index) {

    html += `
        <div class="reel">
        
            <video autoplay muted loop src="${elem.video}"></video>

            <!-- RIGHT SIDE BUTTONS -->
            <div class="right">

                <!-- LIKE -->
                <div class="like" data-index="${index}">
                    <i class="ri-heart-3-fill" 
                       style="color:${elem.isLiked ? 'red' : 'white'}"></i>

                    <p>${elem.isLiked ? elem.likes + 1 : elem.likes}</p>
                </div>

                <!-- COMMENT -->
                <div class="comment">
                    <i class="ri-chat-3-line"></i>
                    <p>${elem.comments}</p>
                </div>

                <!-- SHARE -->
                <div class="share">
                    <i class="ri-share-forward-line"></i>
                    <p>${elem.shares}</p>
                </div>

            </div>



            <!-- BOTTOM LEFT USER SECTION -->
            <div class="bottom">
                <div class="user">
                    <img src="${elem.profile}">
                    <h4>@${elem.username}</h4>

                    <button class="follow-btn" data-index="${index}">
                        ${elem.isFollowed ? 'Unfollow' : 'Follow'}
                    </button>
                </div>

                <p>${elem.caption}</p>
            </div>

        </div>
    `;
});

parent.innerHTML = html;

// LIKE BUTTON FUNCTIONALITY
document.querySelectorAll(".like").forEach(function(btn) {

    btn.addEventListener("click", function() {

        let i = btn.getAttribute("data-index");
        reelsData[i].isLiked = reelsData[i].isLiked ? false : true;
        btn.querySelector("i").style.color =
            reelsData[i].isLiked ? "red" : "white";
        btn.querySelector("p").innerText =
            reelsData[i].isLiked ? reelsData[i].likes + 1 : reelsData[i].likes;
    });
});



// FOLLOW BUTTON FUNCTIONALITY
document.querySelectorAll(".follow-btn").forEach(function(btn) {

    btn.addEventListener("click", function() {
        let i = btn.getAttribute("data-index");
        reelsData[i].isFollowed = reelsData[i].isFollowed ? false : true;
        btn.innerText =
            reelsData[i].isFollowed ? "Unfollow" : "Follow";
    });
});
