const viewAllBtn = document.querySelector("#allPosts");
const latestPosts = document.querySelector("#latestBlogPosts");
const allPosts = document.querySelector("#allBlogPosts");
const url =
  "https://holmenfrontend.no/foodblog/wp-json/wp/v2/posts/?per_page=100";

async function getBlogPosts() {
  try {
    const response = await fetch(url);
    const blogs = await response.json();
    latestPosts.innerHTML = "";
    allPosts.innerHTML = "";
    console.log(blogs);
    let i = 0;
    console.log(blogs[0].better_featured_image.source_url);

    for (i; i < 4; i++) {
      console.log(blogs[i].better_featured_image.alt_text);
      latestPosts.innerHTML += `<section class="blogpostLatest"><img class="blogImgLatest" src="${blogs[i].better_featured_image.source_url}" alt= "${blogs[i].better_featured_image.alt_text}">
      <div class="blogpostDescription">
      <h3>${blogs[i].title.rendered}</h3>
      ${blogs[i].excerpt.rendered}
        <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">view post</a></div></section>`;
    }

    for (i; i < 10; i++) {
      allPosts.innerHTML += `<section class="blogpost"><img class="blogImg" src="${blogs[i].better_featured_image.source_url}" alt= "${blogs[i].better_featured_image.alt_text}">
      <div class="blogpostDescription">
      <h3>${blogs[i].title.rendered}</h3>
        ${blogs[i].excerpt.rendered}
        <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">view post</a></section></div></section>`;
    }

    viewAllBtn.addEventListener("click", allBlogPosts);
    function allBlogPosts() {
      for (i; i < blogs.length; i++) {
        allPosts.innerHTML += `<section class="blogpost"><img class="blogImg" src="${blogs[i].better_featured_image.source_url}" alt= "${blogs[i].better_featured_image.alt_text}">
        <div class="blogpostDescription">
        <h3>${blogs[i].title.rendered}</h3>
        ${blogs[i].excerpt.rendered}
        <a class="blogLink" href="individual_blogpost.html?id=${blogs[i].id}">view post</a></div></section>`;
      }
      viewAllBtn.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

getBlogPosts();
