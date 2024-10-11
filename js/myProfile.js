getUserData();


window.onload = function() {
  const entries = performance.getEntriesByType("navigation")[0];
  
  if (entries.type === 'reload') {
    // تم تحديث الصفحة، نفذ الدالة
    checkLogin();
  }
};

const URLParams = new URLSearchParams(window.location.search);
const id = URLParams.get("postID");
console.log(id)




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


// create comment
// let commentBody = document.getElementById("add-comment-input");
// console.log(commentBody.value);
// function createComment() {
//   alert(commentBody.value)
  
// }

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
    
    // get current user id
    function getcurrentUserId(){
    const URLParams = new URLSearchParams(window.location.search);
    const id = URLParams.get("userid");
    return id
    }
    
    // user header 
    
    
    let mainUserImage = document.getElementById("header-img")
    let mainUserInfo = document.getElementById("main-user-info")
    let mainUserEmail = document.getElementById("main-user-email")
    let mainUserName = document.getElementById("main-user-userName")
    let mainName = document.getElementById("main-user-name")
    let postSpan = document.getElementById("postSpan")
    let comentSpan = document.getElementById("comentSpan")
    let posrUserNameSpan = document.getElementById("posrUserNameSpan")
    function getUserData(){
        const userId = getcurrentUserId();
    axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}`)
    .then((response)=>{
        console.log(response)
        mainUserImage.src = response.data.data.profile_image;
              // profileImg = post.author.profile_image ? post.author.profile_image : "string";

        
        mainUserEmail.innerHTML = response.data.data.email;
        mainUserName.innerHTML = response.data.data.username;
        mainName.innerHTML = response.data.data.name;
        postSpan.innerHTML = response.data.data.posts_count;
        comentSpan.innerHTML = response.data.data.comments_count;
        posrUserNameSpan.innerHTML = `${response.data.data.name}'s posts `
    })
    }
    
    // get user posts
    function getPostsRequest(){
        let userId = getcurrentUserId();
axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`)
  .then(function (response) {
      console.log(response);
      let posts = response.data.data;
    console.log(posts);
    //  const uniqueUsernames = new Set();
      document.getElementById("userPosts").innerHTML = ""
      for (post of posts) {
        //   if (!uniqueUsernames.has(post.author.username)) {
        //       uniqueUsernames.add(post.author.username);
        //       console.log(post.author.profile_image);
        //       console.log(post.body);
        //       let profileImg = "";
        //       // profileImg = post.author.profile_image ? post.author.profile_image : "string";
        //       let nullImg = '../images/profile-pics/photo_2023-11-01_21-16-48.jpg'
        //       if (post.author.profile_image != null) {
        //           profileImg = post.author.profile_image;
        //       }
        
        //       let thePostImg = ''
        //       if (post.image != 0) {
        //           thePostImg = post.image;
        //       } else {
        //           thePostImg = postWithoutImage;
        //       }
              
        //       let theTitle = ""
        //       if(post.title !=null){
        //       theTitle = post.title
        //       }
                      let profileImg = "";
              // profileImg = post.author.profile_image ? post.author.profile_image : "string";
              let nullImg = '../images/male.jpeg'
              if (post.author.profile_image != null) {
                  profileImg = post.author.profile_image;
              }
        
              let thePostImg = ''
              if (post.image != 0) {
                  thePostImg = post.image;
              } else {
                  thePostImg = postWithoutImage;
              }
              
              let theTitle = ""
              if(post.title !=null){
              theTitle = post.title
              }
          const author = post.author;
          
            let isUser = getCurentUser();
            let isMyPost = isUser != null && post.author.id == isUser.id;
            let editBtn = ``
            if(isMyPost){
              editBtn = `
              <button class="btn edit-post btn-outline-primary" onclick=" editPost('${encodeURIComponent(JSON.stringify(post))}') ">Edit</button>
              <button class="btn  btn-outline-danger danger" style='float: right ; margin-right:5px' onclick=" deletePost('${encodeURIComponent(JSON.stringify(post))}') ">Delete</button>
              `
            }
              let content = `
                        <div class="card shadow mb-3">
                    <div class="card-header">
                            <img id="user-img" class="border border-4"
                            src="${profileImg}" alt="" onerror="this.onerror=null; this.src='${nullImg}';">
                        
                        <span id="user-name">${post.author.username}</span>
                        ${editBtn}
                    </div>
                    <div class="card-body" onclick="postClicked(${post.id})">
                    <img id="post-img" class="w-100" src="${thePostImg}" alt="" onerror="this.onerror=null; this.src='${postWithoutImage}';">
                        
                        <h6 id="post-time" class="text-body-tertiary mt-1">${post.created_at}</h6>
                        <h5 id="post-title">${theTitle}</h5>
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
                </div>
        
        `
              userPosts.innerHTML += content;
            //   const currentPostId = `post-tags-${post.id}`;
            //   postTags.innerHTML  = ""
            //   for(tag of post.tags){
            //     let tagsContent = `
            //     <span id="post-tags">
            //         <button class="btn btn-sm rounded-5 tags">${tag.name}</button>
            //     </span>
            //     `
            //       document.getElementById(currentPostId).innerHTML += tagsContent;
            //   }
          
      }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
})
}

getPostsRequest()


// confirm delete and edit and create

