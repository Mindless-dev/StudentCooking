const nextArrow = document.querySelector("#previous");
const test = document.querySelector("#next");
const blogpostsContainer = document.querySelector("#content-wrapper");
let pagenumber = 1;
const url = `http://holmenfrontend.no/foodblog/wp-json/wp/v2/posts/`;

function test1() {
  pagenumber++;
  if (pagenumber === 5) {
    pagenumber = 1;
  }
  console.log(pagenumber);
  getBlogPosts();
}
function test2() {
  pagenumber--;
  if (pagenumber === 0) {
    pagenumber = 4;
  }
  console.log(pagenumber);
  getBlogPosts();
}

nextArrow.addEventListener("click", test2);

test.addEventListener("click", test1);

async function getBlogPosts() {
  try {
    let response = await fetch(url + `?page=${pagenumber}&per_page=3`);
    let blogs = await response.json();
    blogpostsContainer.innerHTML = "";
    let i = 0;

    for (i; i < blogs.length; i++) {
      blogpostsContainer.innerHTML += `<section class="blogpost">
      <img class="blogImg" src="${blogs[i].better_featured_image.source_url}" alt= "${blogs[i].better_featured_image.alt_text}">
       <div class="blogpostDescription">
       <h3>${blogs[i].title.rendered}</h3>
       ${blogs[i].excerpt.rendered}
       <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">view post</a></div></section>`;
    }
  } catch (error) {
    blogpostsContainer.innerHTML = `<p class="error"> and error occured<p>`;
  }
}

///http://holmenfrontend.no/foodblog/wp-json/wp/v2/posts/?page=1&per_page=4

getBlogPosts();

console.log(window.innerWidth);
