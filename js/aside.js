const tagBtn = document.querySelector(".btn-tag-list");
const attrBtn = document.querySelector(".btn-attribute");
const tagList = document.querySelector(".side-tag-list");
const attrList = document.querySelector(".side-attr-list");

tagBtn.addEventListener("click",()=>{
    tagList.classList.add("side-list-on");
    attrList.classList.remove("side-list-on");
})

attrBtn.addEventListener("click",()=>{
    attrList.classList.add("side-list-on");
    tagList.classList.remove("side-list-on");
})