function createAnewPost(){
  let postID = document.getElementById("post-id-input").value;
  console.log(postID);
  let isCreate = postID == null || postID == ""


    const CreateTitle = document.getElementById("create-post-input");
    const CreateBody = document.getElementById("create-body");
    const CreateImg = document.getElementById("create-post-img");
    console.log(CreateBody, CreateTitle);
    let formData = new FormData() 
    formData.append("body",CreateBody.value)
    formData.append("title" ,CreateTitle.value)
    formData.append("image",CreateImg.files[0])
    //     const params = { 
    //     "body" : CreateBody.value ,
    //     "title" : CreateTitle.value,
    //     "image" : CreateImg.files[0],
    // }
    
    // create the header
    const token = localStorage.getItem('token')
    const header = {
        "Authorization" : `Bearer ${token}` ,
        "Content-Type" : "multipart/form-data"
    }
    
  let url = ``;
  if(isCreate){
    url = 'https://tarmeezacademy.com/api/v1/posts';
        axios.post(url, formData , 
    {
    headers:header
    })
      .then(function (response) {
        console.log(response);
        const Rmodal = document.getElementById("addPostmodel");
        const modalInstance = bootstrap.Modal.getInstance(Rmodal);
        modalInstance.hide();
        getPostsRequest();
        // successAlert("Done!, you posted now", "success")
      })
      .catch(function (error) {
        const msg = error.response.data.message;
        console.log(msg);
          // successAlert(msg, "danger")
        // alert(msg);
      });
  }else{
    formData.append("_method", "put");
    url = `https://tarmeezacademy.com/api/v1/posts/${postID}`;
        axios.post(url, formData , 
    {
    headers:header
    })
      .then(function (response) {
        console.log(response);
        const Rmodal = document.getElementById("addPostmodel");
        const modalInstance = bootstrap.Modal.getInstance(Rmodal);
        modalInstance.hide();
        getPostsRequest();
        // successAlert("Done!, you posted now", "success")
      })
      .catch(function (error) {
        const msg = error.response.data.message;
        console.log(msg);
          // successAlert(msg, "danger")
        alert("sorry.. you can't edit ... it's not your post");
      });
  }
    // axios.post(url, formData , 
    // {
    // headers:header
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     const Rmodal = document.getElementById("addPostmodel");
    //     const modalInstance = bootstrap.Modal.getInstance(Rmodal);
    //     modalInstance.hide();
    //     getPostsRequest();
    //     // successAlert("Done!, you posted now", "success")
    //   })
    //   .catch(function (error) {
    //     const msg = error.response.data.message;
    //     console.log(msg);
    //       // successAlert(msg, "danger")
    //     alert(msg);
    //   });
}


// show the modal twice by the same modal
function editPost(postOBJ) {
  let post = JSON.parse(decodeURIComponent(postOBJ))
  console.log(post)
  console.log(post.title)
  document.getElementById("post-id-input").value = post.id;
  console.log(document.getElementById("create-post-input"))
  document.getElementById("headPostModal").innerHTML = "Edit Post";
  document.getElementById("create-btn").innerHTML = "Edit"
  if(post.title == null){
    document.getElementById("create-post-input").value = "no title";
  }else{
    document.getElementById("create-post-input").value  = post.title;
  }
  document.getElementById("create-body").innerHTML = post.body;
  let postModal = new bootstrap.Modal(document.getElementById("addPostmodel"), {});
  postModal.toggle();
  
}


function deletePost(postOBJ) {
  let post = JSON.parse(decodeURIComponent(postOBJ))
  console.log(post)
  document.getElementById("delete-hidden-input").value = post.id;
  let postModal = new bootstrap.Modal(document.getElementById("deltePostmodel"), {});
  postModal.toggle();
  
}


function createPostBtn(postOBJ){
  // let post = JSON.parse(decodeURIComponent(postOBJ));
  document.getElementById("post-id-input").value = "";
  document.getElementById("headPostModal").innerHTML = "Creat A New Post";
  document.getElementById("create-btn").innerHTML = "Create"
  document.getElementById("create-post-input").value = null && " ";
  document.getElementById("create-body").innerHTML = null;
  document.getElementById("create-body").value = " ";
  document.getElementById("create-post-img").value = null;
  let postModal = new bootstrap.Modal(document.getElementById("addPostmodel"), {});
  postModal.toggle();
}


function confirmDelte(){
  const postId = document.getElementById("delete-hidden-input").value;
  const token = localStorage.getItem("token");
     const header = {
        "Authorization" : `Bearer ${token}` ,
        "Content-Type" : "multipart/form-data"
    }
  console.log(postId);
  axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`,{headers:header})
  .then((response)=>{
    console.log(response);
    const DeleteModal = document.getElementById("deltePostmodel")
    const modalInstance = bootstrap.Modal.getInstance(DeleteModal);
    modalInstance.hide();
    getPostsRequest();
    successAlert("Deleted successfully" , "success")
  })
  .catch((error)=>{
    const errMsg = error.response.data.message;
    successAlert(errMsg,"danger")
  })
}


// profile btn clicked
function profileBtn() {
  const user = getCurentUser();
  window.location.href = `index2.html?userid=${user.id}`;
}



function toggleLoader(show=true) {
  if(show) {
    document.getElementById("loader").style.visibility = 'visible';
  }else{
    document.getElementById("loader").style.visibility = 'hidden';
  }
}