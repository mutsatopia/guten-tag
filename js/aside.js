const tagList = document.querySelector(".side-tag-list");
const attrList = document.querySelector(".side-attr-list");
const sideBtn = document.querySelector('.side-btn-list')



tagBtn.addEventListener("click",()=>{
    tagList.classList.add("side-list-on");
    attrList.classList.remove("side-list-on");
})

attrBtn.addEventListener("click",()=>{
    attrList.classList.add("side-list-on");
    tagList.classList.remove("side-list-on");
})
