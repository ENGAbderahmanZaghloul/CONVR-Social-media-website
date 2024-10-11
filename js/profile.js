const URLParams = new URLSearchParams(window.location.search);
const id = URLParams.get("postID");
console.log(id)


window.onload = function() {
  const entries = performance.getEntriesByType("navigation")[0];
  
  if (entries.type === 'reload') {
    // تم تحديث الصفحة، نفذ الدالة
    checkLogin();
  }
};

let thePosts = document.getElementById("posts");
let userImg = document.getElementById("user-img");
let userName = document.getElementById("user-name");
let postImg = document.getElementById("post-img");
let postTime = document.getElementById("post-time");
let postTitle = document.getElementById("post-title");
let postBody = document.getElementById("post-body");
let postTags = document.getElementById("post-tags")
let postWithoutImage = `<h2>this post without image</h2>`

let registerName = document.getElementById("register-name-input");
let registerUserName = document.getElementById("register-username-input");
let registerEmailName = document.getElementById("register-email-input");
let registerPasswordName = document.getElementById("register-password-input");
let registerImage = document.getElementById("register-image-input");


// get post

let nullImg = '../images/male.jpeg'



function getPost(){
axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
  .then(function (response) {
    console.log(response);
    const post = response.data.data;
    console.log(post);
    const userNameSpan = document.getElementById("userName-span");
    const Clickedpost = document.getElementById("posts")
    userNameSpan.innerHTML = `${post.author.username}\'s`;
    const commts = post.comments;
    let commentsContent = ``;
    for(comment of commts ){
      commentsContent +=
        `
                                <div class="comment p-3 pb-2">
                            <div class="cmt-head">
                                <img class="user-img" src="${comment.author.profile_image}" alt="">
                                <span id="user-name">${comment.author.username}</span>
                            </div>
                            <div class="cmt-body pt-2">
                                ${comment.body}
                            </div>
                        </div>
        `
    }
    let contents = `
                    <div class="card shadow mb-3">
                                        <div class="card-header">
                            <img id="user-img" class="border border-4"
                            src="${post.author.profile_image}" alt="" onerror="this.onerror=null; this.src='${nullImg}';">
                        
                        <span id="user-name">${post.author.username}</span>
                    </div>
                    <div class="card-body">
                        <img id="post-img" class="w-100" src="${post.image}" alt="">
                        <h6 id="post-time" class="text-body-tertiary mt-1">${post.created_at}</h6>
                        <h5 id="post-title">${post.title}</h5>
                        <p id="post-body">${post.body}</p>
                        <hr>
                        <div class="comts">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chat-square" viewBox="0 0 16 16">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            </svg>
                            <span>
                                [${post.comments_count}] comments
                                <span id="pos-tags-${post.id}">
                                
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="comments" id="comments">
                    ${commentsContent}
                    </div>
                    <div class="add-comment mb-3" id="add-comment">
                        <input type="text" placeholder="Add comment" id="add-comment-input">
                        <button  class="btn btn-outline-primary  send-comment" onclick="createComment()" id="add-comment-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                <path
                                    d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                            </svg></button>
                    </div>
                    
                    </div>
                </div>
    `
    Clickedpost.innerHTML = contents;
    const currentPostId = `post-tags-${post.id}`;
              postTags.innerHTML  = ""
              for(tag of post.tags){
                let tagsContent = `
                <span id="post-tags">
                    <button class="btn btn-sm rounded-5 tags">${tag.name}</button>
                </span>
                `
                  document.getElementById(currentPostId).innerHTML += tagsContent;
              }
  })
  .catch(function (error) {
    // handle error
   alert(error);
})
}

getPost();

// create comment
let commentBody = document.getElementById("add-comment-input");
console.log(commentBody.value);
function createComment() {
  alert(commentBody.value)
  
}

let addCommtBtn = document.getElementById("add-comment-btn");


let loginBtn = document.getElementById("login-btn");

let userInput = document.getElementById("username-input");
let passInput = document.getElementById("password-input");
const modal = document.getElementById("loginModal");
const Rmodal = document.getElementById("registerModal");

