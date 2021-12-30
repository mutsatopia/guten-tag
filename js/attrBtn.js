const btnAttrAdd = document.querySelector(".btn-attr-add");
const sectionAttrAdd = document.querySelector(".sect-attr-add");
const btnAttrDelete = document.querySelector(".btn-attr-delete.input-delete");
const showAttrMenu = document.querySelector(".wrap-attr-menu");

function addOn() {
    sectionAttrAdd.classList.add("on");
    showAttrMenu.classList.add("on");
}
function deleteOn() {
    sectionAttrAdd.classList.remove("on");
    showAttrMenu.classList.remove("on");
}

btnAttrAdd.addEventListener("click", addOn);
btnAttrDelete.addEventListener("click", deleteOn);