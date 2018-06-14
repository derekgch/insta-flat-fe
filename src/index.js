// {/* <div class="image-container">
//    <img src="https://scontent-lga3-1.cdninstagram.com/vp/bd9b15079ec27c52c076e9c7792bdc04/5B992309/t51.2885-15/s640x640/sh0.08/e35/c180.0.719.719/31449135_2115995735352355_6317812590797914112_n.jpg">
//    <p>
//        <img data-action="like-image" data-image-id="1" class="like-button" src="./images/like.png"><br>
//        <span id="likes-count-for-image-1">41</span>
//    </p>
// </div>

// `http://localhost:3000/api/v1/images`

// `http://localhost:3000/api/v1/likes`
// To create a new image the body should be `
//{url:"url of image"}` */} in image
//{image_id: image id number} in likes

const imgUrl = 'http://localhost:3000/api/v1/images';
const likeUrl = 'http://localhost:3000/api/v1/likes';




const container = document.getElementById("container");
const imgForm = document.getElementById("post-image-form");
const urlInput = document.getElementById("post-image-form-url");

fetchStuff(imgUrl).then(addAll(appendImage))

imgForm.addEventListener('click', event => {
    event.preventDefault();
    if(event.target.tagName === "BUTTON"){
        submitForm(event);
        urlInput.value = "";
    }
})


container.addEventListener('click', event =>{
    event.preventDefault();
    if(event.target.dataset.action === "like-image"){
        let imgId = event.target.dataset.imageId;
        postLikes(imgId);
        increaseLike(imgId);

    }

})


console.log(imgForm);


function postLikes(imgId){

    var config = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/JSON',
            'Data-Type': 'application/JSON'
        },
        body: JSON.stringify({image_id: parseInt(imgId)})
    };

    return fetch(likeUrl, config).then(r => r.json());

}

function increaseLike(imgId){
    let like = document.getElementById(`likes-count-for-image-${imgId}`);
    like.innerText = parseInt(like.innerText) +1;
}

function submitForm(event) {
    let newImg = {url:""};
    newImg.url = urlInput.value;
    // debugger;
    postImage(newImg).then(d => appendImage(d) );
}

function postImage(image) {
    var config = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/JSON',
            'Data-Type': 'application/JSON'
        },
        body: JSON.stringify({url: image.url})
    };

    return fetch(imgUrl, config).then(r => r.json());
}




function addAll(fn){
    return function(data) {
        data.forEach(e => fn(e));
    }
}

function appendImage(img){
    let newDiv = document.createElement('div');
    newDiv.className = "image-container";
    newDiv.id = `img${img.id}`
    newDiv.innerHTML = `<img src="${img.url}">
        <p>
            <img data-action="like-image" data-image-id="${img.id}" class="like-button" src="./images/like.png"><br>
            <span id="likes-count-for-image-${img.id}">${img.likes_count}</span>
        </p>`

    container.appendChild(newDiv);
}

function fetchStuff(url){
    return fetch(url).then(r => r.json());
}
