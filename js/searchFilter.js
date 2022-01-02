const searchTags = document.querySelector("#search-tag");
const tagContainer = document.querySelector(".wrap-tag");

searchTags.addEventListener("keyup", searchFilter);

function searchFilter() {
  let searchValue = searchTags.value.toUpperCase();
  let tag = tagContainer.querySelectorAll("li");
  
  tag.forEach((el) => {
    let text = el.textContent.toUpperCase();
    text.indexOf(searchValue) > -1
      ? (el.style.display = "")
      : (el.style.display = "none");
  });
}



