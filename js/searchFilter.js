const SEARCH_TAG = document.querySelector("#search-tag");
const ITEM_CONTAINER = document.querySelector("#warp-items");

SEARCH_TAG.addEventListener("keyup", searchFilter);

function searchFilter() {
  let searchValue = SEARCH_TAG.value.toUpperCase();
  let tag = ITEM_CONTAINER.querySelectorAll("li");
  
  tag.forEach((el) => {
    let text = el.textContent.toUpperCase();
    text.indexOf(searchValue) > -1
      ? (el.style.display = "")
      : (el.style.display = "none");
  });
}



