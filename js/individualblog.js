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
