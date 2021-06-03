const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");
const containerBlog = document.querySelector("#blogpost");
const url = "https://holmenfrontend.no/foodblog/wp-json/wp/v2/posts/" + id;
const title = document.querySelector("title");
const url2 = "https://holmenfrontend.no/foodblog/wp-json/wp/v2/posts";
const relatedBlogs = document.querySelector("#relatedBlogs");
const modalContainer = document.querySelector("#modalContainer");
const toTopOfPage = document.querySelector("#topOfPage");
const backBtn = document.querySelector("#backBtn");

async function getBlog() {
  try {
    const response = await fetch(url);
    const blog = await response.json();
    containerBlog.innerHTML = `<section class="individualBlog">
    <h1>${blog.title.rendered}</h1> 
    <img src="${blog.better_featured_image.source_url}"> 
     <div class="blogLayout">${blog.content.rendered}</div></section>`;
    title.innerHTML = `Student Cooking | ${blog.title.rendered} `;
    const image = document.querySelectorAll("img");
    let modalImg = image[2];
    modalImg.addEventListener("click", showModal);
    createModal();
  } catch (error) {
    containerBlog.innerHTML = `<p class="error"> An error Occured </p>`;
  }
}

async function getRelatedBlogs() {
  try {
    const response = await fetch(url2);
    const blogs = await response.json();
    relatedBlogs.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      relatedBlogs.innerHTML += `<section class="blogpost">
      <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">
      <img class="blogImgRelated" src="${blogs[i].better_featured_image.source_url}" alt= "${blogs[i].better_featured_image.alt_text}"> </a>    <div class="blogpostDescription"><h3>${blogs[i].title.rendered}</h3>
     ${blogs[i].excerpt.rendered}
     <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">view post</a></div></section>
     `;
    }
  } catch (error) {
    containerBlog.innerHTML = `<p class="error"> An error Occured </p>`;
  }
}

getBlog();

getRelatedBlogs();

function showModal() {
  const modal = document.querySelector("#modal1");
  const modalImg = document.querySelector("#modalImg");
  modal.style.display = "block";
}

window.onclick = function (event) {
  const modal = document.querySelector("#modal1");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function createModal() {
  img = document.querySelectorAll("img");
  let modalImg = img[2];
  modalContainer.innerHTML += `<div id="modal1" class="modal"><img id=modalImg src="${modalImg.src}" alt="${modalImg.alt}"></div>`;
}

function scrollToTop() {
  window.scrollTo(scrollY, 0);
}

toTopOfPage.addEventListener("click", scrollToTop);

function goBack() {
  window.history.go(-1);
}

backBtn.addEventListener("click", goBack);
let sucess = 0;

/*_____________________________post and fetch of comments_______________________________*/

const commentUrl = "http://holmenfrontend.no/foodblog/wp-json/wp/v2/comments";
const submitComment = document.querySelector("#commentBtn");
const postIdInput = document.querySelector("#postId");
const firstName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const comment = document.querySelector("#comment");
const commentError = document.querySelector("#commentError");
const commentSucess = document.querySelector(".commentSucess");
submitComment.addEventListener("click", commentValidation);
const form = document.querySelector("form");

function commentValidation(event) {
  event.preventDefault();
  sucess = 0;
  if (characterLength(firstName.value, 3)) {
    nameError.style.display = "none";
    sucess++;
  } else {
    nameError.style.display = "block";
  }
  if (emailValidation(email.value) & (email.value.length > 0)) {
    emailError.style.display = "none";
    sucess++;
  } else {
    emailError.style.display = "block";
  }

  if (characterLength(comment.value, 20)) {
    commentError.style.display = "none";
    sucess++;
  } else {
    commentError.style.display = "block";
  }

  if (sucess === 3) {
    const postId = parseInt(id);
    const formData = JSON.stringify({
      post: `${postId}`,
      author_name: `${firstName.value}`,
      author_email: `${email.value}`,
      content: `${comment.value}`,
    });
    sendComment(formData);

    async function sendComment(data) {
      try {
        let postOptions = {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: data,
        };
        const response = await fetch(commentUrl, postOptions);
        form.style.display = "none";
        commentSucess.style.display = "flex";

        setTimeout(function sucess() {
          commentSucess.style.display = "none";
          form.style.display = "flex";
        }, 3000);
        firstName.value = "";
        email.value = "";
        comment.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const characterLength = function (value, characters) {
  if (value.trim().length >= characters) {
    return true;
  } else {
    return false;
  }
};

function emailValidation(email) {
  const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  const emailMatch = regEx.test(email);
  return emailMatch;
}

const postCommentsUrl = `https://holmenfrontend.no/foodblog/wp-json/wp/v2/comments?post=${id}`;
const commentSection = document.querySelector("#commentSection");

async function getPostComments() {
  let response = await fetch(postCommentsUrl);
  let comments = await response.json();
  commentSection.innerHTML = "";
  createCommentHtml(comments);
}

function createCommentHtml(comments) {
  if (comments.length === 0) {
    commentSection.innerHTML = `<p class="noComments">No Comments</p>`;
  }
  for (let i = 0; i < comments.length; i++) {
    if (comments.length != 0) {
      commentSection.innerHTML += `<section class="comment">
      <h4>${comments[i].author_name}</h4>
      ${comments[i].content.rendered}
      <div class="commentVote">
      <section class="upvote">
        <span id=upvote><i class="fas fa-chevron-circle-up"></i></span>
        <p>0</p>
      </section>
      <section class="downvote">
        <span id="downvote"><i class="fas fa-chevron-circle-down"></i></span>
        <p>0</p>
        </section></div></div>`;
    }
  }
}
getPostComments();
