const viewAllBtn = document.querySelector("#allPosts");
const latestPosts = document.querySelector("#latestBlogPosts");
const allPosts = document.querySelector("#allBlogPosts");
const url =
  "https://holmenfrontend.no/foodblog/wp-json/wp/v2/posts/?per_page=100";
const toTopOfPage = document.querySelector("#topOfPage");

async function getBlogPosts() {
  try {
    const response = await fetch(url);
    const blogs = await response.json();
    latestPosts.innerHTML = "";
    allPosts.innerHTML = "";
    let i = 0;

    for (i; i < 4; i++) {
      latestPosts.innerHTML += `<section class="blogpostLatest">
      <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">
      <img class="blogImgLatest" src="${blogs[i].better_featured_image.source_url}" alt= "${blogs[i].better_featured_image.alt_text}"> </a>
      <div class="blogpostDescription">
      <h3>${blogs[i].title.rendered}</h3>
      ${blogs[i].excerpt.rendered}
        <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">view post</a></div></section>`;
    }

    for (i; i < 10; i++) {
      allPosts.innerHTML += `<section class="blogpost">
      <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">
      <img class="blogImg" src="${blogs[i].better_featured_image.source_url}" alt= "${blogs[i].better_featured_image.alt_text}"> </a><div class="blogpostDescription">
      <h3>${blogs[i].title.rendered}</h3>
        ${blogs[i].excerpt.rendered}
        <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">view post</a></section></div></section>`;
    }

    viewAllBtn.addEventListener("click", allBlogPosts);
    function allBlogPosts() {
      for (i; i < blogs.length; i++) {
        allPosts.innerHTML += `<section class="blogpost">
        <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">
        <img class="blogImg" src="${blogs[i].better_featured_image.source_url}" alt= "${blogs[i].better_featured_image.alt_text}"> </a>
        <div class="blogpostDescription">
        <h3>${blogs[i].title.rendered}</h3>
        ${blogs[i].excerpt.rendered}
        <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">view post</a></div></section>`;
      }
      viewAllBtn.style.display = "none";
      if (window.innerWidth < 600) {
        toTopOfPage.style.display = "flex";
      }
    }
  } catch (error) {
    console.log(error);
  }
}

getBlogPosts();

function scrollToTop() {
  window.scrollTo(scrollY, 0);
}

toTopOfPage.addEventListener("click", scrollToTop);

console.log(window.innerWidth);