function checkLogin(){
    const token = localStorage.getItem("token");
    let mainLoginBtn = document.getElementById("main-login-btn");
    let mainRegisterBtn = document.getElementById("main-register-btn");
    let logOut = document.getElementById("logout-btn");
    let userContent = document.getElementById("user-content");
    let userImage = document.getElementById("ui-user-image");
    let theUserName = document.getElementById("nav-user-name");
    let addBtn = document.getElementById("addBtn");


    console.log(mainLoginBtn , mainRegisterBtn, addBtn)
    if(token === null){
        mainLoginBtn.style.visibility = 'visible';
        mainRegisterBtn.style.visibility = 'visible';
        mainLoginBtn.style.setProperty("display","block","important")
        mainRegisterBtn.style.setProperty("display","block","important")
        logOut.style.display = 'none';
        userContent.style.visibility = 'hidden';
        // userImage.style.setProperty("display","none","important")
        // theUserName.style.setProperty("display","none","important")
        addBtn.style.visibility = 'hidden';
    }else{
        mainLoginBtn.style.visibility = 'hidden';
        mainRegisterBtn.style.visibility = 'hidden';
        mainLoginBtn.style.setProperty("display","none","important")
        mainRegisterBtn.style.setProperty("display","none","important")
        logOut.style.visibility = 'visible';
        userContent.style.visibility = 'visible';
        userContent.style.setProperty("display","block","important")
        // userImage.style.setProperty("display","block","important")
        // theUserName.style.setProperty("display","block","important")
        addBtn.style.visibility = 'visible';
        addBtn.style.setProperty("display","block","important")
        const user = getCurentUser()
      theUserName.innerHTML = user.username;
      if(user.profile_image == nul){
      userImage.src = nullImg
      }else {
      userImage.src = user.profile_image;
      }
      console.log(user.username)
      
    }
}

function getCurentUser(){
let user = null
  const storageUser = localStorage.getItem("user");
  console.log(storageUser);
  if(storageUser != null){
    user = JSON.parse(storageUser);
  }
  return user
}


function getParams(){
    const params = { 
    "username" : userInput.value,
    "password" : passInput.value
}


axios.post('https://tarmeezacademy.com/api/v1/login', params)
  .then(function (response) {
    console.log(response.data);
    let token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      successAlert('Welcome, you logged in successfuly!', "success");
      checkLogin()
    //   location.reload();
  })
  .catch(function (error) {
    const errMsg =error.response.data.message
      successAlert(errMsg, "danger");
  });
}


function registerClick(){
    let formData = new FormData() 
    formData.append("username",registerUserName.value)
    formData.append("password" ,registerPasswordName.value)
    formData.append("email" ,registerEmailName.value)
    formData.append("name" ,registerName.value)
    formData.append("image",registerImage.files[0])
    
//   const params = { 
//     "username" : registerUserName.value,
//     "password" : registerPasswordName.value,
//     "email" : registerEmailName.value,
//     "name":registerName.value
// }
   const header = {
        "Content-Type" : "multipart/form-data"
    }
axios.post('https://tarmeezacademy.com/api/v1/register', formData , { headers:header} )
  .then(function (response) {
    console.log(response.data);
    let token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      const modalInstance = bootstrap.Modal.getInstance(Rmodal);
      modalInstance.hide();
      successAlert("Congratulations!, you registerd in our app succesfuly", "success")
      checkLogin()

  })
  .catch(function (error) {
      const errMsg = error.response.data.message;
    successAlert(errMsg , "danger")
  });
}



function successAlert(msg,type){
const alertPlaceholder = document.getElementById('success-alert')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible " role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}
    appendAlert( msg, type);
    // hide alert
    setTimeout(()=>{
        const alert = bootstrap.Alert.getOrCreateInstance('#success-alert')
        alert.close()
    },2000)

}

    let logOut = document.getElementById("logout-btn");
    logOut.addEventListener("click",()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");

    location.reload();
    })
    


// profile btn clicked
function profileBtn() {
  const user = getCurentUser();
  window.location.href = `index2.html?userid=${user.id}`;
}