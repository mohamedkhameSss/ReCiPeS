var httpRequest =new XMLHttpRequest();
httpRequest.open("Get","https://jsonplaceholder.typicode.com/posts")
var posts = []
httpRequest.send();
httpRequest.addEventListener("readystatechange",function () {
    if (this.readyState === 4) {
        posts = JSON.parse(httpRequest.response)
        diplayData();
    }
})
function diplayData() {
    bbox=""
    for (let i = 0; i < posts.length; i++) {
        bbox +=` <div class=" col-md-3">
        <div class="post">
        <h3 class="div">${posts[i].title}</h3>
        <div class="div">${posts[i].body}</div>
        </div>
    </div>`
        
    }
    // document.getElementById('postsData').innerHTML = bbox
    
}