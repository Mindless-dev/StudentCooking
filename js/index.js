const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const blogpostsContainer = document.querySelector("#content-wrapper");
let pagenumber = 1;
const url = `https://holmenfrontend.no/foodblog/wp-json/wp/v2/posts/`;

function nextPage() {
  pagenumber++;
  if (pagenumber === 5) {
    pagenumber = 1;
  }

  getBlogPosts();
}
function previousPage() {
  pagenumber--;
  if (pagenumber === 0) {
    pagenumber = 4;
  }

  getBlogPosts();
}

previous.addEventListener("click", previousPage);

next.addEventListener("click", nextPage);

async function getBlogPosts() {
  try {
    let response = await fetch(url + `?page=${pagenumber}&per_page=3`);
    let blogs = await response.json();
    blogpostsContainer.innerHTML = "";
    let i = 0;

    for (i; i < blogs.length; i++) {
      blogpostsContainer.innerHTML += `<section class="blogpost">
      <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">
      <img class="blogImg" src="${blogs[i].better_featured_image.source_url}" alt= "${blogs[i].better_featured_image.alt_text}"> </a>
       <div class="blogpostDescription">
       <h3>${blogs[i].title.rendered}</h3>
       ${blogs[i].excerpt.rendered}
       <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">view post</a></div></section>`;
    }
    next.style.position = "relative";
    next.style.top = "60px";
    previous.style.position = "relative";
    previous.style.top = "60px";
  } catch (error) {
    blogpostsContainer.innerHTML = `<p class="error"> and error occured<p>`;
  }
}

//<a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">view post</a></div></section>

getBlogPosts();
